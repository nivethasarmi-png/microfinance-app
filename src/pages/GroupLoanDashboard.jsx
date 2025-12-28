import { useState } from "react";

export default function GroupLoanDashboard({ group, updateGroup }) {
  const [amount, setAmount] = useState("");

  const applyLoan = () => {
    updateGroup({
      ...group,
      loans: [...group.loans, { id: Date.now(), amount, status: "Pending" }]
    });
    setAmount("");
  };

  const updateStatus = (id, status) => {
    updateGroup({
      ...group,
      loans: group.loans.map(l => l.id === id ? { ...l, status } : l)
    });
  };

  return (
    <>
      <h2>Group Loan Application</h2>
      <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Loan Amount" />
      <button onClick={applyLoan}>Apply Loan</button>

      <ul>
        {group.loans.map(l => (
          <li key={l.id}>
            ₹{l.amount} - {l.status}
            {l.status === "Pending" && (
              <>
                <button onClick={() => updateStatus(l.id, "Approved")}>Approve</button>
                <button onClick={() => updateStatus(l.id, "Rejected")}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

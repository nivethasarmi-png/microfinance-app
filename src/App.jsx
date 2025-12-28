import { useState } from "react";

function App() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const [memberName, setMemberName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  const [selectedMember, setSelectedMember] = useState("");
  const [contribution, setContribution] = useState("");

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  // Add Group
  const addGroup = () => {
    if (!groupName) return;
    setGroups([
      ...groups,
      {
        id: Date.now(),
        name: groupName,
        members: [],
        loan: null,
        contributions: []
      }
    ]);
    setGroupName("");
  };

  // Add Member
  const addMember = () => {
    if (!memberName || !selectedGroup) return;
    setGroups(groups.map(g =>
      g.id === selectedGroupId
        ? { ...g, members: [...g.members, memberName] }
        : g
    ));
    setMemberName("");
  };

  // Apply Loan
  const applyLoan = () => {
    if (!loanAmount || !selectedGroup) return;

    const amount = Number(loanAmount);

    setGroups(groups.map(g =>
      g.id === selectedGroupId
        ? {
            ...g,
            loan: {
              amount,
              status: "Pending",
              balance: amount
            },
            contributions: []
          }
        : g
    ));
    setLoanAmount("");
  };

  // Approve / Reject Loan
  const updateLoanStatus = (status) => {
    setGroups(groups.map(g =>
      g.id === selectedGroupId
        ? { ...g, loan: { ...g.loan, status } }
        : g
    ));
  };

  // Record Member Contribution
  const addContribution = () => {
    if (!selectedMember || !contribution) return;

    const amount = Number(contribution);

    setGroups(groups.map(g =>
      g.id === selectedGroupId
        ? {
            ...g,
            contributions: [
              ...g.contributions,
              { member: selectedMember, amount }
            ],
            loan: {
              ...g.loan,
              balance: g.loan.balance - amount
            }
          }
        : g
    ));

    setContribution("");
  };

  const totalPaid = selectedGroup
    ? selectedGroup.contributions.reduce((sum, c) => sum + c.amount, 0)
    : 0;

  const installmentAmount = selectedGroup?.loan
    ? Math.floor(selectedGroup.loan.amount / 2)
    : 0;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Microfinance Group Loan Management System</h1>

      {/* GROUP LIST */}
      <h2>Group List</h2>
      <input
        placeholder="Group Name"
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
      />
      <button onClick={addGroup}>Add Group</button>

      <ul>
        {groups.map(g => (
          <li key={g.id}>
            <button onClick={() => setSelectedGroupId(g.id)}>
              {g.name}
            </button>
          </li>
        ))}
      </ul>

      {selectedGroup && (
        <>
          <h2>Group Details</h2>
          <p><strong>Group:</strong> {selectedGroup.name}</p>

          {/* MEMBERS */}
          <h3>Add Member</h3>
          <input
            placeholder="Member Name"
            value={memberName}
            onChange={e => setMemberName(e.target.value)}
          />
          <button onClick={addMember}>Add Member</button>

          <ul>
            {selectedGroup.members.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>

          {/* LOAN APPLICATION */}
          <h2>Group Loan Application</h2>
          <input
            type="number"
            placeholder="Loan Amount"
            value={loanAmount}
            onChange={e => setLoanAmount(e.target.value)}
          />
          <button onClick={applyLoan}>Apply Loan</button>

          {selectedGroup.loan && (
            <>
              <p>
                Amount: ₹{selectedGroup.loan.amount} |
                Status: <strong>{selectedGroup.loan.status}</strong>
              </p>

              {selectedGroup.loan.status === "Pending" && (
                <>
                  <button onClick={() => updateLoanStatus("Approved")}>
                    Approve
                  </button>
                  <button onClick={() => updateLoanStatus("Rejected")}>
                    Reject
                  </button>
                </>
              )}

              {selectedGroup.loan.status === "Approved" && (
                <>
                  <h3>Loan Disbursement</h3>
                  <p>Loan Disbursed: ₹{selectedGroup.loan.amount}</p>

                  {/* REPAYMENT SCHEDULE */}
                  <h3>Repayment Schedule (Group Level)</h3>
                  <p>Installment Amount: ₹{installmentAmount}</p>

                  {/* REPAYMENT TRACKING */}
                  <h3>Repayment Tracking (Member Contributions)</h3>

                  <select
                    value={selectedMember}
                    onChange={e => setSelectedMember(e.target.value)}
                  >
                    <option value="">Select Member</option>
                    {selectedGroup.members.map((m, i) => (
                      <option key={i} value={m}>{m}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    placeholder="Contribution Amount"
                    value={contribution}
                    onChange={e => setContribution(e.target.value)}
                  />

                  <button onClick={addContribution}>
                    Add Contribution
                  </button>

                  <ul>
                    {selectedGroup.contributions.map((c, i) => (
                      <li key={i}>
                        {c.member} paid ₹{c.amount}
                      </li>
                    ))}
                  </ul>

                  <p><strong>Total Paid:</strong> ₹{totalPaid}</p>
                  <p><strong>Outstanding Balance:</strong> ₹{selectedGroup.loan.balance}</p>

                  {selectedGroup.loan.balance > 0 ? (
                    <p style={{ color: "red" }}>⚠ Overdue / Pending</p>
                  ) : (
                    <p style={{ color: "green" }}>✅ Fully Paid</p>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;

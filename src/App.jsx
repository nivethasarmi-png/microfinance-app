import { useState } from "react";
import "./App.css";

export default function App() {
  const [active, setActive] = useState("group");

  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const [memberName, setMemberName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  const [selectedMember, setSelectedMember] = useState("");
  const [contribution, setContribution] = useState("");

  const selectedGroup = groups.find(g => g.id === selectedGroupId);

  /* ---------- GROUP ---------- */
  const addGroup = () => {
    if (!groupName) return;
    setGroups([
      ...groups,
      { id: Date.now(), name: groupName, members: [], loan: null, contributions: [] }
    ]);
    setGroupName("");
  };

  const addMember = () => {
    if (!memberName || !selectedGroup) return;
    setGroups(groups.map(g =>
      g.id === selectedGroupId
        ? { ...g, members: [...g.members, memberName] }
        : g
    ));
    setMemberName("");
  };

  /* ---------- LOAN ---------- */
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
              balance: amount,
              disbursed: false
            },
            contributions: []
          }
        : g
    ));
    setLoanAmount("");
  };

  const approveLoan = () => {
    setGroups(groups.map(g =>
      g.id === selectedGroupId
        ? {
            ...g,
            loan: {
              ...g.loan,
              status: "Approved",
              disbursed: true
            }
          }
        : g
    ));
  };

  const rejectLoan = () => {
    setGroups(groups.map(g =>
      g.id === selectedGroupId
        ? { ...g, loan: { ...g.loan, status: "Rejected" } }
        : g
    ));
  };

  /* ---------- REPAYMENT ---------- */
  const addContribution = () => {
    if (!selectedMember || !contribution) return;
    const amount = Number(contribution);

    setGroups(groups.map(g =>
      g.id === selectedGroupId
        ? {
            ...g,
            contributions: [...g.contributions, { member: selectedMember, amount }],
            loan: { ...g.loan, balance: g.loan.balance - amount }
          }
        : g
    ));
    setContribution("");
  };

  const totalPaid = selectedGroup
    ? selectedGroup.contributions.reduce((sum, c) => sum + c.amount, 0)
    : 0;

  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Microfinance</h2>
        <button onClick={() => setActive("group")}>Group</button>
        <button onClick={() => setActive("loan")}>Loan</button>
        <button onClick={() => setActive("repay")}>Repayment</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        <h1>Microfinance Group Loan Management System</h1>

        {/* GROUP & MEMBERS */}
        {active === "group" && (
          <section>
            <h2>Group & Member Management</h2>

            <input
              placeholder="Group Name"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
            />
            <button onClick={addGroup}>Add Group</button>

            <ul>
              {groups.map(g => (
                <li key={g.id}>
                  <button className="link" onClick={() => setSelectedGroupId(g.id)}>
                    {g.name}
                  </button>
                </li>
              ))}
            </ul>

            {selectedGroup && (
              <>
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
              </>
            )}
          </section>
        )}

        {/* LOAN APPLICATION & DISBURSEMENT */}
        {active === "loan" && selectedGroup && (
          <section>
            <h2>Loan Application & Disbursement</h2>

            <input
              type="number"
              placeholder="Loan Amount"
              value={loanAmount}
              onChange={e => setLoanAmount(e.target.value)}
            />
            <button onClick={applyLoan}>Apply Loan</button>

            {selectedGroup.loan && (
              <>
                <p><strong>Loan Amount:</strong> ₹{selectedGroup.loan.amount}</p>
                <p><strong>Status:</strong> {selectedGroup.loan.status}</p>

                {selectedGroup.loan.status === "Pending" && (
                  <>
                    <button onClick={approveLoan}>Approve</button>
                    <button className="danger" onClick={rejectLoan}>Reject</button>
                  </>
                )}

                {/* LOAN DISBURSEMENT SECTION */}
                {selectedGroup.loan.disbursed && (
                  <div style={{ marginTop: "20px" }}>
                    <h3>Loan Disbursement</h3>
                    <p>
                      Loan of <strong>₹{selectedGroup.loan.amount}</strong> has been
                      successfully disbursed to the group.
                    </p>
                    <p><strong>Disbursement Status:</strong> Completed</p>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* REPAYMENT */}
        {active === "repay" && selectedGroup?.loan?.status === "Approved" && (
          <section>
            <h2>Repayment Tracking</h2>

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
            <button onClick={addContribution}>Add Payment</button>

            <ul>
              {selectedGroup.contributions.map((c, i) => (
                <li key={i}>{c.member} paid ₹{c.amount}</li>
              ))}
            </ul>

            <p><strong>Total Paid:</strong> ₹{totalPaid}</p>
            <p><strong>Outstanding Balance:</strong> ₹{selectedGroup.loan.balance}</p>

            {selectedGroup.loan.balance > 0
              ? <p className="warning">Overdue / Pending</p>
              : <p className="success">Loan Fully Repaid</p>}
          </section>
        )}
      </main>
    </div>
  );
}

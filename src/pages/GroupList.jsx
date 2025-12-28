import { useState } from "react";
import GroupList from "./pages/GroupList";
import GroupDetails from "./pages/GroupDetails";
import GroupLoanDashboard from "./pages/GroupLoanDashboard";
import LoanDisbursement from "./pages/LoanDisbursement";
import RepaymentSchedule from "./pages/RepaymentSchedule";
import RepaymentTracker from "./pages/RepaymentTracker";
import ReportsDashboard from "./pages/ReportsDashboard";

function App() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const addGroup = (name) => {
    setGroups([...groups, { id: Date.now(), name, members: [], loans: [], repayments: [] }]);
  };

  const updateGroup = (updatedGroup) => {
    setGroups(groups.map(g => g.id === updatedGroup.id ? updatedGroup : g));
    setSelectedGroup(updatedGroup);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Microfinance Group Loan Management System</h1>

      <GroupList groups={groups} addGroup={addGroup} onSelect={setSelectedGroup} />

      {selectedGroup && (
        <>
          <GroupDetails group={selectedGroup} updateGroup={updateGroup} />
          <GroupLoanDashboard group={selectedGroup} updateGroup={updateGroup} />
          <LoanDisbursement group={selectedGroup} />
          <RepaymentSchedule />
          <RepaymentTracker group={selectedGroup} />
          <ReportsDashboard groups={groups} />
        </>
      )}
    </div>
  );
}

export default App;

export default function ReportsDashboard({ groups }) {
  return (
    <>
      <h2>Reports Dashboard</h2>
      <p>Total Groups: {groups.length}</p>
      <p>Total Loans: {groups.reduce((a,g)=>a+g.loans.length,0)}</p>
    </>
  );
}

export default function RepaymentTracker({ group }) {
  return (
    <>
      <h2>Repayment Tracking</h2>
      <p>Members contributing: {group.members.length}</p>
      <p>Status: On Track</p>
    </>
  );
}

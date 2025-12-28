export default function LoanDisbursement({ group }) {
  const loan = group.loans.find(l => l.status === "Approved");

  if (!loan) return <p>No approved loan for disbursement</p>;

  return (
    <>
      <h2>Loan Disbursement</h2>
      <p>Total Loan: ₹{loan.amount}</p>
      {group.members.map((m, i) => (
        <p key={i}>{m.name} - Allocated (dummy)</p>
      ))}
    </>
  );
}

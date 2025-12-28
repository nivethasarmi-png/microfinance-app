function LoanDetails({ loan }) {
  if (!loan) {
    return null;
  }

  return (
    <div>
      <h2>Loan Details</h2>
      <p><strong>Name:</strong> {loan.name}</p>
      <p><strong>Amount:</strong> ₹{loan.amount}</p>
      <p><strong>Status:</strong> {loan.status}</p>
    </div>
  );
}

export default LoanDetails;

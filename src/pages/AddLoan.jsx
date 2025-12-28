import { useState } from "react";

function AddLoan({ addLoan }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount || !status) {
      setError("All fields are required");
      return;
    }

    addLoan({
      name,
      amount,
      status,
    });

    setName("");
    setAmount("");
    setStatus("");
    setError("");
  };

  return (
    <div>
      <h2>Add Loan</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Loan Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <input
          type="number"
          placeholder="Loan Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
        </select>
        <br />

        <button type="submit">Add Loan</button>
      </form>
    </div>
  );
}

export default AddLoan;

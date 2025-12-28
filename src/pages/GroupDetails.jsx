import { useState } from "react";

export default function GroupDetails({ group, updateGroup }) {
  const [member, setMember] = useState("");

  const addMember = () => {
    if (!member) return;
    updateGroup({ ...group, members: [...group.members, { name: member }] });
    setMember("");
  };

  return (
    <>
      <h2>Group Details</h2>
      <p>Group: {group.name}</p>

      <input value={member} onChange={e => setMember(e.target.value)} placeholder="Member Name" />
      <button onClick={addMember}>Add Member</button>

      <ul>
        {group.members.map((m, i) => <li key={i}>{m.name}</li>)}
      </ul>
    </>
  );
}

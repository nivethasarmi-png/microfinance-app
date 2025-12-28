function MemberProfile({ member }) {
  if (!member) return null;

  return (
    <div>
      <h2>Member Profile</h2>
      <p><strong>Name:</strong> {member.name}</p>
      <p><strong>Role:</strong> {member.role}</p>
    </div>
  );
}

export default MemberProfile;

import "./Profile.css";
const Profile = () => {
  return (
    <div>
      <h1 className="profileHeader">Account Information</h1>
      <form className="Profile-Form">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          required
          className="profile-fullName"
          value={localStorage.getItem("userName")}
        ></input>
        <label>Email Address</label>
        <input
          type="email"
          required
          name="email"
          className="profile-email"
          value={localStorage.getItem("userEmail")}
        ></input>
      </form>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    image: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
    mobile: "+1234567890",
    address: "123 Main St, City, Country",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    setUserDetails({
      ...userDetails,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  // Toggle edit/save mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save user details (could be an API call in real scenario)
  const saveDetails = () => {
    // Perform save action (e.g., API call to save user data)
    console.log("User details saved:", userDetails);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>{isEditing ? "Edit Profile" : "View Profile"}</h2>
        <button className="edit-button" onClick={toggleEdit}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-image">
          <img src={userDetails.image} alt="Profile" />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          )}
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="profile-field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="profile-field">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="profile-field">
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobile"
              value={userDetails.mobile}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="profile-field">
            <label>Delivery Address:</label>
            <textarea
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="save-button">
            <button onClick={saveDetails}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

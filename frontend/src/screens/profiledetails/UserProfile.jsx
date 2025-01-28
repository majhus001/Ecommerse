import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "./UserProfile.css";
import ProductList from "../Productscreens/ProductList";
import { useLocation, useNavigate } from "react-router-dom";
import ProfilePage from "./ProfilePage";

const UserProfile = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  return (
    <div className="user-prof">
      <div className="user-prof-nav">
        <Navbar userId={userId} />
      </div>
      <div className="user-side-prof">
        <div>
          <Sidebar userId={userId} />
        </div>
        <div className="user-prof-cont">
          <ProfilePage />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

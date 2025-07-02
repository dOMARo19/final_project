import React from 'react';
import { HiUserCircle } from "react-icons/hi";
import { useAuth } from '../context/AuthContext';

const ProfileIcon = () => {
    const { user } = useAuth();
    const isAuthenticated = user !== null;
  return (
    <div className="profile-icon">
      <HiUserCircle className="profile-icon__svg" />
      {isAuthenticated && (
        <span className="profile-icon__badge">{user?.name} {user?.lastName}</span>
      )}
    </div>
  )
}

export default ProfileIcon

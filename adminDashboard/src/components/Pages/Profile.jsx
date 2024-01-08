import React from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase'

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    };

  return (
    <div>
        <Navbar/>
        <div className='flex flex-col justify-center items-center h-screen '>
            <img 
                src={user && user.photoURL} 
                alt="Profile" 
                style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%', 
                    objectFit: 'cover' 
                }} 
            />
            <h1 className="mb-4">Name: {user && user.displayName}</h1>
            <h1>Your email: {user && user.email}</h1>
            <button onClick={handleLogout} className="p-2  cursor-pointer mb-4">
              Logout
            </button>
        </div>

    </div>
  )
}

export default Profile;

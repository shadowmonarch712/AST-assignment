import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import { auth } from '../firebase';

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
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

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };
      
    return (
        <div className={`h-screen fixed bg-blue-500 flex flex-col justify-between ${isCollapsed ? 'w-20' : 'w-64'}`}>
          <div>
            {!isCollapsed && (
              <>
                <div className="text-white text-2xl p-4">
                  Dashboard
                </div>
                <ul>
                  <li className="text-white p-2 hover:bg-blue-400 cursor-pointer" onClick={() => handleNavigation('/manage-users')}>Manage Users</li>
                  <li className="text-white p-2 hover:bg-blue-400 cursor-pointer" onClick={() => handleNavigation('/manage-api')}>API settings</li>
                  <li className="text-white p-2 hover:bg-blue-400 cursor-pointer" onClick={() => handleNavigation('/profile')}>Profile</li>
                </ul>
              </>
            )}
          </div>
          {!isCollapsed && (
            <button onClick={handleLogout} className="text-white p-2 hover:bg-blue-400 cursor-pointer mb-4">
              Logout
            </button>
          )}
          <button onClick={toggleSidebar} className="text-white p-2 hover:bg-blue-400 cursor-pointer absolute inset-y-0 right-0 m-auto h-10 w-10">
            {isCollapsed ? '>>' : '<<'}
          </button>
        </div>
      );
}

export default Navbar;

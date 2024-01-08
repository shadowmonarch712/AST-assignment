import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://wicked-cap-boa.cyclic.app/getusers');
                const usersWithStatus = await Promise.all(response.data.map(async user => {
                    const statusResponse = await axios.get(`https://wicked-cap-boa.cyclic.app/isBlocked/${user.userId}`);
                    console.log(statusResponse)
                    return {...user, isBlocked: statusResponse.data.exists};
                }));
                setUsers(usersWithStatus);
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

    const toggleBlockUser = async (userId, isBlocked) => {
        try {
            if (isBlocked) {
                await axios.delete(`https://wicked-cap-boa.cyclic.app/unblock/${userId}`);
            } else {
                await axios.post(`https://wicked-cap-boa.cyclic.app/block/${userId}`);
            }
            fetchUsers();
        } catch (error) {
            console.error('Failed to block/unblock user', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`https://wicked-cap-boa.cyclic.app/deleteuser/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    return (
        <div className="flex">
            <Navbar />
            <div className="flex-grow flex justify-center items-center">
                <div className="overflow-x-auto">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">User ID</th>
                                <th className="px-4 py-2">Location</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="border px-4 py-2">{user.userId}</td>
                                    <td className="border px-4 py-2">{user.location}</td>
                                    <td className="border px-4 py-2">{user.isBlocked ? 'Blocked' : 'Active'}</td>
                                    <td className="border px-4 py-2 space-x-4">
                                        <button className={`font-bold py-2 px-4 rounded ${user.isBlocked ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-700'} text-white`} onClick={() => toggleBlockUser(user.userId, user.isBlocked)}>
                                            {user.isBlocked ? 'Unblock User' : 'Block User'}
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteUser(user.userId)}>
                                            Delete User
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserTable;

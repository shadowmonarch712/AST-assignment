import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';


const ApiKeyManager = () => {
    const [apiKey, setApiKey] = useState('');
    const [newApiKey, setNewApiKey] = useState('');

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await axios.get('https://wicked-cap-boa.cyclic.app/api-key');
                console.log(response.data.apiKey)
                setApiKey(response.data.apiKey);
            } catch (error) {
                console.error('Failed to fetch API key', error);
            }
        };

        fetchApiKey();
    }, []);

    const handleChangeApiKey = async () => {
        try {
            await axios.post(`https://wicked-cap-boa.cyclic.app/api-key/${newApiKey}`);
            setApiKey(newApiKey);
            setNewApiKey('');
        } catch (error) {
            console.error('Failed to change API key', error);
        }
    };

    return (
      <div>
          <Navbar/>
          <div className='flex-grow flex flex-col justify-center items-center h-screen'>
              <h1>Current API Key: {apiKey}</h1>
              <div className="flex items-center space-x-4">
                  <input type="text" value={newApiKey} onChange={(e) => setNewApiKey(e.target.value)} placeholder="Enter new API key" />
                  <button onClick={handleChangeApiKey}>Change API Key</button>
              </div>
          </div>
      </div>
  );
};

export default ApiKeyManager;

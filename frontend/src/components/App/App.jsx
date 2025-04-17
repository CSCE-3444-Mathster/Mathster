import { useState, useEffect } from 'react'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider, Center, Tabs } from '@mantine/core';
import { useSpeechSynthesis } from 'react-speech-kit';
import { FocusTrap } from 'focus-trap-react';
import Auth from '../Auth/Auth.jsx';
import Branch_Layout from '../Branch_Layout/Branch_Layout.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('Sign In');
  const [token, setToken] = useState('');

  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    const checkToken = async () => {
      const savedToken = localStorage.getItem('mathsterToken');
      setToken(savedToken);
      if (savedToken){
        const response = await fetch(`${import.meta.env.VITE_API_URL}/login_token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token: savedToken })
        });
      
        const data = await response.json();
        if (!data.valid) {
          setToken('');
          localStorage.removeItem('mathsterToken');
        }
      }
      // handleFocus('Welcome to Mathster. etc.')
    };
  
    checkToken();
  }, []);
  

  const signOut = () => {
    setToken('');
    localStorage.setItem('mathsterToken', '');
  }

  const handleFocus = (branch) => {
    window.speechSynthesis.cancel();
    speak({ text: branch });
  }

  return (
    <FocusTrap>
      <div tabIndex={-1}>
      <MantineProvider>
        <div>
          <h1>Mathster</h1>
        </div>
        <div className='tab'>
          <Tabs value={activeTab} onChange={setActiveTab} allowTabDeactivation>
            <Tabs.List style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', gap: '16px' }}>
                <Tabs.Tab value="graph" onFocus={() => handleFocus('graphs')} tabIndex={3}>Graphs</Tabs.Tab>
                <Tabs.Tab value="geometry" onFocus={() => handleFocus('geometry')} tabIndex={4}>Geometry</Tabs.Tab>
                <Tabs.Tab value="algebra" onFocus={() => handleFocus('algebra')} tabIndex={5}>Algebra</Tabs.Tab>
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                {!token ? <Tabs.Tab value="Sign In" onFocus={() => handleFocus('sign in')} tabIndex={6}>Sign In</Tabs.Tab> : <Tabs.Tab value="Sign Out" onFocus={() => handleFocus('sign out')} tabIndex={6} onClick={signOut}>Sign Out</Tabs.Tab>}
              </div>
            </Tabs.List>
          </Tabs>
        </div>
        <div>
          {activeTab === "graph" && <Branch_Layout token={token} branch={'Graphs'}/>}
          {activeTab === "geometry" && <Branch_Layout token={token} branch={'Geometry'}/>}
          {activeTab === "algebra" && <Branch_Layout token={token} branch={'Algebra'}/>}
        </div>
        <Center>{activeTab === "Sign In" && !token && <Auth setToken={setToken}/>}</Center>
        
      </MantineProvider>
      </div>
    </FocusTrap>
  )
}

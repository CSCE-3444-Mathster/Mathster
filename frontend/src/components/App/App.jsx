import { useState } from 'react'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Tabs } from '@mantine/core';
import { Button } from '@mantine/core';
import Graph from '../Graph/Graph.jsx';
import Geometry from '../Geometry/Geometry.jsx';
import Algebra from '../Algebra/Algebra.jsx';
import AudioInput from '../audio-input.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState();
  const [showAudioInput, setShowAudioInput] = useState(false); // Manage the visibility of the audio input

  // Toggle the visibility of the audio input when the record button is pressed
  const handleRecordAudio = () => {
    setShowAudioInput(true);
  };

  return (
    <>
      <MantineProvider>
      <div>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List justify="center">
            <Tabs.Tab value="graph">Graphs</Tabs.Tab>
            <Tabs.Tab value="geometry">Geometry</Tabs.Tab>
            <Tabs.Tab value="algebra">Algebra</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        {/* Button to start recording */}
        {/* Always render AudioInput regardless of button press */}
        <AudioInput />
      </div>
        <div>
          {activeTab === "graph" && <Graph />}
          {activeTab === "geometry" && <Geometry />}
          {activeTab === "algebra" && <Algebra />}
        </div>

        <div>
      
    </div>
      </MantineProvider>
    </>
  )
}

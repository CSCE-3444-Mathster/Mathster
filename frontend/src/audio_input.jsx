//record audio from user microphone (using mic button?) on main landing page
//Send to backend python script for processing (turn into text)
//Receive text from backend, navigate to correct UI element
import React, { useState } from 'react';
import { Button } from '@mantine/core';
//import { useNavigate } from 'react-router-dom';

export default function audio_input(){
    //const [audioBlob, setAudioBlob] = useState();
    const [response, setResponse] = useState()

    const handleAudioRecord = async () => {
        try {
            //Get user audio from microphone
            const stream = await navigator.mediaDevices.getUserMedia({audio:true});

            const mediaRecorder = new MediaRecorder(stream);
            const audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                // Create a Blob from the audioChunks
                const newAudioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                //setAudioBlob(newAudioBlob);  // Use setAudioBlob to update the state

                // Now use the updated audioBlob in FormData
                const formData = new FormData();
                formData.append('audio', newAudioBlob, 'audio.wav'); // Append the new recorded audio blob

                // Send the audio to the backend via a POST request
                try {
                    //change to: not VITE API, UI navigation. Response will just be text
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/audio-input/`, {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();

                    // Log the backend response data to inspect the structure
                    console.log('Backend data:', data);

                    // Log response text to check for issues
                    const text = await response.text();
                    console.log('Backend response:', text); // Check if it's a valid JSON string

                    // Check for recognized text from the backend
                    const recognizedText = data.text;
                    setResponse(recognizedText);  // Display the backend's response
                    
                    // Perform UI navigation based on the recognized text
                    if (recognizedText) {
                        if (recognizedText.toLowerCase().includes("algebra")) {
                            navigate('/algebra');  // Navigate to the algebra route
                        } else if (recognizedText.toLowerCase().includes("geometry")) {
                            navigate('/geometry');  // Navigate to the geometry route
                        } else if (recognizedText.toLowerCase().includes("graph")) {
                            navigate('/graph');  // Navigate to the graph route
                        } else {
                            setResponse("Unrecognized command, please try again.");
                        }
                    } else {
                        setResponse("No valid speech detected.");
                    }

                } catch (error) {
                    setResponse('Error uploading audio');
                    console.error('Error uploading audio:', error);
                }
            };

            mediaRecorder.start();
            console.log("Recording started...");

            // Stop recording after 1.5 second(s) (adjust as necessary)
            setTimeout(() => {
                mediaRecorder.stop();
                console.log("Recording stopped...");
            }, 1500); // Adjust the time as needed (in milliseconds)
    } catch (error) {
        console.error('Error accessing microphone:', error);
        setResponse('Failed to access microphone');
    }
    };

    //change return to: receive returned text from backend (will be valid command)->navigate UI
    //Button:when pressed, record audio
    return (
        <>
        <div>
            <Button onClick={handleAudioRecord}>
                Record
            </Button>
        </div>
            <p>{response}</p>
        </>
      );
}

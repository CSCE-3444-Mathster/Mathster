//record audio from user microphone (using mic button?) on main landing page
//Send to backend python script for processing (turn into text)
//Receive text from backend, navigate to correct UI element
import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function audio_input(){
    const [audioBlob, setAudioBlob] = useState();
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
                audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                setAudioBlob(audioBlob);

                // Prepare the FormData to send the audio file
                const formData = new FormData();
                formData.append('audio', audioBlob, 'audio.wav'); // Append the recorded audio blob

                // Send the audio to the backend via a POST request
                try {
                    //change to: not VITE API, UI navigation. Response will just be text
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/audio-input/`, {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();

                    // Check for recognized text from the backend
                    const recognizedText = data.recognized_text;
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
            <h1>Speech Input:</h1>
            <Button onClick={handleAudioRecord}>    
                Record
            </Button>
          </div>
          <p>{response}</p>
        </>
      );
}

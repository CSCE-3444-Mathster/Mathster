//record audio from user microphone (using mic button?) on main landing page
//Send to backend python script for processing (turn into text)
import React, { useState } from 'react';
import { Button } from '@mantine/core';

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
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/audio-input/`, {
                        method: 'POST',
                        body: formData,
                    });
                    const data = await response.json();
                    setResponse(data.response);  // Display the backend's response
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

    return (
        <>
          <div>
            <h1>Speech Input:</h1>
            <Button onChange={handleAudioRecord} accept="audio/wav">
                {(props) => <Button {...props}>Record</Button>}
            </Button>
          </div>
          <p>{response}</p>
        </>
      );
}

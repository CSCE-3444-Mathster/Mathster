//using react-speech-to-text, handle audio recording and UI navigation
//Unlike audio-input branch, recording, processing, and navigation are all handled in frontend through React

//TODO: add react-speech-to-text to requirements.txt
//TODO: add handleAudioRecording from old branch--scrapped, use recordAudio function. Check with old func for help
//TODO: add UI nav wrapper/UI navigation functionality
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

//Now: records audio, recognized commands, returns recognition of command
//Change to: UI Navigation
const recordAudio = () => {
    const [message, setMessage] = useState('');
    const navigate=useNavigate();

    const commands = [
        {
            command: ['algebra', 'geometry', 'graph', 'sign in', 'log in', 'file upload'],
            callback: (command) => {
                const route = command.toLowerCase();
                //if log in/sign in: redirect to Auth
                setMessage(`You said: ${command}`);
                setMessage(`Navigating to: ${route}`);
                navigate(`/${route}`);
            }
        }
    ]
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button onClick={SpeechRecognition.startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <p>{message}</p>
          <p>{transcript}</p>
        </div>
    );
};
export default recordAudio(); 
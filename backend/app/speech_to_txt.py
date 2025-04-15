#Recieves input from audio_input.jsx in frontend, processes audio into text, navigates to file input
#Note: switch to different API than google (Sphinx?)--requires pip install SpeechRecognition[pocketsphinx] in req
from flask import Blueprint, jsonify, request
import os
import speech_recognition as sr
import base64

bp = Blueprint("audio-input", __name__, url_prefix="/audio-input")
rec = sr.Recognizer()   #recognizes audio as words that can be converted 

#read&encode 
@bp.route("/", methods ="POST")
def speech_to_text():       #Process audio(wav) file into text
    if "audio" not in request.files:
        return jsonify({"error": "No audio uploaded"}), 400

    audio_file = request.files["audio"]
    
    try:
        with sr.AudioFile(audio_file) as source:
                audio = rec.record(source)
                text = rec.recognize_sphinx(audio)

        #FIXME: make following integrate w/ actual features: send back valid text
        if "algebra" in text.lower(): #FIXME: change to recognize_sphinx
            #link to algebra route/click tab
            #after linked, prompt image upload
            return jsonify({"recognized_text": text}), 200
        elif "geometry" in text.lower():  # Check for "geometry"
                print("geometry route")
                return jsonify({"recognized_text": text}), 200
        elif "graph" in text.lower():  # Check for "graph"
                print("graph route")
                return jsonify({"recognized_text": text}), 200
        else:
            return jsonify({"error": "Unrecognized command"}), 400
        #return jsonify({"recognized_text": text}), 200
        
    except sr.UnknownValueError:
        return jsonify({"error": "Could not understand the audio"}), 400
    except sr.RequestError as e:
        return jsonify({"error": f"Error with PocketSphinx: {e}"}), 500
    # Respond with the recognized text

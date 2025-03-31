#Recieves input from audio_input.jsx in frontend, processes audio into text, navigates to file input
#Note: switch to different API than google (Sphinx?)

from flask import Blueprint, jsonify, request
import os
import speech_recognition
import base64

bp = Blueprint("audio-input", __name__, url_prefix="/audio-input")

rec = speech_recognition.Recognizer()
#read&encode 
def speech_to_text():   #Process audio file into text
    try:
        audio_text = request.files['audio']

    except Exception as e:
        return jsonify({'response': f'Error: {str(e)}'}), 500

    #FIXME: make following integrate w/ actual features:
    if rec.recognize_google(audio_text)=="algebra": #FIXME: change from google
        #link to algebra route/click tab
        #after linked, prompt image upload
        print("algebra route")
    elif rec.recognize_google(audio_text)=="geometry":  #FIXME: change from google
        #link to geometry route/click tab
        #after linked, prompt image upload
        print("geometry route")
    elif rec.recognize_google(audio_text)=="graph": #FIXME: change from google
        #link to graph route/click tab
        #after linked, prompt image upload
        print("graph route")
    else:
        return jsonify({"error": "Unrecognized command"}), 400

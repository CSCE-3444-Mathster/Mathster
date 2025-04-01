#Recieves input from audio_input.jsx in frontend, processes audio into text, navigates to file input
#Note: switch to different API than google (Sphinx?)--requires pip install SpeechRecognition[pocketsphinx] in req
from flask import Blueprint, jsonify, request
import os
import speech_recognition
import base64

bp = Blueprint("audio-input", __name__, url_prefix="/audio-input")
rec = speech_recognition.Recognizer()   #recognizes audio as words that can be converted 

#read&encode 
@bp.route("/", methods ="POST")
def speech_to_text():       #Process audio(wav) file into text
    if "image" not in request.files:
        return jsonify({"error": "No audio uploaded"}), 400

    audio_text = request.files['audio']

    #FIXME: make following integrate w/ actual features:
    if rec.recognize_google(audio_text)=="algebra": #FIXME: change to recognize_sphinx
        #link to algebra route/click tab
        #after linked, prompt image upload
        print("algebra route")
    elif rec.recognize_google(audio_text)=="geometry":  #FIXME: change to recognize_sphinx
        #link to geometry route/click tab
        #after linked, prompt image upload
        print("geometry route")
    elif rec.recognize_google(audio_text)=="graph": #FIXME: change to recognize_sphinx
        #link to graph route/click tab
        #after linked, prompt image upload
        print("graph route")
    else:
        return jsonify({"error": "Unrecognized command"}), 400

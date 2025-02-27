from app import create_app
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = create_app()
CORS(app)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400
    
    # Save the file to the server
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)
    
    return jsonify({"message": f"File {file.filename} uploaded successfully!", "filepath": filepath})

if __name__ == "__main__":
    app.run(debug=True)
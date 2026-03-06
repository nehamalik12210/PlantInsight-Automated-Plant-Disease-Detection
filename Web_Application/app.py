from flask import Flask, request, render_template, jsonify, url_for
import os
import requests
from werkzeug.utils import secure_filename
import logging

# Initialize Flask app
app = Flask(__name__)

# CONFIGURATION
UPLOAD_FOLDER = 'static/upload/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# IMPORTANT: Update this URL to your actual Hugging Face Space URL
HUGGING_FACE_API_URL = 'https://neha12210-plant-insight-api.hf.space/predict_api'
HF_TOKEN = os.getenv("HF_TOKEN") 

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Setup logging
logging.basicConfig(level=logging.INFO)

# Helper function to check if the uploaded file is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Function to classify severity
def classify_severity(confidence_score):
    if confidence_score >= 70:
        return 'Mild', 'green'
    elif 50 <= confidence_score < 70:
        return 'Moderate', 'orange'
    else:
        return 'Severe', 'red'

# --- MAIN ROUTES ---

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'})
            
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            try:
                # Forward the image to your Hugging Face "Brain"
                headers = {"Authorization": f"Bearer {HF_TOKEN}"}
                with open(file_path, 'rb') as f:
                    files = {'file': (filename, f, file.mimetype)}
                    response = requests.post(HUGGING_FACE_API_URL, headers=headers, files=files)
                
                response.raise_for_status() 
                result = response.json()
                
                if 'error' in result:
                     return jsonify({'error': f"API Error: {result['error']}"})

                predicted_class = result.get('predicted_class')
                confidence = result.get('confidence', 0.0)

                severity, color = classify_severity(confidence)

                return jsonify({
                    'predicted_class': predicted_class,
                    'confidence': f"{confidence:.2f}%",
                    'severity': severity,
                    'color': color,
                    'image_url': url_for('static', filename='upload/' + filename)
                })

            except Exception as e:
                logging.error(f"Error: {e}")
                return jsonify({'error': "API is warming up or connection failed. Please try again in 30s."})

    return render_template('index.html')

# --- ADDITIONAL PROJECT ROUTES ---

@app.route('/Contact_Us')
def contact_us():
    return render_template('Contact_Us.html')

@app.route('/Why_PlantAI')
def why_plantai():
    return render_template('Why_PlantAI.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/PlantDiseases')
def plant_diseases():
    return render_template('PlantDiseases.html')

@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/result/<filename>')
def result(filename):
    return render_template('upload_success.html', filename=filename)

# Logic for your specific JS-driven features
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    confidence_score = data.get('confidence', 0)
    severity, color = classify_severity(confidence_score)
    return jsonify({
        'severity': severity,
        'color': color,
        'confidence_score': confidence_score,
        'message': f'Disease is classified as {severity} with a confidence score of {confidence_score}%.'
    })

@app.route('/disease_diversity', methods=['POST'])
def disease_diversity():
    data = request.get_json()
    confidence_score = data.get('confidence', 0)
    severity, color = classify_severity(confidence_score)
    return jsonify({
        'severity': severity,
        'color': color,
        'diversity_score': confidence_score,
        'message': f'Disease diversity is classified as {severity} with a diversity score of {confidence_score}%.'
    })

if __name__ == "__main__":
    app.run(debug=True)
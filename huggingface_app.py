from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import cv2
import os

app = Flask(__name__)

# Load Model
MODEL_PATH = os.path.join("Web Application", "Model", "trained_cnn_model_final.h5")
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

CLASS_NAMES = [
    "Bacterial Blight (CBB)", "Brown Streak Disease (CBSD)", "Green Mottle (CGM)", "Healthy",
    "Mosaic Disease (CMD)", "Rice_BrownSpot", "Rice_Healthy", "Rice_Hispa", "Rice_LeafBlast",
    "apple_apple scab", "apple_healthy", "bacterial spot", "black rot", "cedar apple rust",
    "cherry (including sour)_healthy", "cherry (including sour)_powdery mildew", "corn (maize)",
    "corn (maize)_cercospora leaf spot gray leaf spot", "corn (maize)_common rust", "corn (maize)_healthy",
    "corn (maize)_northern leaf blight", "early blight", "grape", "grape_black rot",
    "grape_esca (black measles)", "grape_healthy", "grape_leaf blight (isariopsis leaf spot)",
    "healthy", "healthy_healthy", "late blight", "orange", "orange_haunglongbing (citrus greening)",
    "peach", "peach_bacterial spot", "peach_healthy", "pepper, bell", "squash_powdery mildew",
    "strawberry_healthy", "strawberry_leaf scorch", "tomato_bacterial spot", "tomato_early blight",
    "tomato_healthy", "tomato_late blight", "tomato_leaf mold", "tomato_septoria leaf spot",
    "tomato_spider mites two-spotted spider mite", "tomato_target spot", "tomato_tomato mosaic virus",
    "tomato_tomato yellow leaf curl virus"
]

def preprocess_image(image):
    image = tf.image.resize(image, [128, 128])
    image = image / 255.0
    return np.expand_dims(image, axis=0)

def segment_leaf(image):
    gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    _, thresh = cv2.threshold(blurred, 120, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    mask = np.zeros_like(gray)
    cv2.drawContours(mask, contours, -1, (255), thickness=cv2.FILLED)
    return cv2.bitwise_and(image, image, mask=mask)

@app.route('/predict_api', methods=['POST'])
def predict_api():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Read image directly from memory
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        if image is None:
             return jsonify({'error': 'Invalid image format'}), 400
        
        # Convert BGR to RGB (OpenCV uses BGR by default)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        segmented_image = segment_leaf(image)
        processed_image = preprocess_image(segmented_image)

        prediction = model.predict(processed_image)
        predicted_class_index = np.argmax(prediction, axis=1)[0]
        confidence = float(np.max(prediction, axis=1)[0] * 100)
        
        predicted_class = CLASS_NAMES[predicted_class_index]
        
        return jsonify({
            'predicted_class': predicted_class,
            'confidence': confidence
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7860)

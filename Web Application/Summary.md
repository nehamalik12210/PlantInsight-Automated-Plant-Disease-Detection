# Milestone 4: Web Application and Deployment

This folder contains the complete, user-facing web application that brings together the AI vision model and an intuitive interface designed for farmers, gardeners, and agricultural enthusiasts. 

## Overview

The web application is built using the **Flask** web framework in Python. It serves as the bridge between the trained CNN model (from Milestone 3) and the end-user, allowing anyone to upload an image of a plant leaf and receive an instant disease diagnosis.

## Architecture and Key Components

The folder is structured to separate the backend logic, frontend templates, static assets, and ML models:

### 1. Backend (`app.py`)
- **Flask Framework:** Handles URL routing, HTTP requests (GET/POST), and server-side logic.
- **Model Integration:** Loads the saved `trained_cnn_model_final.h5` model using TensorFlow/Keras.
- **Image Processing Pipeline:** When a user uploads an image, the backend runs the following crucial steps:
    - **Security:** Verifies the file extension and secures the filename.
    - **Segmentation:** Applies the `segment_leaf` function (using OpenCV, Grayscale conversion, Gaussian Blur, Thresholding, and Contours) to isolate the leaf from the background, ensuring the input matches the conditions the model was trained on.
    - **Preprocessing:** Resizes the image to the required dimensions (128x128 pixels), normalizes the pixel values (0-1), and expands dimensions to create a batch suitable for the CNN.
- **Prediction & Diagnostics:** Passes the processed image to the CNN, translates the output vector into one of the 38 predicted classes, and calculates a confidence score (%).
- **Severity Classification:** Based on the confidence score, the backend categorizes the disease severity as Mild (Green), Moderate (Orange), or Severe (Red).
- **APIs:** Exposes endpoints like `/predict` and `/disease_diversity` to return JSON responses for dynamic front-end updates.

### 2. Frontend (`Templates/` and `Static/`)
The user interface is designed to be clean, accessible, and informative:
- **HTML Templates:** Uses Jinja2 templating to render pages.
    - `index.html`: The main landing page featuring the drag-and-drop image upload utility.
    - `PlantDiseases.html`: A comprehensive library/database of plant diseases, including symptoms and recommended treatments.
    - `Why_PlantAI.html` & `about.html`: Contextual pages explaining the mission and benefits of the automated detection system.
    - `Contact_Us.html`: A functional form for user inquiries.
- **Static Assets (`Static/`):** Contains CSS files for styling, UI images (`Website UI images/`), and JavaScript files that handle client-side logic.

### 3. AI Chatbot Assistant
- The application features an integrated AI chatbot powered by the **Google Gemini API** (`gemini-2.5-flash`). The logic for this is handled in `Static/js/chatbot.js`. This assistant is embedded in the pages and can answer user queries related to plant health, disease treatments, or general agriculture interactively.

## Running the Application Locally

1. Open your terminal or command prompt.
2. Navigate to the base project folder (or `Web Application` folder depending on your setup).
3. Activate the virtual environment located in the `venv` folder (e.g., `.\venv\Scripts\activate` on Windows).
4. Run the Flask development server: `python app.py` (or `python "Web Application/app.py"`)
5. Open a web browser and go to `http://127.0.0.1:5000/`.

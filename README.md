# PlantAI - Automated Plant Disease Detection 🌱

PlantAI is a full-stack automated machine learning project designed to detect plant diseases from leaf images. By combining computer vision, deep learning, and a user-friendly web interface, this platform allows farmers, gardeners, and agricultural enthusiasts to quickly identify plant health issues and discover actionable solutions.

The model is trained on a comprehensive dataset and can classify **38 different classes** (including both healthy leaves and various diseases across multiple plant species).

**Website Link** : https://plantinsight.onrender.com/ 

## Project Overview & Milestones

This project was developed in 4 distinct milestones, progressing from raw data to a fully deployed web application:

### Milestone 1: Image Preprocessing
* **Objective:** Clean and standardize the raw dataset.
* **Key Steps:** 
  * Loaded images using OpenCV.
  * Resized all images to a uniform 224x224 pixels.
  * Normalized pixel values (0-1 range) to improve neural network training efficiency.
  * Saved the processed images into organized NumPy arrays for fast loading.

### Milestone 2: Image Segmentation
* **Objective:** Isolate the plant leaf from complex backgrounds (like soil, hands, or shadows) so the AI focuses only on the leaf symptoms.
* **Key Steps:**
  * Converted images to HSV/LAB color spaces to better isolate greens.
  * Applied **Otsu's Binarization** and the **GrabCut algorithm** to iteratively mask and extract the foreground leaf.
  * Used morphological operations (dilation/erosion) to clean up noise and perfect the mask.

### Milestone 3: Model Training (CNN)
* **Objective:** Build and train a Convolutional Neural Network (CNN) to classify the 38 plant diseases.
* **Key Steps:**
  * Created a custom sequential CNN using **TensorFlow/Keras**.
  * Split the data into Training (70%), Validation (20%), and Test (10%) sets.
  * Applied extensive Data Augmentation (rotation, zoom, flips) to prevent overfitting.
  * Trained for 10 epochs using the Adam optimizer and Categorical Crossentropy loss.
  * Implemented callbacks like `ModelCheckpoint` and `EarlyStopping`.
  * **Result:** Achieved **~92% Test Accuracy**, saving the final weights as `trained_cnn_model_final.h5`.

### Milestone 4: Web Application & UI
* **Objective:** Provide an intuitive, accessible frontend for users to interact with the trained model.
* **Key Steps:**
  * Built a backend using the **Flask** python framework to serve the HTML pages and handle HTTP requests.
  * Integrated an image-processing pipeline in `app.py` that takes a user's uploaded image, segments it, resizes it to 128x128, and passes it to the `.h5` model for a prediction.
  * Designed detailed, responsive HTML pages including a Home page (for uploads), a comprehensive Plant Disease Library, and About/Contact pages.
  * Integrated a **Google Gemini-powered AI Chatbot** directly into the UI to answer user questions about plant care and agriculture in real-time.

---

## How to Run This Project Locally

If you want to run this application on your own computer, follow these steps:

### Prerequisites
* You must have Python 3.8+ installed on your system.
* (Recommended) Use a virtual environment to avoid package conflicts.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-github-repository-url>
   cd "PlantAI Intern Project"
   ```

2. **Create a Virtual Environment (Optional but highly recommended):**
   * **Windows:**
     ```bash
     python -m venv venv
     .\venv\Scripts\activate
     ```
   * **macOS/Linux:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Dependencies:**
   Install all required libraries using the provided `requirements.txt` file.
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application:**
   Start the Flask development server.
   ```bash
   cd "Web Application"
   python app.py
   ```

5. **Use the App:**
   Open your web browser and navigate to:
   `http://127.0.0.1:5000/`

---

## Technical Stack
* **Frontend:** HTML5, Vanilla CSS, JavaScript (Jinja2 Templating)
* **Backend:** Python, Flask, Werkzeug
* **Machine Learning:** TensorFlow, Keras, Scikit-Learn
* **Computer Vision:** OpenCV (opencv-python-headless)
* **AI Integration:** Google Generative AI (Gemini 2.5 Flash)
* **Data Handling:** NumPy, Pandas

---

## Usage Guide
1. **Upload an Image:** Navigate to the main page and upload a clear, well-lit photo of a diseased or healthy plant leaf.
2. **Review Prediction:** The system will immediately process the image and return the predicted disease name, a confidence score (%), and a severity rating (Mild, Moderate, Severe).
3. **Consult the Library:** Use the specific "Plant Disease Library" page to look up detailed symptoms and treatment plans for the diagnosed disease.
4. **Ask the Chatbot:** If you need specific advice on fertilizers, watering schedules, or treatment methods, use the floating chat icon in the bottom right corner to speak with the PlantAI Assistant!

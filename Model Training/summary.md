# Milestone 3: Model Training

This folder contains the core machine learning pipeline. It builds upon the preprocessed and segmented dataset to train a Convolutional Neural Network (CNN) capable of classifying plant diseases across 38 different classes.

## Overview

The `CNN_MODEL_TRAINING.ipynb` notebook outlines the end-to-end process of designing, training, and evaluating the CNN model. 

The pipeline uses the **TensorFlow / Keras** framework and is designed to run efficiently on Google Colab using a T4 GPU.

## Key Steps and Architecture

### 1. Data Preparation and Splitting
- The preprocessed dataset is unzipped from Google Drive.
- It is initially split into a training set (70%) and a validation set.
- The validation set is further divided to create a dedicated **test set (10%)** and a final **validation set (20%)**. This ensures that the model is evaluated on unseen data after training.

### 2. Data Augmentation
To prevent overfitting and make the model more robust, data augmentation is applied to the training set using `ImageDataGenerator`. Techniques include:
- Rescaling (normalization to 0-1)
- Rotation (up to 20 degrees)
- Width and Height shifting (up to 20%)
- Shearing and Zooming
- Horizontal flipping

### 3. CNN Architecture
A custom, sequential CNN is built from scratch. The architecture consists of:
- **Input:** 224x224 RGB images.
- **Convolutional Layers:** Three Conv2D layers (32, 64, and 128 filters respectively) using 3x3 kernels and ReLU activation. These layers are responsible for extracting features like edges, textures, and ultimately complex patterns (diseases).
- **Pooling Layers:** MaxPooling2D layers follow each convolutional layer to reduce spatial dimensions, reducing computation and controlling overfitting.
- **Flattening:** Flattens the 2D feature maps into a 1D vector.
- **Dense Layers:** A fully connected layer with 512 neurons (ReLU activation), concluding with an output layer of 38 neurons (Softmax activation, one for each disease class).
- **Total Parameters:** ~44.4 million (all trainable).

### 4. Training Process
- **Optimizer:** Adam.
- **Loss Function:** Categorical Crossentropy (standard for multi-class classification).
- **Epochs:** 10.
- **Callbacks used for optimization:**
    - **ModelCheckpoint:** Saves the best model (based on validation accuracy) during training.
    - **EarlyStopping:** Stops training if the validation loss doesn't improve for 5 epochs.
    - **ReduceLROnPlateau:** Reduces the learning rate if the validation loss plateaus, allowing for finer weight adjustments.

### 5. Evaluation and Metrics
The model achieved an impressive performance:
- **Test Accuracy:** ~92%
- **Precision, Recall, F1-Score:** Detailed in the notebook's classification report, showing strong performance across most individual classes.
- Visualizations include accuracy and loss plots over epochs, as well as a confusion matrix to analyze misclassifications.

### 6. Model Export
The final trained weights are saved in the HDF5 format (`cnn_model.h5`), making them ready for deployment in the web application.

### Update
The CNN model is hosted on Hugging Face Spaces to handle high-memory inference using a Dockerized Flask API. You can view the model repository and the backend logic here: https://huggingface.co/spaces/Neha12210/plant-insight-api



# Milestone 1: Image Preprocessing

This folder contains the crucial initial step of the PlantAI project: preparing and augmenting the plant leaf images before they are fed into the deep learning model.

## Overview

High-quality machine learning models require high-quality, standardized data. The `ImagePreprocessing.ipynb` notebook takes raw images from the dataset and applies a series of computer vision and image processing techniques to normalize the data and artificially expand the dataset through augmentation.

This preprocessing pipeline is built using:
- **TensorFlow** (`tf.image`)
- **OpenCV** (`cv2`)
- **NumPy**
- **SciPy** (`scipy.ndimage`)

## Preprocessing Techniques Applied

The notebook applies the following transformations to the images:

### 1. Standardization
- **Resizing:** All images are resized to a uniform target size of `224x224` pixels to match the expected input shape of the ResNet50V2 model used in later milestones.
- **Normalization:** Pixel values are converted to `float32` and scaled from `[0, 255]` to `[0, 1]` to help the neural network converge faster during training.

### 2. Data Augmentation
To prevent overfitting and make the model more robust, the dataset is artificially expanded using:
- **Horizontal Flipping**
- **Random Rotations** (90-degree increments)
- **Random Zoom** (cropping 70% of the image and resizing back to `224x224`)
- **Color Adjustments:** Random changes to Brightness, Contrast, Saturation, and Hue.

### 3. Advanced Computer Vision Filters
To highlight specific leaf features (like veins, edges, or texture) and remove noise, several advanced filters are applied:
- **Grayscale Conversion:** Simplifies the image to just intensity values.
- **Canny Edge Detection:** Highlights the structural outlines of the leaf and any lesions/spots.
- **Histogram Equalization:** Applied to the Y channel (luminance) of the YUV color space to improve the global contrast of the images without distorting the colors.
- **Gaussian Blur:** Softens the image slightly to reduce high-frequency noise.
- **Median Filtering:** Highly effective at removing "salt and pepper" noise from the images without blurring the sharp edges.

## Usage
The notebook is designed to be run in a Google Colab environment (as evidenced by the Google Drive mounting and `!pip install` commands). It extracts the raw dataset from a zip file, processes the images, and visualizes the effects of each technique using `matplotlib`.

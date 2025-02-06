import tensorflow as tf
import numpy as np


class RockPaperScissorsClassifier:
    def __init__(self, model_path):
        self.model_path = model_path
        self.model = None  # Load the model lazily
        self.class_names = ['paper', 'rock', 'scissors']
        self.img_size = (150, 150)  # Default image size (update if needed)

    def _load_model(self):
        if self.model is None:
            self.model = tf.keras.models.load_model(self.model_path)
            # Print model summary for debugging
            self.model.summary()

    def preprocess_image(self, image_stream):
        """
        Preprocess the image to match the model's input shape.
        """
        # Read the content of the InMemoryUploadedFile
        image_bytes = image_stream.read()

        # Use TensorFlow to decode the image
        img = tf.image.decode_image(image_bytes, channels=3)
        img = tf.image.resize(img, self.img_size)  # Resize to the expected input size
        img = img / 255.0  # Normalize pixel values to [0, 1]

        # Check the model's input shape and reshape if necessary
        if len(self.model.input_shape) == 2:  # Flattened input (e.g., (None, 41472))
            img = tf.reshape(img, (1, -1))  # Flatten to (1, height * width * channels)
        else:  # 2D/3D input (e.g., (None, height, width, channels))
            img = tf.expand_dims(img, axis=0)  # Add batch dimension

        return img

    def predict(self, image_stream):
        """
        Predict the class of the input image.
        """
        self._load_model()  # Ensure the model is loaded
        processed_img = self.preprocess_image(image_stream)
        predictions = self.model.predict(processed_img)
        return {
            'class': self.class_names[np.argmax(predictions)],
            'confidence': float(np.max(predictions))
        }
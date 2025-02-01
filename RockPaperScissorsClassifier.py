import tensorflow as tf
import numpy as np
from PIL import Image


class RockPaperScissorsClassifier:
    def __init__(self, model_path):
        self.model = tf.keras.models.load_model(model_path)
        self.class_names = ['paper', 'rock', 'scissors']
        self.img_size = (150, 150)

    def preprocess_image(self, image_stream):
        img = Image.open(image_stream).convert('RGB')
        img = img.resize(self.img_size)
        img_array = np.array(img) / 255.0
        return np.expand_dims(img_array, axis=0)

    def predict(self, image_stream):
        processed_img = self.preprocess_image(image_stream)
        predictions = self.model.predict(processed_img)
        return {
            'class': self.class_names[np.argmax(predictions)],
            'confidence': float(np.max(predictions))
        }

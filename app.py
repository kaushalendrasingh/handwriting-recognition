from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import tensorflow as tf
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Server is running!"

@app.before_request
def before_request():
    print("Incoming request:", request.method, request.url)
    # print("Headers:", dict(request.headers))
    print("Form data:", request.form)
    print("Files:", request.files)

# Load the trained model
model = tf.keras.models.load_model('mnist_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    try:
        # Read the image file
        file = request.files['image']
        img = Image.open(file).convert('L')  # Convert to grayscale
        img = img.resize((28, 28))  # Resize to 28x28
        img_array = np.array(img).astype('float32') / 255.0  # Normalize
        img_array = img_array.reshape(1, 28, 28, 1)  # Reshape for model

        # Make prediction
        prediction = model.predict(img_array)
        predicted_digit = np.argmax(prediction, axis=1)[0]
        confidence = float(np.max(prediction))

        return jsonify({
            'digit': int(predicted_digit),
            'confidence': confidence
        })
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
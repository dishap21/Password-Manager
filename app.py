from flask import Flask, request, jsonify
import pickle
import numpy as np
import os

app = Flask(__name__)

script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, 'model', 'model.pkl')

def load_model():
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    return model

def extract_features(password):
    length = len(password)
    characters = sum(1 for char in password if char.isalpha())
    digits = sum(1 for char in password if char.isdigit())
    upper_case = sum(1 for char in password if char.isupper())
    lower_case = sum(1 for char in password if char.islower())
    special_chars = sum(1 for char in password if not char.isalnum())
    return np.array([length, characters, digits, upper_case, lower_case, special_chars]).reshape(1, -1)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        passwords = data['passwords']
        
        model = load_model()
        predictions = []
        for password in passwords:
            features = extract_features(password)
            prediction = model.predict(features)[0]
            predictions.append({"password": password, "strength": str(prediction)})
        
        return jsonify({"predictions": predictions}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

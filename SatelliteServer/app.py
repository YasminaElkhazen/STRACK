from flask import Flask, request, jsonify, session
import requests
import firebase_admin
from firebase_admin import credentials, auth
from flask_cors import CORS
from users import Users

app = Flask(__name__)
CORS(app)
app.secret_key = 'shuifyzbhsby5f4q5fq41qg&54é54d'
cred = credentials.Certificate('./service.json')
firebase_admin.initialize_app(cred)
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required!'}), 400

    try:
        user = auth.create_user(email=email, password=password)
        return jsonify({'message': 'User registered successfully!', 'uid': user.uid}), 201
    except Exception as e:
        return jsonify({'message': 'Error registering user: {}'.format(str(e))}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required!'}), 400

    try:
        user = auth.get_user_by_email(email)
        response = requests.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={}",
                                 data={'email': email, 'password': password, 'returnSecureToken': True})
        response_data = response.json()

        if 'error' in response_data:
            raise Exception(response_data['error']['message'])

        return jsonify({'message': 'Login successful!', 'idToken': response_data['idToken']}), 200
    except Exception as e:
        return jsonify({'message': f'Error logging in: {str(e)}'}), 400

@app.route('/satellite_positions', methods=['GET'])
def get_satellite_positions():
    try:
        satellite_id=25544
        if request.args.get('id') is not None :
          satellite_id = request.args.get('id')

        # Constructing the URL with the extracted ID
        url = f'https://api.n2yo.com/rest/v1/satellite/positions/{satellite_id}/41.702/-76.014/0/2/&apiKey=HJ5VWP-MREQA3-Y85WQV-58FD'

        # Sending request to N2YO API
        response = requests.get(url)
        data = response.json()

        positions = data.get('positions', [])
        if positions:
            latitude = positions[0].get('satlatitude')
            longitude = positions[0].get('satlongitude')
            return jsonify({'latitude': latitude, 'longitude': longitude}), 200
        else:
            return jsonify({'error': 'No position data available'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/users', methods=['GET'])
def get_users():
    q = request.args.get("q", "").lower()
    keys = ["Column1", "Column2", "Column5"]
    def search(data):
        return [item for item in data if any(q in item[key].lower() for key in keys)]
    if q:
        results = search(Users)[:10]
    else:
        results = Users[:10]
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=1000)

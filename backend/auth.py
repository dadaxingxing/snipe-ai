from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from .extensions import mongo

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    psw = data.get('password')

    user = mongo.db.users.find_one({'email': email})

    if user and check_password_hash(user['password'], psw):
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify(access_token=access_token), 200
    return jsonify({'error': 'invalid email and or password!'}), 401

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    psw = data.get('password')

    if not email or not psw:
        return jsonify({'error': 'no email or password!'}), 400
    
    if mongo.db.users.find_one({'email': email}):
        return jsonify({'error': 'user already exists!'}), 400
    
    hash_psw = generate_password_hash(psw, method='pbkdf2:sha256')
    mongo.db.users.insert_one({
        'email': email,
        'password': hash_psw,
        'credits': 3
    })

    return jsonify({'message': 'user created successfully!'}), 201



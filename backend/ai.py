from flask import Blueprint, request, jsonify
from .ai_background.model import remove_background
import uuid
import os
from flask_jwt_extended import jwt_required, get_jwt_identity
from .decorators import credit_required
from bson import ObjectId
from .extensions import mongo

ai_bp = Blueprint('ai', __name__)

# Temp storage path (change to .env production)
UPLOAD_FOLDER = 'backend/static/uploads'
PROCESSED_FOLDER = 'backend/static/processed'

@ai_bp.route('/v1/upload_image', methods=['POST'])
@jwt_required()
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'no files'}), 400
    file = request.files['file']

    job_id = str(uuid.uuid4())
    extension = file.filename.rsplit('.', 1)[1].lower()
    unique_filename = f"{job_id}.{extension}"

    input_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    file.save(input_path)

    return jsonify({
        'message': 'successful upload!',
        'job_id': job_id,
        'temp_filename': unique_filename 
    }), 200

@ai_bp.route('/v1/process_image', methods=['POST'])
@jwt_required()
@credit_required
def process_image():
    user_id = get_jwt_identity()
    data = request.json
    filename = data.get('filename')

    if not filename:
        return jsonify({'error': 'no filename'}), 400
    
    input_path = os.path.join(UPLOAD_FOLDER, filename)

    output_filename = f"processed_{filename.rsplit('.', 1)[0]}.png"
    output_path = os.path.join(PROCESSED_FOLDER, output_filename)

    status = remove_background(input_path, output_path)
    if status:
        mongo.db.users.update_one(
            {'_id': ObjectId(user_id)},
            {'$inc': {'credits': -1}}
        )

        if os.path.exists(input_path):
            os.remove(input_path)
        
        return jsonify({
            'message': 'file process completed!',
            'processed_url': f'/static/processed/{output_filename}'
        }), 200
    
    return jsonify({'error': 'AI failed to process'}), 500
    

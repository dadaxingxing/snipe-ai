from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from .extensions import mongo
from bson import ObjectId

def credit_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = get_jwt_identity()
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})

        if user and user.get('credits', 0) > 0:
            return f(*args, **kwargs)
        else:
            return jsonify({'error': 'not enough credits!'}), 403
    return decorated_function

    
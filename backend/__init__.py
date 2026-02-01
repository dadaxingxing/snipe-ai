from flask import Flask
from flask_cors import CORS
from .extensions import jwt, mongo

def create_app(test_config=None):
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'abc'
    app.config['MONGO_URI'] = 'mongodb://localhost:27017/snipe'
    app.config['JWT_SECRET_KEY'] = 'abc'

    mongo.init_app(app)
    jwt.init_app(app)
    
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Routes for main website
    from .routes import main_bp
    app.register_blueprint(main_bp)

    # Routes for authenticating user
    from .auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')

    # Routes for AI features
    from .ai import ai_bp
    app.register_blueprint(ai_bp, url_prefix='/api')

    from .payment import payment_bp
    app.register_blueprint(payment_bp, url_prefix='/payment')

    return app


# Note to start developing server: 
# flask --app backend run --debug

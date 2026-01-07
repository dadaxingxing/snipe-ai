from flask import Blueprint, request, jsonify
from .extensions import mongo
from flask_jwt_extended import jwt_required, get_jwt_identity
import stripe

# Move to .env on production
stripe.api_key = ''

payment_bp = Blueprint('payment', __name__)

@payment_bp.route('/create_payment_session', methods=['POST'])
@jwt_required()
def check_payment():
    data = request.get_json()
    credit_amount = data.get('amount')

    if not credit_amount or credit_amount < 1:
        return jsonify({'error': 'Invalid credit amount!'}), 400
    
    price_per_credit = 100

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': f'{amount_of_credits} Snipe AI Credits',
                        },
                        'unit_amount': price_per_credit,
                    },
                    'quantity': amount_of_credits,
                },
            ],
            mode='payment',
            # client_reference_id is CRITICAL: it tells the webhook which user to credit
            client_reference_id=get_jwt_identity(),
            success_url='http://localhost:3000/dashboard?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='http://localhost:3000/pricing',
        )
        return jsonify({'url': checkout_session.url})
    except Exception as e:
        return jsonify(error=str(e)), 500
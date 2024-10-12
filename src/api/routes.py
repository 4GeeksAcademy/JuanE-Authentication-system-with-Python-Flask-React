"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

from flask_jwt_extended import jwt_required, get_jwt_identity

# Protect a route with jwt_required, which will kick out requests without a valid JWT

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    
    user = User.query.filter_by(email = email).first()
    print(User)

    if not user: 
        return jsonify({"error": "user not found"}), 404

    valid_password = current_app.bcrypt.check_password_hash(user.password, password)
    
    if email != user.email or not valid_password:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, user= user.serialize()), 200

@api.route("/signup", methods=["POST"])
def signup():
    body = request.get_json() 
    user = User.query.filter_by(email=body["email"]).first()
    if user != None:
        return jsonify({"msg": "An user was created with that email" }), 401
    
    password_hash = current_app.bcrypt.generate_password_hash(body["password"]).decode("utf-8")

    user = User(email =body["email"], password = password_hash, is_active = True)
    db.session.add(user)
    db.session.commit()
    response_body = {
        "msg": "user created",
        "user_id": user.id,
        "email": user.email,
        
    }
    return jsonify(response_body), 200
    
@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    email = get_jwt_identity()

    user = User.query.filter_by(email=email).first()
    if not user: 
        return jsonify({"error": "user not found"}), 404
    
    return jsonify({"user": user.serialize()})
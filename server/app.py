# this is the server
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import utility

app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
@cross_origin()
def get_location_names():
    response = jsonify({
        'locations': utility.get_location_names()
    })
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
@cross_origin()
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': utility.get_estimated_price(location,total_sqft,bhk,bath)
    })
    # response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/')
@cross_origin()
def hello():
        return '<h1> Flask Server is up and running :) </h1><br><br>Send get request to <home>/get_location_names to get the location names.<br><br>' \
               'Send post request to <home>/predict_home_price to get the predicted price (use postman, it is great)'

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    utility.load_saved_artifacts()
    app.run()



from flask import Flask, render_template, request
import json
from flask_cors import CORS
from pymongo import MongoClient, DESCENDING
from bson.json_util import loads, dumps

app = Flask(__name__)
CORS(app)
db_name = 'dust_sensor'
collection_name = 'logs' 
mongo_client = MongoClient()
db = mongo_client.get_database(db_name)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/getDensity', methods=['GET'])
def getDensity():
    obj = db[collection_name].find_one(sort=[( '_id', DESCENDING )])
    print(obj)
    print(type(obj))
    obj = dumps(obj)
    print(obj)
    return obj
    
    

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='8080')
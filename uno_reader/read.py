import serial
from pymongo import MongoClient
from datetime import datetime
import time

db_name = 'dust_sensor'
collection_name = 'logs' 
mongo_client = MongoClient()
db = mongo_client.get_database(db_name)
usb_port = '/dev/cu.usbserial-1410'
arduino = serial.Serial(usb_port, 9600, timeout=1)
while True:
	rawdata = str(arduino.readline())
	if('Dust Density' in rawdata):
		dust_input = rawdata.split(':')
		input_db = dust_input[1].split('\\')
		input_db = input_db[0]
		current_time = datetime.now()
		print(input_db)
		insert_date = current_time.strftime('%H:%M:%S %d/%m/%Y')
		obj = {
			"time": insert_date,
			"density": str(input_db)
		}
		print(obj)
		db[collection_name].insert_one(obj)

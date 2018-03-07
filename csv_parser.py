import csv
import json

firebase_url = 'https://cs2340project-76d43.firebaseio.com/'

# Getting user input about the file
file = input("Please input the name of the CSV to be put into the database: ")

# Validating that the file exists
try:
	f = open(file, 'r')
	if not file.endswith('.csv'):
		print("That doesn't look like a CSV!")
		exit()
except IOError:
	print("That file does not seem to exist!")

fields = ('key', 'name', 'capacity', 'restrictions', 'longitude', 'latitude', 'address', 'notes', 'phoneNum')
reader = csv.DictReader(f, fields)
out = json.dumps([row for row in reader])
print(out)
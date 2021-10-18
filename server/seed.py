import csv
import requests
import json

url = "http://127.0.0.1:3000/api/employee"
headers = {
  'Content-Type': 'application/json'
}


## format csv_file to json input
with open("seed.csv", newline='') as f:
    reader = csv.reader(f)
    data_json = []
    
    for row in reader:
      temp = dict()
      temp['first_name'] = row[0]
      temp['last_name'] = row[1]
      temp['employee_num'] = row[2]
      temp['department'] = row[3]

      payload = json.dumps({
      "first_name": input['first_name'].upper(),
      "last_name": input['last_name'].upper(),
      "employee_num": input['employee_num'],
      "department": input['department'].upper()
      })

      response = requests.request("POST", url,headers=headers, data=payload)
      print(response)



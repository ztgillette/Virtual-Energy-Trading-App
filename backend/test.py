import requests
import os
import time

data = requests.get("http://127.0.0.1:8000/realtime/2023-11-15").json()
print(data)
print(len(data))

#add some delay so the api isnt annoyed
time.sleep(5)

data1 = requests.get("http://127.0.0.1:8000/dayahead/2023-11-15").json()
print(data1)
print(len(data1))
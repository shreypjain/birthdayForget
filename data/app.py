from pymongo import MongoClient
import pandas
from datetime import datetime
import os

URL = os.getenv('DB_CREDS')

df = pandas.read_csv('birthdays.csv')
birthdays = []
for i in df.itertuples():
    month = int(i[3][0:2])
    day = int(i[3][3:5])
    year = int(i[3][6:8])
    if year > 21:
        year+=19*100
    else:
        year+=20*100
    bday = datetime.timestamp(datetime(year,month,day)) * 1000
    birthdays.append({
        'firstName':i[1],
        'lastName':i[2],
        'birthday':int(bday),
        'age':int(i[4])
    })

client = MongoClient(URL)
db = client['birthdays']
col = db['friends']
col.insert_many(birthdays)
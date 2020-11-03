import pymongo
import pandas

df = pandas.read_csv('birthdays.csv')
birthdays = []
for i in df:
    birthdays.append({
        'firstName':i[1],
        'birthday':i[2]
    })
print(birthdays)

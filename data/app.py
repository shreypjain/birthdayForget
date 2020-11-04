import pymongo
import pandas

df = pandas.read_csv('birthdays.csv')
birthdays = []
for i in df.itertuples():
    for j in str(i[2]):
        month = int(j[0:1])
        day = int(j[3:4])
        year = int(j[6:7])
        print(month,day,year)
    birthdays.append({
        'firstName':i[0],
        'lastName':i[1],
        'birthday':i[2],
        'age':i[3]
    })
print(birthdays)

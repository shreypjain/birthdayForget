import pymongo
import pandas

df = pandas.read_csv('birthdays.csv')
birthdays = []
for i in df.itertuples():
    month = i[3][0:2]
    day = i[3][3:5]
    year = i[3][6:8]
    print(f'20{year}')
    birthdays.append({
        'firstName':i[0],
        'lastName':i[1],
        'birthday':i[2],
        'age':i[3]
    })
# print(birthdays)

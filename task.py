list = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
import matplotlib as plt
import pandas as pd
x = input('Enter year without space')

def FindByMonth():
    maxTemp = 0
    minTemp = 100
    maxHumidity = 0
    for a in range(len(list)):
        path = 'weatherdata/lahore_weather_' + x + '_' + list[a] + '.txt'
        ## print ("path is",path)
        d = pd.read_table(path, sep=",")

        if d['Max TemperatureC'].max() > maxTemp:
            maxvalueindex = d.loc[d['Max TemperatureC'].argmax(), 'PKT']
            maxTemp = d['Max TemperatureC'].max()
        if d['Min TemperatureC'].min() < minTemp:
            minvalueindex= d.loc[d['Min TemperatureC'].argmin(), 'PKT']
            minTemp = d['Min TemperatureC'].min()
        if d['Max Humidity'].max() > maxHumidity:
            maxhumidityindex = d.loc[d['Max Humidity'].argmax(), 'PKT']
            maxHumidity = d['Max Humidity'].max()

    print ("Highest %dC on %s"%(maxTemp,maxvalueindex))
    print ("Lowest %dC on %s"%(minTemp,minvalueindex))
    print ("Humid %d on %s"%(maxHumidity,maxhumidityindex))

def FindByYear():
    maxTemp = 0
    minTemp = 100
    maxHumidity = 0
    countMaxTemp = 0
    countMinTemp = 0
    countMaxHum = 0
    sum1 = 0
    sum2 = 0
    sum3 = 0

    y = input('Enter month without space')
    #t = range(1996,2012)
    for a in range(1996,2012):
        path = 'weatherdata/lahore_weather_' + str(a) + '_' + y + '.txt'
        ## print ("path is",path)
        d = pd.read_table(path, sep=",")
        if d['Max TemperatureC'].max() > maxTemp:
            maxTemp = d['Max TemperatureC'].max()
            countMaxTemp =countMaxTemp + 1
            sum1 += maxTemp

        if d['Min TemperatureC'].min() < minTemp:
            minTemp = d['Min TemperatureC'].min()
            countMinTemp = countMinTemp + 1
            sum2 += minTemp

        if d['Max Humidity'].max() > maxHumidity:
            maxHumidity = d['Max Humidity'].max()
            countMaxHum = countMaxHum + 1
            sum3 +=maxHumidity
    print("Highest Average",sum1 / countMaxTemp)
    print("Lowest Average",sum2/ countMinTemp)
    print("Average Humidity",sum3/countMaxHum)



FindByYear()


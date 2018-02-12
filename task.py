import matplotlib as plt
import pandas as pd
import os.path
from termcolor import colored

month_list = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


def find_by_month():
    x = input('Enter year without space ')
    max_temp = 0
    min_temp = 100
    max_humidity = 0
    for a in range(len(month_list)):
        path = 'weatherdata/lahore_weather_' + x + '_' + month_list[a] + '.txt'
        checkflag = os.path.exists(path)
        if checkflag:
            d = pd.read_table(path, sep=",")
            if d['Max TemperatureC'].max() > max_temp:
                max_value_index = d.loc[d['Max TemperatureC'].idxmax(), 'PKT']
                max_temp = d['Max TemperatureC'].max()
            if d['Min TemperatureC'].min() < min_temp:
                min_value_index = d.loc[d['Min TemperatureC'].idxmin(), 'PKT']
                min_temp = d['Min TemperatureC'].min()
            if d['Max Humidity'].max() > max_humidity:
                max_humidity_index = d.loc[d['Max Humidity'].idxmax(), 'PKT']
                max_humidity = d['Max Humidity'].max()

    print("Highest %dC on %s" % (max_temp, max_value_index))
    print("Lowest %dC on %s" % (min_temp, min_value_index))
    print("Humid %d on %s" % (max_humidity, max_humidity_index))


def find_by_year():
    max_temp = 0
    min_temp = 100
    max_humidity = 0
    count_max_temp = 0
    count_min_temp = 0
    count_max_hum = 0
    sum1 = 0
    sum2 = 0
    sum3 = 0

    y = input('Enter month without space ')
    for a in range(1996, 2012):
        path = 'weatherdata/lahore_weather_' + str(a) + '_' + y + '.txt'
        checkflag = os.path.exists(path)
        if checkflag:
            d = pd.read_table(path, sep=",")
            if d['Max TemperatureC'].max() > max_temp:
                max_temp = d['Max TemperatureC'].max()
                count_max_temp = count_max_temp + 1
                sum1 += max_temp

            if d['Min TemperatureC'].min() < min_temp:
                min_temp = d['Min TemperatureC'].min()
                count_min_temp = count_min_temp + 1
                sum2 += min_temp

            if d['Max Humidity'].max() > max_humidity:
                max_humidity = d['Max Humidity'].max()
                count_max_hum = count_max_hum + 1
                sum3 += max_humidity
    print("Highest Average", sum1 / count_max_temp)
    print("Lowest Average", sum2 / count_min_temp)
    print("Average Humidity", sum3 / count_max_hum)


def one_month_data():
    y = input('Enter month without space')
    x = input('Enter year without space')
    path = 'weatherdata/lahore_weather_' + x + '_' + y + '.txt'
    checkflag = os.path.exists(path)
    if checkflag:
        d = pd.read_table(path, sep=",")
        for i in range(d.shape[0]):
            max_temp = int(round(d['Max TemperatureC'][i]))
            min_temp = int(round(d['Min TemperatureC'][i]))

            print("%d" % i, end="", flush=True)
            for j in range(max_temp):
                print(colored('+', 'red'), end="", flush=True)
            print("%1.0f" % d['Max TemperatureC'][i])

            print("%d" % i, end="", flush=True)
            for k in range(min_temp):
                print(colored('+', 'blue'), end="", flush=True)
            print("%1.0f" % d['Min TemperatureC'][i])


def one_month_data_single_line_print():
    y = input('Enter month without space ')
    x = input('Enter year without space ')
    path = 'weatherdata/lahore_weather_' + x + '_' + y + '.txt'
    checkflag = os.path.exists(path)
    if checkflag:
        d = pd.read_table(path, sep=",")
        for i in range(d.shape[0]):
            max_temp = int(round(d['Max TemperatureC'][i]))
            min_temp = int(round(d['Min TemperatureC'][i]))

            print("%d" % i, end="", flush=True)
            for k in range(min_temp):
                print(colored('+', 'blue'), end="", flush=True)
            for j in range(max_temp):
                print(colored('+', 'red'), end="", flush=True)
            print("%1.0f-%1.0f" % (d['Min TemperatureC'][i], d['Max TemperatureC'][i]))

#find_by_month()
#find_by_year()
#one_month_data()
#one_month_data_single_line_print()
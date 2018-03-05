import pandas as pd
import os.path
from termcolor import colored

month_list = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
              'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


def find_by_month():
    input_year = input('Enter year without space ')
    max_temp = 0
    min_temp = 100
    max_humidity = 0
    for month in range(len(month_list)):
        path = 'weatherdata/lahore_weather_' + x + '_' + month_list[month] + '.txt'
        file_exist = os.path.exists(path)
        if file_exist:
            table_data = pd.read_table(path, sep=",")

            if table_data['Max TemperatureC'].max() > max_temp:
                max_value_index = table_data.loc[table_data['Max TemperatureC'].idxmax(), 'PKT']
                max_temp = table_data['Max TemperatureC'].max()

            if table_data['Min TemperatureC'].min() < min_temp:
                min_value_index = table_data.loc[table_data['Min TemperatureC'].idxmin(), 'PKT']
                min_temp = table_data['Min TemperatureC'].min()

            if table_data['Max Humidity'].max() > max_humidity:
                max_humidity_index = table_data.loc[table_data['Max Humidity'].idxmax(), 'PKT']
                max_humidity = table_data['Max Humidity'].max()

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
    max_temp_sum = 0
    min_temp_sum = 0
    max_humidity_sum = 0

    input_year = input('Enter month without space ')
    for year in range(1996, 2012):
        path = 'weatherdata/lahore_weather_' + str(year) + '_' + input_year + '.txt'
        checkflag = os.path.exists(path)
        if checkflag:
            d = pd.read_table(path, sep=",")
            if table_data['Max TemperatureC'].max() > max_temp:
                max_temp = table_data['Max TemperatureC'].max()
                count_max_temp = count_max_temp + 1
                sum1 += max_temp

            if table_data['Min TemperatureC'].min() < min_temp:
                min_temp = table_data['Min TemperatureC'].min()
                count_min_temp = count_min_temp + 1
                sum2 += min_temp

            if table_data['Max Humidity'].max() > max_humidity:
                max_humidity = table_data['Max Humidity'].max()
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
            max_temp = int(round(table_data['Max TemperatureC'][i]))
            min_temp = int(round(table_data['Min TemperatureC'][i]))

            print("%d" % i, end="", flush=True)
            for j in range(max_temp):
                print(colored('+', 'red'), end="", flush=True)
            print("%1.0f" % table_data['Max TemperatureC'][i])

            print("%d" % i, end="", flush=True)
            for k in range(min_temp):
                print(colored('+', 'blue'), end="", flush=True)
            print("%1.0f" % table_data['Min TemperatureC'][i])


def one_month_data_single_line_print():
    y = input('Enter month without space ')
    x = input('Enter year without space ')
    path = 'weatherdata/lahore_weather_' + x + '_' + y + '.txt'
    checkflag = os.path.exists(path)
    if checkflag:
        d = pd.read_table(path, sep=",")
        for i in range(d.shape[0]):
            max_temp = int(round(table_data['Max TemperatureC'][i]))
            min_temp = int(round(table_data['Min TemperatureC'][i]))

            print("%d" % i, end="", flush=True)
            for k in range(min_temp):
                print(colored('+', 'blue'), end="", flush=True)
            for j in range(max_temp):
                print(colored('+', 'red'), end="", flush=True)
            print("%1.0f-%1.0f" %
                  (table_data['Min TemperatureC'][i], table_data['Max TemperatureC'][i]))


# select your function here
find_by_month()
# find_by_year()
# one_month_data()
# one_month_data_single_line_print()


input_data = input(
    'Select input function:' + '\n1. Find by Month' + '\n2. Find by year' + '\n3. One Month Data'
    + '\n4. One Month Data single Line ' + '\n')
obj = WeatherData()
obj.user_input(input_data)

if input_data == "1":
    obj.find_by_month()
elif input_data == "2":
    obj.find_by_year()
elif input_data == "3":
    obj.one_month_data()
elif input_data == "4":
    obj.one_month_data_single_line_print()

import pandas as pd
import os.path
from termcolor import colored
import argparse

month_list = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
              'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


class WeatherData:
    max_temp = 0
    min_temp = 100
    max_humidity = 0
    count_max_temp = 0
    count_min_temp = 0
    count_max_hum = 0
    sum_max_temp = 0
    sum_min_temp = 0
    sum_max_humidity = 0
    max_value_index = 0
    min_value_index = 0
    max_humidity_index = 0
    input_month = ""
    input_year = ""
    year_min_range = 0
    year_max_range = 0

    def user_input(self, function_id):
        if function_id == '1':
            self.input_year = input('Enter year ')
        elif function_id == '2':
            self.input_month = input('Enter month ')
        else:
            self.input_year = input('Enter year ')
            self.input_month = input('Enter month ')

    def read_files(self, input_year, input_month):
        # for finding min and max year from files
        self.year_min_range = os.listdir('weatherdata')[0][15:19]
        self.year_max_range = os.listdir('weatherdata')[-1][15:19]

        path = 'weatherdata/lahore_weather_{input_year}_{input_month}.txt'.format(
            input_year=input_year,
            input_month=input_month
        )
        file_exist = os.path.exists(path)
        if file_exist:
            table_data = pd.read_table(path, sep=",")
            return file_exist, table_data
        else:
            table_data = 0
            return file_exist, table_data

    def find_by_year(self, year):
        for month in range(len(month_list)):
            file_exist, table_data = self.read_files(year, month_list[month])

            if file_exist:
                if table_data['Max TemperatureC'].max() > self.max_temp:
                    self.max_value_index = table_data.loc[table_data['Max TemperatureC'].idxmax(), 'PKT']
                    self.max_temp = table_data['Max TemperatureC'].max()

                if table_data['Min TemperatureC'].min() < self.min_temp:
                    self.min_value_index = table_data.loc[table_data['Min TemperatureC'].idxmin(), 'PKT']
                    self.min_temp = table_data['Min TemperatureC'].min()

                if table_data['Max Humidity'].max() > self.max_humidity:
                    self.max_humidity_index = table_data.loc[table_data['Max Humidity'].idxmax(), 'PKT']
                    self.max_humidity = table_data['Max Humidity'].max()

        print("Highest %dC on %s" % (self.max_temp, self.max_value_index))
        print("Lowest %dC on %s" % (self.min_temp, self.min_value_index))
        print("Humid %d on %s" % (self.max_humidity, self.max_humidity_index))

    def find_by_month(self, month):
        print("month ", month)
        for year in range(1996, 2011):
            file_exist, table_data = self.read_files(str(year), month)

            if file_exist:
                if table_data['Max TemperatureC'].max() > self.max_temp:
                    max_temp = table_data['Max TemperatureC'].max()
                    self.count_max_temp = self.count_max_temp + 1
                    self.sum_max_temp += max_temp

                if table_data['Min TemperatureC'].min() < self.min_temp:
                    min_temp = table_data['Min TemperatureC'].min()
                    self.count_min_temp = self.count_min_temp + 1
                    self.sum_min_temp += min_temp

                if table_data['Max Humidity'].max() > self.max_humidity:
                    max_humidity = table_data['Max Humidity'].max()
                    self.count_max_hum = self.count_max_hum + 1
                    self.sum_max_humidity += max_humidity

        print("Highest Average", self.sum_min_temp / self.count_max_temp)
        print("Lowest Average", self.sum_min_temp / self.count_min_temp)
        print("Average Humidity", self.sum_max_humidity / self.count_max_hum)

    def one_month_data(self, year, month):
        file_exist, table_data = self.read_files(year, month)

        if file_exist:
            # for finding total rows in one file  using shape[0]
            for row in range(table_data.shape[0]):
                max_temp = int(round(table_data['Max TemperatureC'][row]))
                min_temp = int(round(table_data['Min TemperatureC'][row]))
                print("%d" % row, end="", flush=True)

                for red in range(max_temp):
                    print(colored('+', 'red'), end="", flush=True)
                print("%1.0f" % table_data['Max TemperatureC'][row])

                print("%d" % row, end="", flush=True)

                for blue in range(min_temp):
                    print(colored('+', 'blue'), end="", flush=True)
                print("%1.0f" % table_data['Min TemperatureC'][row])

    def one_month_data_single_line_print(self, year, month):
        file_exist, table_data = self.read_files(year, month)

        if file_exist:
            for row in range(table_data.shape[0]):
                max_temp = int(round(table_data['Max TemperatureC'][row]))
                min_temp = int(round(table_data['Min TemperatureC'][row]))

                print("%d" % row, end="", flush=True)
                for blue in range(min_temp):
                    print(colored('+', 'blue'), end="", flush=True)
                for red in range(max_temp):
                    print(colored('+', 'red'), end="", flush=True)
                print("%1.0f-%1.0f" %
                      (table_data['Min TemperatureC'][row], table_data['Max TemperatureC'][row]))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-m', '--month', help='Find temperature values by month')
    parser.add_argument('-y', '--year', help='Find temperature by year')
    parser.add_argument('-c', '--one_month', help="get one month data")
    parser.add_argument('-b', '--detail_charts', help="get one month charts in one line")

    args = parser.parse_args()
    print(args)
    obj = WeatherData()

    if args.month:
        month = args.month
        obj.find_by_month(month)

    elif args.year:
        year = args.year
        print("year is", year)
        obj.find_by_year(year)

    elif args.one_month:
        year, month = args.one_month.split(' ')
        obj.one_month_data(year, month)

    elif args.detail_charts:
        year, month = args.detail_charts.split(' ')
        obj.one_month_data_single_line_print(year, month)


if __name__ == "__main__":
    main()

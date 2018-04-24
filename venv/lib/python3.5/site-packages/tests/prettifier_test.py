import unittest

from prettifier.number_prettifier import prettify

class TestPrettify(unittest.TestCase):

  def test_not_numerics_input(self):
    number = "number"
    with self.assertRaises(ValueError):
        prettify(number)

  def test_number_with_3_digits(self):
    number = 532
    self.assertEqual(str(number), prettify(number))

  def test_number_with_6_digits(self):
    number = 149532
    self.assertEqual(str(number), prettify(number))
  
  def test_million_number(self):
    number = 1000000
    self.assertEqual("1M", prettify(number))

  def test_decimal_million_number(self):
    number = 2500000.34
    self.assertEqual("2.5M", prettify(number))

  def test_billion_number(self):
    number = 120000000000
    self.assertEqual("120B", prettify(number))

  def test_decimal_billion_number(self):
    number = 1123456789
    self.assertEqual("1.1B", prettify(number))

  def test_trillion_number(self):
    number = 1000000000000
    self.assertEqual("1T", prettify(number))

  def test_decimal_trillion_number(self):
    number = 2501123456789
    self.assertEqual("2.5T", prettify(number))

  def test_million_number_neg(self):
    number = -1000000
    self.assertEqual("-1M", prettify(number))

  def test_thousand_number_neg(self):
    number = -1000
    self.assertEqual(str(number), prettify(number))

  def test_number_bigger_than_1_trillion(self):
    number = 1234201123456789
    self.assertEqual("1234.2T", prettify(number))


if __name__ == '__main__':
    unittest.main()    

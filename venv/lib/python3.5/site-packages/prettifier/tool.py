r"""Command-line tool to prettify big number as millions, billions and trillions

Usage::

    $ python -m prettifier.tool 12345
    12345

    $ python -m prettifier.tool 1234567899
    1.2B

    $ python -m prettifier.tool number
    The type is not a numeric value

"""

from number_prettifier import prettify

def main():
    import sys
    import ast

    if len(sys.argv) != 2:
        print 'usage : python run_prettify.py <number> \nYou must specify the number to be prettified'
        sys.exit(1)

    try:
        #Usage of ast is the safe 'eval' for string to numbers
        print prettify(ast.literal_eval(sys.argv[1]))
    except Exception, e:
        print 'The type is not a numeric value'
        sys.exit(1)


if __name__ == '__main__':
    main()
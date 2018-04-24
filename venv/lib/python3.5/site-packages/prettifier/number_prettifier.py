_SHORT_SCALE = 1000
_MILLION = 1000000 #first scale
# Dictionary for scale labels where 1 = Million, 2 = Billions and 3 = Trillions
_SCALE_LABELS = {1: 'M', 2: 'B', 3: 'T'}   

def prettify(number):
    return _prettify(number, _MILLION, 1)

def _prettify(number, scale, scale_key):
    if isinstance(number, (int, float)):
        if not(_is_number_prettifiable(number)):
            return str(number)

        #Makes the division and gets the remainder
        quotient, remainder = divmod(number,scale)

        if _should_get_next_short_scale(quotient, scale_key):
            # Call tha function again
            return _prettify(number, scale * _SHORT_SCALE, scale_key + 1)
        
        # Check if truncated number is not an integer
        if _has_number_decimal_part(remainder):
            return "%d.%d%s" % (quotient, _get_first_integer_remainder(remainder, scale), _SCALE_LABELS[scale_key])
        else:
            return "%d%s" % (quotient, _SCALE_LABELS[scale_key])
    else:
        raise ValueError('The type is not a numeric value') 

def _is_number_prettifiable(number):
    # Check if the number greater than 6 digits
    return abs(number) >= _MILLION

def _should_get_next_short_scale(quotient, scale_key):
    #if the quotient is bigger than 0 and bigger than short scale, it will try the next scale and go on 
    #until reach the trillion scale
    return quotient > 0 and quotient >= _SHORT_SCALE and (scale_key + 1) in _SCALE_LABELS.keys()

def _has_number_decimal_part(remainder):
    return remainder != 0

def _get_first_integer_remainder(remainder, scale):
    # use remainder/(scale/10) to get the first integer of remaider
    return remainder/(scale/10)


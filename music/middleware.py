from datetime import datetime


class UserTimestampLog(object):

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        with open('userlog.txt', 'a') as f:
            f.write('User: %s | Time: %s\n' % (
                request.user, datetime.now()
            ))
        response = self.get_response(request)
        return response

class StackOverflowMiddleware(object):
    def process_exception(self, request, exception):
        print (exception.__class__.__name__)
        print (exception.message)
        return None
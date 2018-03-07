class SongsList(object):


    def __init__(self, get_response):
        self.get_response = self.get_response
    
    def __call__(self, request):
        file = open(“song_file.txt”,”w”)
        file.write('Album Title %s,|| Song Title %s\n'% (request.album.album_title, request.song.song_title))
        response =self.get_response(request)
        return response


from django import forms
from django.contrib.auth.models import User

from .models  import Book, Student


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
    

class User(forms.MdoelForm):
    class Meta:
        model = Student
    

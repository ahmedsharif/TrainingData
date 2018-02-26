from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Book(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True)
    genre = models.CharField(max_length=250)
    author = models.CharField(max_length=255)
    pages = models.CharField(max_length=250)
    is_liked = models.BooleanField(default=False)

    def __str__(self):
        return self.title + ' - ' + self.genre


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birthdate= models.DateField(null=True,blank=True)
    location = models.TextField(max_length=500)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()


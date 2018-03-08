from django.db.models.signals import post_save, pre_save, post_delete
from django.dispatch import receiver
from django.utils import timezone

from .models import Album

@receiver(post_save, sender=Album)

def create_album_signal(sender,instance,created, **kwargs):
    if created:
        # instance.objects.create()
        #print ("instance has been created successfully")
        print ("%s is album id | %s is artist name | %s is album insertion time"
        %(instance.id,instance.artist,timezone.now()))
    # instance.log += 'Task: %s | user: %s | Time:%s \n'%(
    #     instance.id, instance.artist, timezone.now()
    # )

@receiver(post_delete, sender=Album)

def delete_album_signal(sender,instance, *args, **kwargs):
    if instance:
        print ("%s is album id | %s is artist name | %s is album insertion time is deleted"
        %(instance.id,instance.artist,timezone.now()))


from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.utils import timezone

from website.models import Album

@receiver(post_save, sender=Album)

def album_list(sender,instance,**kwargs):
    print ("hello ahmed%s",instance.album_title)
    # instance.log += 'Task: %s | user: %s | Time:%s \n'%(
    #     instance.id, instance.artist, timezone.now()
    # )

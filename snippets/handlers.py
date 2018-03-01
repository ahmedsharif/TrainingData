from django.dispatch import receiver

from .views import SnippetList
from .signals import fire_signal


@receiver(fire_signal)
def print_something(sender, **kwargs):
    print()
    print()
    print(kwargs['shot'])
    print()
    print()


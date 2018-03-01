import django.dispatch

fire_signal = django.dispatch.Signal(providing_args=["shot"])
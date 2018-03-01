from django.apps import AppConfig


class SnippetsConfig(AppConfig):
    name = 'snippets'
    
    def ready(self):
        import snippets.signals
        import snippets.handlers

from django.db import models
from django.contrib.auth.models import User

class Score(models.Model):
    player = models.CharField(max_length = 100)
    result = models.CharField(max_length = 100)
    time = models.DateTimeField(auto_now_add = True)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'scores', null=True, blank=True)

    def __str__(self):
        return f"{self.player} - {self.result} - ({self.time})"
from django.db import models

class Score(models.Model):
    player = models.CharField(max_length = 100)
    result = models.CharField(max_length = 100)
    score = models.IntegerField()
    time = models.DateTimeField(auto_now_add = True)
    

    def __str__(self):
        return f"{self.player} - {self.result} - {self.score} - ({self.time})"
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    
    pass

class Image(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='images/')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    liked_by = models.ManyToManyField(CustomUser, related_name='liked_videos', blank=True)
    disliked_by = models.ManyToManyField(CustomUser, related_name='disliked_videos', blank=True)
    

    def __str__(self):
        return self.title
    
    @property
    def likes(self):
        return self.liked_by.count()

    @property
    def dislikes(self):
        return self.disliked_by.count()
    
class ImageReaction(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)
    liked = models.BooleanField()  

    class Meta:
        unique_together = ('user', 'image')

class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    bio = models.TextField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.user.username
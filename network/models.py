from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class User(AbstractUser):
    pass

class Post(models.Model):
    # A single user-created post shown in the feed and profile pages.
    post = models.TextField()
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posted_by"
    )

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.post
    
class Follow(models.Model):
    # One row means "follower" follows "followed".
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.follower.username} follows {self.followed.username}"

class Like(models.Model):
    liked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="liked_by")
    liked_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="liked_post")
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["liked_by", "liked_post"], name="unique_like")
        ]

    def __str__(self):
        return f'{self.liked_by} likes "{self.liked_post}" by {self.liked_post.created_by}'

    


    

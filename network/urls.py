
from django.urls import path

from . import views

urlpatterns = [
    # Main feed, authentication, posting, profile, follow, and edit routes.
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create", views.create_post, name="create"),
    path("profile/<str:username>", views.profile_page, name="profile"),
    path("follow/<str:username>", views.follow, name="follow"),
    path("following", views.following_page, name="following"),
    path("edit/<int:post_id>", views.edit_post, name="edit")
]

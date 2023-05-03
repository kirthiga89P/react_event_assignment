from django.db import models
# Create your models here.
from django.contrib.auth.models import AbstractUser,User


class user(AbstractUser):
    field = User._meta.get_field('email')
    field.max_length = 254
    User._meta.get_field('email')._unique = True
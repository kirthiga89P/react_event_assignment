# Generated by Django 4.1.4 on 2023-05-03 11:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0003_rename_user_eventuser_user_event'),
    ]

    operations = [
        migrations.RenameField(
            model_name='eventuser',
            old_name='user_event',
            new_name='user',
        ),
    ]

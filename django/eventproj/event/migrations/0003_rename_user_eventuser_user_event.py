# Generated by Django 4.1.4 on 2023-05-03 11:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_eventdetails_location'),
    ]

    operations = [
        migrations.RenameField(
            model_name='eventuser',
            old_name='user',
            new_name='user_event',
        ),
    ]

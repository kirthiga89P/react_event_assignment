# Generated by Django 4.1.4 on 2023-05-02 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventdetails',
            name='location',
            field=models.CharField(default=343, max_length=500),
            preserve_default=False,
        ),
    ]
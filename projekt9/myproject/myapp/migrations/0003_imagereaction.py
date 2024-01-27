# Generated by Django 4.2.6 on 2024-01-02 21:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageReaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liked', models.BooleanField()),
                ('image', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.image')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'image')},
            },
        ),
    ]
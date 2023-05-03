from rest_framework import serializers
from .models import user
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model=user
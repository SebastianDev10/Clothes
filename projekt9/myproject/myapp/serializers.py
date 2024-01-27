from rest_framework import serializers
from .models import CustomUser, Image, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class ImageSerializer(serializers.ModelSerializer):

    likes = serializers.ReadOnlyField()
    dislikes = serializers.ReadOnlyField()
    class Meta:
        model = Image
        fields = ['id', 'title', 'description', 'image', 'user', 'likes', 'dislikes']
        read_only_fields = ['user']  

    def create(self, validated_data):
        return Image.objects.create(**validated_data)
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('first_name', 'last_name', 'bio', 'address', 'avatar', 'phone_number')
    

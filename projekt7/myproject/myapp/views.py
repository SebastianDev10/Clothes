from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializer

class CreateUserView(generics.CreateAPIView):
    model = CustomUser
    serializer_class = UserSerializer

from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            return Response(UserSerializer(user).data)
        return Response({'error': 'Niepoprawne dane logowania'}, status=status.HTTP_400_BAD_REQUEST)
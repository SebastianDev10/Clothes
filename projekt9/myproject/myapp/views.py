from rest_framework import generics, viewsets, permissions, status
from .models import CustomUser, Image, UserProfile
from .serializers import UserSerializer, ImageSerializer, UserProfileSerializer
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser    
from django.http import HttpResponseNotFound

class CreateUserView(generics.CreateAPIView):
    model = CustomUser
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        if CustomUser.objects.filter(username=username).exists():
            return Response({'error': 'Użytkownik o tej nazwie już istnieje'}, status=status.HTTP_400_BAD_REQUEST)
        return super(CreateUserView, self).post(request, *args, **kwargs)
    

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            return Response(UserSerializer(user).data)
        return Response({'error': 'Niepoprawne dane logowania'}, status=status.HTTP_400_BAD_REQUEST)
    
class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all().order_by('id')
    serializer_class = ImageSerializer
    permission_classes = [permissions.IsAuthenticated] 

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    
def handle_image_reaction(image_id, user, like):
    
    try:
        image = Image.objects.get(id=image_id)
        if like:
            if user in image.disliked_by.all():
                image.disliked_by.remove(user)
            image.liked_by.add(user)
        else:
            if user in image.liked_by.all():
                image.liked_by.remove(user)
            image.disliked_by.add(user)
        image.save()
        return Response({'likes': image.likes, 'dislikes': image.dislikes}, status=status.HTTP_200_OK)
    except Image.DoesNotExist:
        return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_image(request, image_id):
    return handle_image_reaction(image_id, request.user, like=True)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dislike_image(request, image_id):
    return handle_image_reaction(image_id, request.user, like=False)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def user_profile(request):
    if request.method == 'GET':
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def page_not_found(request, path):
    return HttpResponseNotFound('Strona o podanym adresie nie istnieje')


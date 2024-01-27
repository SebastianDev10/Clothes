from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import CreateUserView, LoginView, ImageViewSet, like_image, dislike_image, user_profile, page_not_found
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions


schema_view = get_schema_view(
   openapi.Info(
      title="Dokumentacja Swagger",
      default_version='v1',
      description="Dokumentacja API dla projektu ZTPAI",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


router = DefaultRouter()
router.register(r'home', ImageViewSet)

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
    path('api/like/<int:image_id>/', like_image, name='like_image'),  # Dodaj tę linię
    path('api/dislike/<int:image_id>/', dislike_image, name='dislike_image'),
    path('UserProfile/', user_profile, name='user_profile'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    #re_path(r'^(?P<path>.*)$', page_not_found),
]

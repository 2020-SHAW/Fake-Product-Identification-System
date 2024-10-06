from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, QRCodeViewSet, TransactionHistoryViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'qrcodes', QRCodeViewSet)
router.register(r'transactions', TransactionHistoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


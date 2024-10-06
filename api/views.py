from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product, QRCode, TransactionHistory
from .serializers import ProductSerializer, QRCodeSerializer, TransactionHistorySerializer
import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
import json


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=True, methods=['post'])
    def generate_qr(self, request, pk=None):
        product = self.get_object()

        # Generate QR code
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr_data = {
            'product_id': str(product.id),
            'name': product.name,
            'manufacturer': product.manufacturer,
            'batch_number': product.batch_number
        }
        qr.add_data(json.dumps(qr_data))
        qr.make(fit=True)
        qr_image = qr.make_image(fill_color="black", back_color="white")

        # Save QR code image
        buffer = BytesIO()
        qr_image.save(buffer, format='PNG')

        # Create QR code record
        qr_code = QRCode(product=product)
        qr_code.qr_image.save(f'qr_{product.id}.png', ContentFile(buffer.getvalue()))
        qr_code.save()

        return Response(QRCodeSerializer(qr_code).data)


class QRCodeViewSet(viewsets.ModelViewSet):
    queryset = QRCode.objects.all()
    serializer_class = QRCodeSerializer

    @action(detail=True, methods=['post'])
    def validate(self, request, pk=None):
        qr_code = self.get_object()

        # Placeholder for blockchain validation
        validation_result = True

        # Create transaction history
        transaction = TransactionHistory.objects.create(
            qr_code=qr_code,
            scan_location=request.data.get('location'),
            status='valid' if validation_result else 'invalid',
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT')
        )

        return Response({
            'is_valid': validation_result,
            'transaction_id': str(transaction.id)
        })


class TransactionHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TransactionHistory.objects.all()
    serializer_class = TransactionHistorySerializer

from rest_framework import serializers
from .models import Product, QRCode, TransactionHistory

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class QRCodeSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = QRCode
        fields = ['id', 'product', 'product_details', 'qr_image', 'created_at']

class TransactionHistorySerializer(serializers.ModelSerializer):
    product_details = serializers.SerializerMethodField()

    class Meta:
        model = TransactionHistory
        fields = ['id', 'qr_code', 'product_details', 'scan_location',
                 'scan_timestamp', 'status', 'ip_address', 'user_agent']

    def get_product_details(self, obj):
        return {
            'name': obj.qr_code.product.name,
            'manufacturer': obj.qr_code.product.manufacturer,
            'batch_number': obj.qr_code.product.batch_number
        }

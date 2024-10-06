from django.db import models
import uuid


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    manufacturer = models.CharField(max_length=255)
    manufacturing_date = models.DateField()
    expiry_date = models.DateField()
    batch_number = models.CharField(max_length=50)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.batch_number}"


class QRCode(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='qrcodes')
    qr_image = models.ImageField(upload_to='qrcodes/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"QR Code for {self.product.name}"


class TransactionHistory(models.Model):
    SCAN_STATUS_CHOICES = [
        ('valid', 'Valid'),
        ('invalid', 'Invalid'),
        ('suspicious', 'Suspicious'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    qr_code = models.ForeignKey(QRCode, on_delete=models.CASCADE, related_name='transactions')
    scan_location = models.CharField(max_length=255, null=True, blank=True)
    scan_timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=SCAN_STATUS_CHOICES)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Scan of {self.qr_code.product.name} at {self.scan_timestamp}"

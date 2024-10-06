from django.db import models

class Product(models.Model):
    product_name = models.CharField(max_length=255)
    manufacturer = models.CharField(max_length=255, blank=True)  # Optional field
    description = models.TextField()

    def __str__(self):
        return self.product_name

class QRCode(models.Model):
    qr_code_data = models.CharField(max_length=255)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.qr_code_data

class TransactionHistory(models.Model):
    qr_code = models.ForeignKey(QRCode, on_delete=models.CASCADE)
    scan_result = models.CharField(max_length=50)
    scanned_at = models.DateTimeField(auto_now_add=True)  # Automatically sets timestamp on scan
    created_at = models.DateTimeField(auto_now_add=True)  # Added for creation time

    def __str__(self):
        return f"Scan result for QRCode {self.qr_code}: {self.scan_result}"

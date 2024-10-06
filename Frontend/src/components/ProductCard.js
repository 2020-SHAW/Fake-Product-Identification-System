import React from 'react';
import './App.css';

// ProductCard Component
const ProductCard = ({ productName, manufacturer, verificationStatus, isGenuine }) => {
  return (
    <div className={`product-card ${isGenuine ? 'genuine' : 'fake'}`}>
      /* Header Section: Product Authenticity */
      <div className="product-card-header">
        <h2 className="status-message">
          {isGenuine ? 'This product is genuine.' : 'Warning! This product is fake.'}
        </h2>
        <div className={`status-icon ${isGenuine ? 'checkmark' : 'cross'}`}>
          {isGenuine ? '✔️' : '❌'}
        </div>
      </div>

      /* Product Information */
      <div className="product-info">
        <div className="product-detail">
          <strong>Product Name:</strong> {productName}
        </div>
        <div className="product-detail">
          <strong>Manufacturer:</strong> {manufacturer}
        </div>
        <div className="product-detail">
          <strong>Blockchain Verification:</strong> {verificationStatus}
        </div>
      </div>

      /* Rescan Button */
      <div className="rescan-button-container">
        <button className="rescan-button" onClick={() => window.location.href = '/scanner'}>
          Scan Another Product
        </button>
      </div>
    </div>
  );
};

// Default Props in case data is missing
ProductCard.defaultProps = {
  productName: 'Unknown Product',
  manufacturer: 'Unknown Manufacturer',
  verificationStatus: 'Not Verified',
  isGenuine: false,
};

export default ProductCard;

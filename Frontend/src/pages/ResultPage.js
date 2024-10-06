import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './App.css';

const ResultPage = () => {
  const location = useLocation();
  const history = useHistory();

  // Extract product details from the passed state
  const { productName, manufacturer, verificationStatus, isGenuine } = location.state || {};

  // Handle missing data (in case user visits directly without state)
  if (!location.state) {
    return <p>No product data available. Please scan a QR code first.</p>;
  }

  // Handler to go back to scanning page
  const handleRescan = () => {
    history.push('/scanner');
  };

  return (
    <div className="result-page-container">
      <h1>Product Verification Result</h1>

      /* Verification details */
      <div className={`result-card ${isGenuine ? 'genuine' : 'fake'}`}>
        <h2>{productName}</h2>
        <p>Manufacturer: {manufacturer}</p>
        <p>Status: {verificationStatus}</p>
        <p className={isGenuine ? 'genuine' : 'fake'}>
          {isGenuine ? 'This product is genuine.' : 'Warning: This product is fake!'}
        </p>
      </div>

      /* Button to rescan */
      <button className="rescan-button" onClick={handleRescan}>
        Scan Another Product
      </button>
    </div>
  );
};

export default ResultPage;

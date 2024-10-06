import React from 'react';
import Scanner from '../components/Scanner';
import './App.css';

const ScannerPage = () => {
  return (
    <div className="scanner-page-container">
      <h1>Scan Product QR Code</h1>
      <p>Position the QR code within the scanner frame to verify product authenticity.</p>

      /* Scanner Component */
      <div className="scanner-wrapper">
        <Scanner />
      </div>
    </div>
  );
};

export default ScannerPage;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';
import './Scanner.css';

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  // Handle QR code scanning success
  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);

      // Send the scanned QR data to the backend for verification
      try {
        const response = await axios.post('/api/verify-product', { qrData: data });
        
        if (response.data.success) {
          // Redirect to the result page with product verification data
          history.push({
            pathname: '/result',
            state: { 
              productName: response.data.productName,
              manufacturer: response.data.manufacturer,
              verificationStatus: response.data.verificationStatus,
              isGenuine: response.data.isGenuine 
            }
          });
        } else {
          // Handle error or unsuccessful verification
          setErrorMessage('Failed to verify product. Please try again.');
        }
      } catch (error) {
        console.error('Error verifying product:', error);
        setErrorMessage('An error occurred while verifying the product.');
      }
    }
  };

  // Handle QR code scanning error
  const handleError = (error) => {
    console.error('QR code scan error:', error);
    setErrorMessage('Error scanning the QR code. Please try again.');
  };

  return (
    <div className="scanner-container">
      <h1>Scan QR Code</h1>

      /* QR Reader */
      <div className="qr-reader">
        <QrReader
          onResult={(result, error) => {
            if (result) {
              handleScan(result?.text);
            }

            if (error) {
              handleError(error);
            }
          }}
          style={{ width: '100%' }}
        />
      </div>

      /* Display scan result or error message */
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {scanResult && <p className="scan-result">QR Code Data: {scanResult}</p>}

      /* Rescan button */
      <button className="rescan-button" onClick={() => setScanResult(null)}>
        Rescan
      </button>
    </div>
  );
};

export default Scanner;

import React from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';

const HomePage = () => {
  const history = useHistory();

  // Handler to navigate to the scanner page
  const navigateToScanner = () => {
    history.push('/scanner');
  };

  return (
    <div className="homepage-container">
      /* Header Section */
      <header className="homepage-header">
        <h1>Fake Product Checker</h1>
        <p>
          Verify the authenticity of products by scanning their QR codes. We use blockchain
          technology to ensure secure and tamper-proof verification.
        </p>
      </header>

      /* Illustration Section */
      <div className="homepage-illustration">
        <img
          src="https://examplexyz.com/illustration.png"
          alt="QR Code Scanning Illustration"
          className="illustration-image"
        />
      </div>

      /* Call to Action Section */
      <div className="homepage-cta">
        <button className="start-scanning-button" onClick={navigateToScanner}>
          Start Scanning
        </button>
      </div>
    </div>
  );
};

export default HomePage;

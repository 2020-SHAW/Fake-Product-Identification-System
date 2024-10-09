import React from 'react';

const ResultPage = ({ product }) => {
    if (!product) {
        return <div>No product data available.</div>;
    }

    if (product.isFake) {
        return <div style={{ color: 'red' }}>This product is counterfeit.</div>;
    }

    return (
        <div>
            <h1>Product Details</h1>
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            {/* Add more product details as needed */}
        </div>
    );
};

export default ResultPage;

const Product = require('./models/product');
const express = require('express');
const router = express.Router();
const { generateQRCode, addProductToBlockchain } = require('./utils.js'); // Import your utility functions

// Define the POST endpoint for product registration
router.post('/', async (req, res) => {
    try {
        const { name, description, price } = req.body;

        // Validate input data

        // Generate QR code
        const qrCodeUrl = generateQRCode(name, description, price);

        // Connect to MySQL database and insert product data
        // ... (use Sequelize or raw SQL)

        // Add product to blockchain
        const blockchainTxHash = await addProductToBlockchain(name, description, price, qrCodeUrl);

        // Store blockchain transaction hash in database
        // ...

        res.status(201).json({ message: 'Product registered successfully', blockchainTxHash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

Product.create({
    name,
    description,
    price,
    qrCodeUrl,
    blockchainTxHash,
})
    .then((product) => {
        res.status(201).json({ message: 'Product registered successfully', product });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    });



sequelize.query('INSERT INTO products (name, description, price, qrCodeUrl, blockchainTxHash) VALUES (?, ?, ?, ?, ?)', [name, description, price, qrCodeUrl, blockchainTxHash])
    .then((result) => {
        res.status(201).json({ message: 'Product registered successfully' });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    });
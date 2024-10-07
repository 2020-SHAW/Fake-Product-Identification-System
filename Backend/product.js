const { DataTypes } = require('sequelize');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    qrCodeUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    blockchainTxHash: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Product;
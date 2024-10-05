package main

import (
    "encoding/json"
    "fmt"
    "log"
    "github.com/hyperledger/fabric-sdk-go/pkg/gateway"
)

type Product struct {
    ProductID   string `json:"product_id"`
    ProductName string `json:"product_name"`
    Manufacturer string `json:"manufacturer"`
    QRCode      string `json:"qr_code"`
}

func initializeFabricClient() (*gateway.Gateway, *gateway.Contract, error) {
    // Create a new gateway connection
    wallet, err := gateway.NewFileSystemWallet("wallet")
    if err != nil {
        return nil, nil, err
    }

    // Check if user identity is already enrolled
    if !wallet.Exists("user1") {
        return nil, nil, fmt.Errorf("identity user1 does not exist in the wallet")
    }

    // Create a gateway connection
    gateway, err := gateway.Connect(gateway.WithWallet(wallet), gateway.WithOrg("Org1"), gateway.WithConnection("connection.yaml"))
    if err != nil {
        return nil, nil, err
    }

    // Get the network and contract
    network := gateway.GetNetwork("mychannel")
    contract := network.GetContract("productcc") // Chaincode name

    return gateway, contract, nil
}

func registerProduct(productID, productName, manufacturer, qrCode string) (map[string]interface{}, error) {
    gateway, contract, err := initializeFabricClient()
    if err != nil {
        return nil, err
    }
    defer gateway.Close()

    // Create product data
    product := Product{
        ProductID:   productID,
        ProductName: productName,
        Manufacturer: manufacturer,
        QRCode:      qrCode,
    }

    // Convert product data to JSON
    productJSON, err := json.Marshal(product)
    if err != nil {
        return nil, err
    }

    // Invoke the chaincode's 'addProduct' function
    result, err := contract.SubmitTransaction("addProduct", productID, productName, manufacturer, qrCode)
    if err != nil {
        return nil, fmt.Errorf("failed to submit transaction: %v", err)
    }

    return map[string]interface{}{
        "status":        "success",
        "message":       "Product registered successfully",
        "transaction_id": string(result),
    }, nil
}

func validateProduct(qrCode string) (map[string]interface{}, error) {
    gateway, contract, err := initializeFabricClient()
    if err != nil {
        return nil, err
    }
    defer gateway.Close()

    // Invoke the chaincode's 'validateProduct' function
    result, err := contract.EvaluateTransaction("validateProduct", qrCode)
    if err != nil {
        return nil, fmt.Errorf("failed to evaluate transaction: %v", err)
    }

    // Process the response
    var productData map[string]interface{}
    if err := json.Unmarshal(result, &productData); err != nil {
        return nil, err
    }

    return map[string]interface{}{
        "status":  "success",
        "product": productData,
    }, nil
}

func main() {
    // Example usage
    if _, err := registerProduct("123", "Sample Product", "Sample Manufacturer", "QR123"); err != nil {
        log.Fatalf("Error registering product: %v", err)
    }

    if _, err := validateProduct("QR123"); err != nil {
        log.Fatalf("Error validating product: %v", err)
    }
}

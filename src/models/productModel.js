// Importation de la connexion à la base de données
const dataBase = require('../db/db_connect');

// Modèle pour les produits
const Product = function (product) {
    this.name = product.name;
    this.price = product.price;
    this.categoryId = product.categoryId;
    this.brandId = product.brandId;
};

// Opérations CRUD pour les produits

// Récupérer tous les produits
Product.getAllProducts = (result) => {
    dataBase.query("SELECT * FROM product", (error, data) => {
        if (error) {
            result(error, null);
            return;
        }
        result(null, data);
    });
};

// Récupérer un produit par son ID
Product.getProductById = (productId, result) => {
    dataBase.query("SELECT * FROM product WHERE id = ?", [productId], (error, data) => {
        if (error) {
            result(error, null);
            return;
        }
        if (data.length) {
            result(null, data[0]);
        } else {
            result({ message: "Produit non trouvé." }, null);
        }
    });
};

// Créer un nouveau produit
Product.createProduct = (newProduct, result) => {
    dataBase.query("INSERT INTO product SET ?", newProduct, (error, data) => {
        if (error) {
            result(error, null);
            return;
        }
        result(null, { id: data.insertId, ...newProduct });
    });
};

// Mettre à jour un produit
Product.updateProduct = (productId, updatedProduct, result) => {
    dataBase.query("UPDATE product SET ? WHERE id = ?", [updatedProduct, productId], (error, data) => {
        if (error) {
            result(error, null);
            return;
        }
        if (data.affectedRows === 0) {
            result({ message: "Produit non trouvé." }, null);
        } else {
            result(null, { id: productId, ...updatedProduct });
        }
    });
};

// Supprimer un produit
Product.deleteProduct = (productId, result) => {
    dataBase.query("DELETE FROM product WHERE id = ?", productId, (error, data) => {
        if (error) {
            result(error, null);
            return;
        }
        if (data.affectedRows === 0) {
            result({ message: "Produit non trouvé." }, null);
        } else {
            result(null, { message: "Produit supprimé avec succès." });
        }
    });
};

module.exports = Product;

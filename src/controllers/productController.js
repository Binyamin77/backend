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
Product.getAllProducts = (req, res) => {
    dataBase.query("SELECT * FROM product", (error, data) => {
        if (error) {
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des produits" });
            return;
        }
        res.status(200).json(data);
    });
};

// Récupérer un produit par son ID
Product.getProductById = (req, res) => {
    const productId = req.params.id;
    dataBase.query("SELECT * FROM product WHERE id = ?", [productId], (error, data) => {
        if (error) {
            res.status(500).json({ error: "Une erreur s'est produite lors de la récupération du produit" });
            return;
        }
        if (data.length) {
            res.status(200).json(data[0]);
        } else {
            res.status(404).json({ message: "Produit non trouvé" });
        }
    });
};

// Créer un nouveau produit
Product.createProduct = (req, res) => {
    const newProduct = req.body;
    dataBase.query("INSERT INTO product SET ?", newProduct, (error, data) => {
        if (error) {
            res.status(500).json({ error: "Une erreur s'est produite lors de la création du produit" });
            return;
        }
        res.status(201).json({ id: data.insertId, ...newProduct });
    });
};

// Mettre à jour un produit
Product.updateProduct = (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    dataBase.query("UPDATE product SET ? WHERE id = ?", [updatedProduct, productId], (error, data) => {
        if (error) {
            res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour du produit" });
            return;
        }
        if (data.affectedRows === 0) {
            res.status(404).json({ message: "Produit non trouvé" });
        } else {
            res.status(200).json({ id: productId, ...updatedProduct });
        }
    });
};

// Supprimer un produit
Product.deleteProduct = (req, res) => {
    const productId = req.params.id;
    dataBase.query("DELETE FROM product WHERE id = ?", productId, (error, data) => {
        if (error) {
            res.status(500).json({ error: "Une erreur s'est produite lors de la suppression du produit" });
            return;
        }
        if (data.affectedRows === 0) {
            res.status(404).json({ message: "Produit non trouvé" });
        } else {
            res.status(200).json({ message: "Produit supprimé avec succès" });
        }
    });
};

module.exports = Product;

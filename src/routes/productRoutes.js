const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     summary: Récupérer tous les produits
 *     responses:
 *       200:
 *         description: Succès de la requête avec la liste des produits
 *       500:
 *         description: Une erreur s'est produite lors de la récupération des produits
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   get:
 *     summary: Récupérer un produit par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès de la requête avec le produit spécifié
 *       404:
 *         description: Produit non trouvé
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/v1/product:
 *   post:
 *     summary: Créer un nouveau produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du produit
 *               price:
 *                 type: number
 *                 description: Prix du produit
 *               categoryId:
 *                 type: integer
 *                 description: ID de la catégorie du produit
 *               brandId:
 *                 type: integer
 *                 description: ID de la marque du produit
 *             example:
 *               name: Nouveau produit
 *               price: 24.99
 *               categoryId: 1
 *               brandId: 1
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       400:
 *         description: Requête invalide, certaines propriétés du produit sont manquantes ou incorrectes
 *       500:
 *         description: Une erreur s'est produite lors de la création du produit
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   put:
 *     summary: Mettre à jour un produit existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nouveau nom du produit
 *               price:
 *                 type: number
 *                 description: Nouveau prix du produit
 *               categoryId:
 *                 type: integer
 *                 description: Nouvel ID de la catégorie du produit
 *               brandId:
 *                 type: integer
 *                 description: Nouvel ID de la marque du produit
 *             example:
 *               name: Nouveau nom du produit
 *               price: 29.99
 *               categoryId: 2
 *               brandId: 1
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       400:
 *         description: Requête invalide, certaines propriétés du produit sont manquantes ou incorrectes
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Une erreur s'est produite lors de la mise à jour du produit
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *       500:
 *         description: Une erreur s'est produite lors de la suppression du produit
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;

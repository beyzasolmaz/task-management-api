const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const taskController = require("../controllers/taskController");

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Yeni görev oluşturur
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task oluşturuldu
 */
router.post("/task", authMiddleware, taskController.createTask);

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: Tüm görevleri listeler
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Görevler başarıyla listelendi
 */
router.get("/task", authMiddleware, taskController.getAllTasks);

/**
 * @swagger
 * /api/task/{id}:
 *   get:
 *     summary: ID'ye göre tek görev getirir
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Görev ID değeri
 *     responses:
 *       200:
 *         description: Görev başarıyla getirildi
 *       404:
 *         description: Görev bulunamadı
 */
router.get("/task/:id", authMiddleware, taskController.getTaskById);

/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *     summary: ID'ye göre görevi günceller
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Güncellenecek görev ID değeri
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Görev başarıyla güncellendi
 *       404:
 *         description: Görev bulunamadı
 */
router.put("/task/:id", authMiddleware, taskController.updateTask);

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *     summary: ID'ye göre görevi siler
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Silinecek görev ID değeri
 *     responses:
 *       200:
 *         description: Görev başarıyla silindi
 *       404:
 *         description: Görev bulunamadı
 */
router.delete("/task/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
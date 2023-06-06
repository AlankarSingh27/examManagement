// routes/users.js

const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');



// GET /users
router.get("/", async (request ,response) => {
    await UserController.getAllUsers(request, response);
});
router.post("/", async (request ,response) => {
    await UserController.createUser(request, response);
});
router.get("/:id", async (request ,response) => {
    await UserController.getUserById(request, response);
});
router.put("/:id", async (request ,response) => {
    await UserController.updateUser(request, response);
});
router.delete("/:id", async (request ,response) => {
    await UserController.deleteUser(request, response);
});




module.exports = router;

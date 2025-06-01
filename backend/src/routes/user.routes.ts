import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

// Create a new user
router.post("/", userController.createUser.bind(userController));

// Get user by phone number
router.get("/phone/:phone", userController.getUserByPhone.bind(userController));

// Update user
router.put("/:id", userController.updateUser.bind(userController));

export default router;

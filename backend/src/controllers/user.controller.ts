import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserCreateDTO, UserUpdateDTO } from "../models/user.model";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const userData: UserCreateDTO = req.body;
            const user = await this.userService.createUser(userData);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: "Failed to create user" });
        }
    }

    async getUserByPhone(req: Request, res: Response): Promise<void> {
        try {
            const { phone } = req.params;
            const user = await this.userService.getUserByPhone(phone);
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Failed to get user" });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const userData: UserUpdateDTO = req.body;
            const user = await this.userService.updateUser(
                Number(id),
                userData
            );
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Failed to update user" });
        }
    }
}

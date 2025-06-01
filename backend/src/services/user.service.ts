import { getDatabase } from "../config/database";
import { User, UserCreateDTO, UserUpdateDTO } from "../models/user.model";

export class UserService {
    private db = getDatabase();

    async createUser(userData: UserCreateDTO): Promise<User> {
        return new Promise((resolve, reject) => {
            const { phone, name, email, blood_group, age } = userData;
            this.db.run(
                `INSERT INTO users (phone, name, email, blood_group, age) VALUES (?, ?, ?, ?, ?)`,
                [phone, name, email, blood_group, age],
                function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ id: this.lastID, ...userData });
                }
            );
        });
    }

    async getUserByPhone(phone: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            this.db.get(
                "SELECT * FROM users WHERE phone = ?",
                [phone],
                (err, row) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve((row as User) || null);
                }
            );
        });
    }

    async updateUser(
        id: number,
        userData: UserUpdateDTO
    ): Promise<User | null> {
        return new Promise((resolve, reject) => {
            const updates = Object.entries(userData)
                .filter(([_, value]) => value !== undefined)
                .map(([key]) => `${key} = ?`)
                .join(", ");

            const values = Object.values(userData).filter(
                (value) => value !== undefined
            );
            values.push(id);

            this.db.run(
                `UPDATE users SET ${updates} WHERE id = ?`,
                values,
                function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (this.changes === 0) {
                        resolve(null);
                        return;
                    }
                    resolve({ id, ...userData } as User);
                }
            );
        });
    }
}

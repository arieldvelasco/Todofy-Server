import UserModel from "../models/user.model";
import { User } from "../types";

export const fetchUser = async (userId: string) => {
    try {
        const users = await UserModel.find().lean();
        const user = users.find(user => user.userId === userId);
        if (!user) {
            return { status: 404, message: "User not found", user: null };
        }
        return { status: 200, message: "User fetched successfully", user };
    } catch (error) {
        return { status: 500, message: "Error fetching user", user: null };
    }
}

export const createUser = async (useData: User) => {
    try {
        const { userName, userId, email } = useData;
        if (!userName || !userId || !email) {
            return { status: 400, message: "Username, userId, and email are required" };
        }
        const existingUser = await fetchUser(userId);
        if (existingUser.status === 200) {
            return { status: 400, message: "User already exists" };
        }
        const newUser = new UserModel({
            userName,
            userId,
            email
        });
        await newUser.save();
        return { status: 201, message: "User created successfully" };
    } catch (error) {
        return { status: 500, message: "Error creating user" };
    }
}

export const updateUser = async (userId: string, userName: string) => {
    try {
        if (!userId || !userName) {
            return { status: 400, message: "UserId, username, and email are required" };
        }

        const result = await fetchUser(userId);
        if (result.status !== 200) {
            return { status: result.status, message: result.message };
        }

        const _id = result.user?._id;
        if (!_id) {
            return { status: 404, message: "User not found" };
        }

        const updatedUser = await UserModel.findByIdAndUpdate(_id, { userName }, { new: true });
        if (!updatedUser) {
            return { status: 404, message: "User not found" };
        }

        return { status: 200, message: "User updated successfully" };
    } catch (error) {
        return { status: 500, message: "Error updating user" };
    }
}
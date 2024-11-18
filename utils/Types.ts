import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export interface UserType {
    username: string,
    userId: string,
    profileUrl: string,
    [key: string]: string,
}

export interface MessageType {
    createdAt: Timestamp,
    profileUrl: string,
    senderName: string,
    text: string,
    userId: string,
    picture: string,
}

export interface AuthContextType {
    user: UserType; // You can specify the actual type here based on your user object structure
    isAuthenticated: boolean | undefined;
    login: (
        email: string,
        password: string
    ) => Promise<{ success: boolean; data?: Object; msg?: string }>;
    register: (
        email: string,
        password: string,
        username: string,
        profileUrl: string
    ) => Promise<{ success: boolean; data?: Object; msg?: string }>;
    logout: () => Promise<{ success: boolean; data?: Object; msg?: string }>;
}
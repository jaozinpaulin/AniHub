import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    type UserCredential
} from "firebase/auth";

import { auth } from "../firebase/config";

export function register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
}
export function login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout(): Promise<void> {
    return signOut(auth);
}
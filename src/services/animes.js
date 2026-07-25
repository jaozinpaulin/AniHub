import { db } from "../firebase/config";

import { getDocs, collection, query, limit } from "firebase/firestore";

export async function getAnimes() {

    try {
        const q = query(
            collection(db, "animes"),
            limit(16)
        );
        const animesSnapshot = await getDocs(q);

        const animes = animesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        const lastVisible =
            animesSnapshot.docs[animesSnapshot.docs.length - 1];

        return {
            animes,
            lastVisible
        };
    } catch (error) {
        console.error("Erro ao buscar animes", error);
        throw error;
    }
}
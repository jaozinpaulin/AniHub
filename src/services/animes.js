import { db } from "../firebase/config";

import { getDocs, collection } from "firebase/firestore";

export async function getAnimes() {
    try {
        const animesSnapshot = await getDocs(collection(db, "animes"))

        return animesSnapshot.docs.map((doc) => ({
            id: doc.id_video,
            ...doc.data()
        }));

    } catch (error) {
        console.error("Erro ao buscar animes", error);
        throw error;
    }

}
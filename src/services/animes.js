import { db } from "../firebase/config";
import {
    collection,
    getDocs,
    limit,
    query,
    startAfter,
    orderBy,
    doc,
    getDoc,
    where
} from "firebase/firestore";

export async function getAnimes(limitValue = 16, lastVisibleDoc = null) {
    try {
        const collectionRef = collection(db, "animes");

        const queryConstraints = [
            orderBy("nome"),
            limit(limitValue)
        ];

        if (lastVisibleDoc) {
            queryConstraints.splice(1, 0, startAfter(lastVisibleDoc));
        }

        const q = query(collectionRef, ...queryConstraints);
        const snapshot = await getDocs(q);

        const animes = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        const lastVisible = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
        const hasMore = snapshot.docs.length === limitValue;

        return {
            animes,
            lastVisible,
            hasMore
        };
    } catch (error) {
        console.error("Erro ao buscar animes", error);
        throw error;
    }
}

export async function getAnimeById(id) {
    try {
        const docRef = doc(db, "animes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Anime não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao buscar anime individual:", error);
        throw error;
    }
}

export async function getHomeAnimes() {
    try {
        const { animes } = await getAnimes(20);
        return animes;
    } catch (error) {
        console.error("Erro ao buscar animes da Home", error);
        throw error;
    }
}


/*  Realiza uma busca leve por prefixo do nome direto no Firestore */
export async function searchAnimesByName(searchTerm, limitValue = 5) {
    if (!searchTerm || searchTerm.trim().length < 2) return [];

    try {
        const term = searchTerm.trim();
        const endTerm = term + "\uf8ff";

        const collectionRef = collection(db, "animes");
        const q = query(
            collectionRef,
            orderBy("nome"),
            where("nome", ">=", term),
            where("nome", "<=", endTerm),
            limit(limitValue)
        );

        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Erro ao pesquisar animes:", error);
        return [];
    }
}
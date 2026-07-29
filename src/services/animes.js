import { db } from "../firebase/config";
import {
    collection,
    getDocs,
    limit,
    query,
    startAfter,
    startAt,
    endAt,
    orderBy,
    doc,
    getDoc
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
        const { animes } = await getAnimes(25);
        return animes;
    } catch (error) {
        console.error("Erro ao buscar animes da Home", error);
        throw error;
    }
}


export async function searchAnimesByName(searchTerm, limitValue = 4) {
    const texto = searchTerm?.trim();

    if (!texto || texto.length < 2) return [];

    const variacoes = [
        texto,
        texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase(),
        texto.toUpperCase(),
        texto.toLowerCase()
    ];

    try {
        for (const term of variacoes) {
            const q = query(
                collection(db, "animes"),
                orderBy("nome"),
                startAt(term),
                endAt(term + "\uf8ff"),
                limit(limitValue)
            );

            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                return snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
            }
        }

        return [];
    } catch (error) {
        console.error("Erro ao pesquisar animes:", error);
        return [];
    }
}
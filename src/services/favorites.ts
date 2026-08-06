import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";

import { db } from "../firebase/config";
import type { AnimeType } from "../types/anime";

export async function addFavorite(uid: string, anime: AnimeType): Promise<void> {
    const favoriteDocRef = doc(db, "users", uid, "favorites", anime.id_video.toString());
    await setDoc(favoriteDocRef, anime);
}

export async function getFavorites(uid: string): Promise<AnimeType[]> {
    const favoritesRef = collection(db, "users", uid, "favorites");
    const favoritesSnapshot = await getDocs(favoritesRef);

    const favorites = favoritesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    } as AnimeType));

    return favorites;
}

export async function removeFavorite(uid: string, animeId: string): Promise<void> {
    const favoriteDocRef = doc(db, "users", uid, "favorites", animeId.toString());
    await deleteDoc(favoriteDocRef)
}



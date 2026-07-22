import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";

import { db } from "../firebase/config";

export async function addFavorite(uid, anime) {
    const favoriteDocRef = doc(db, "users", uid, "favorites", anime.toString());
    await setDoc(favoriteDocRef, anime);
}

export async function getFavorites(uid) {
    const favoritesRef = collection(db, "users", uid, "favorites");
    const favoritesSnapshot = await getDocs(favoritesRef);

    const favorites = favoritesSnapshot.docs.map((doc) => { return doc.data() });
    return favorites;
}

export async function removeFavorite(uid, animeId) {
    const favoriteDocRef = doc(db, "users", uid, "favorites", animeId.toString());
    await deleteDoc(favoriteDocRef)
}
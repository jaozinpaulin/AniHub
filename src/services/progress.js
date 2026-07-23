import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export async function saveProgress(uid, dadosEp) {
    const progressId = `${dadosEp.animeId}_T${dadosEp.temporada}_EP${dadosEp.episodio}`;

    const progressDocRef = doc(db, "users", uid, "progress", progressId);

    await setDoc(progressDocRef, dadosEp);
}

export async function getProgress(uid) {
    const progressRef = collection(db, "users", uid, "progress");
    const progressSnapshot = await getDocs(progressRef);

    return progressSnapshot.docs.map((doc) => doc.data());
}

export async function removeProgress(uid, progressId) {
    const progressDocRef = doc(db, "users", uid, "progress", progressId.toString());
    await deleteDoc(progressDocRef)
}
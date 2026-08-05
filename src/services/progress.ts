import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

import type { ProgressVideoType } from "../context/TimerProvider";



export async function saveProgress(uid: string, dadosEp: ProgressVideoType) {
    const progressId = `${dadosEp.animeId}_T${dadosEp.temporada}_EP${dadosEp.episodio}`;

    const progressDocRef = doc(db, "users", uid, "progress", progressId);

    await setDoc(progressDocRef, dadosEp);
}

export async function getProgress(uid: string): Promise<ProgressVideoType[]> {
    const progressRef = collection(db, "users", uid, "progress");
    const progressSnapshot = await getDocs(progressRef);

    return progressSnapshot.docs.map((doc) => ({
        animeId: doc.data().animeId,
        temporada: doc.data().temporada,
        episodio: doc.data().episodio,
        progress: doc.data().progress
    }));

}

export async function removeProgress(uid: string, progressId: string) {
    const progressDocRef = doc(db, "users", uid, "progress", progressId.toString());
    await deleteDoc(progressDocRef)
}
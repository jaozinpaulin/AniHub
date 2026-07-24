import { doc, setDoc } from "firebase/firestore";

import { db } from "../src/firebase/config.js";
import animes from "../src/services/detalhes_animes.json" with { type: "json" };

async function uploadAnimes() {

    console.log("🚀 Iniciando importação...");

    for (const anime of animes) {

        await setDoc(
            doc(db, "animes", anime.id_video.toString()),
            anime
        );

        console.log(`✔ ${anime.nome}`);
    }



    console.log("✅ Importação finalizada!");
}

uploadAnimes();
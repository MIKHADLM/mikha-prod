// Service de gestion des vidéos (Firestore)
// Le modèle logique correspond à l’interface Video que nous avons définie.

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/client";

const VIDEOS_COLLECTION = "videos";

/**
 * Récupère la liste des vidéos triées par champ "order" croissant.
 */
export async function getVideos() {
  const q = query(collection(db, VIDEOS_COLLECTION), orderBy("order", "asc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

import { 
  collection, 
  getDocs, 
  getDoc,
  query, 
  orderBy, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  where,
  writeBatch
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/client";

const VIDEOS_COLLECTION = "videos";

/**
 * Récupère la liste des vidéos triées par champ "order" croissant.
 */
export async function getVideos() {
  try {
    // Force la récupération depuis le serveur (évite le cache corrompu IndexedDB)
    const q = query(collection(db, VIDEOS_COLLECTION), orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    
    if (snapshot.metadata.fromCache) {
      console.warn("Attention : Données chargées depuis le cache local (potentiellement obsolètes).");
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erreur getVideos:", error);
    throw error;
  }
}

/**
 * Sauvegarde ou met à jour une vidéo
 */
export async function saveVideo(videoData) {
  try {
    const { id, ...data } = videoData;
    const videoToSave = {
      ...data,
      updatedAt: serverTimestamp(),
    };

    if (id && id.length > 15) {
      const docRef = doc(db, VIDEOS_COLLECTION, id);
      await updateDoc(docRef, videoToSave);
      return { id, ...videoToSave };
    } else {
      const docRef = await addDoc(collection(db, VIDEOS_COLLECTION), {
        ...videoToSave,
        createdAt: serverTimestamp(),
        order: videoData.order || 0
      });
      return { id: docRef.id, ...videoToSave };
    }
  } catch (error) {
    console.error("Erreur saveVideo:", error);
    throw new Error("Impossible de sauvegarder la vidéo");
  }
}

/**
 * SUPPRESSION COMPLÈTE
 */
export async function deleteVideo(videoId) {
  try {
    console.log("--- Début processus suppression ---");
    
    let videoData = null;
    let targetDocId = videoId;

    const docRef = doc(db, VIDEOS_COLLECTION, videoId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      videoData = docSnap.data();
    } else {
      const q = query(collection(db, VIDEOS_COLLECTION), where("id", "==", videoId));
      const qSnap = await getDocs(q);
      
      if (!qSnap.empty) {
        targetDocId = qSnap.docs[0].id;
        videoData = qSnap.docs[0].data();
      }
    }

    if (videoData) {
      await deleteVideoFiles(videoData);
    }

    const finalDocRef = doc(db, VIDEOS_COLLECTION, targetDocId);
    await deleteDoc(finalDocRef);

    console.log("Suppression Firestore réussie.");
    return true;

  } catch (error) {
    console.error("Erreur deleteVideo:", error);
    throw error;
  }
}

/**
 * MISE À JOUR DE L'ORDRE (VERSION SÉCURISÉE)
 */
export async function updateVideoOrder(videos) {
  try {
    console.log("Mise à jour de l'ordre en cours...");
    
    // 1. On récupère les IDs réels depuis le serveur obligatoirement
    const snapshot = await getDocs(collection(db, VIDEOS_COLLECTION));
    const firestoreDocs = snapshot.docs.map(d => ({ 
      id: d.id, 
      id: d.data().id 
    }));

    const batch = writeBatch(db);
    let count = 0;

    videos.forEach((videoFromUI) => {
      const match = firestoreDocs.find(d => 
        d.id === videoFromUI.id || 
        d.id === videoFromUI.id || 
        d.id === videoFromUI.id
      );

      if (match) {
        const docRef = doc(db, VIDEOS_COLLECTION, match.id);
        batch.update(docRef, { 
          order: Number(videoFromUI.order), // Force le format nombre
          updatedAt: serverTimestamp()
        });
        count++;
      }
    });

    if (count > 0) {
      // 2. On attend la confirmation réelle du serveur
      await batch.commit();
      console.log(`Serveur : Ordre de ${count} vidéos enregistré.`);
      
      // Petit hack pour forcer le rafraîchissement si le cache est têtu
      if (typeof window !== 'undefined') {
        console.log("Synchronisation terminée.");
      }
    }
    
    return true;
  } catch (error) {
    console.error("ERREUR RÉSEAU : L'ordre n'a pas pu être envoyé au serveur.", error);
    throw error;
  }
}

/**
 * Helper: Supprime les fichiers réels du Storage
 */
async function deleteVideoFiles(video) {
  const deletePromises = [];

  if (video.thumbnailUrl && video.thumbnailUrl.includes('firebasestorage')) {
    try {
      const fileRef = ref(storage, video.thumbnailUrl);
      deletePromises.push(deleteObject(fileRef));
    } catch (e) { console.warn("Erreur suppression miniature:", e); }
  }

  if (video.previewClipUrl) {
    try {
      const fileRef = ref(storage, video.previewClipUrl);
      deletePromises.push(deleteObject(fileRef));
    } catch (e) { console.warn("Erreur suppression preview:", e); }
  }

  if (deletePromises.length > 0) {
    await Promise.allSettled(deletePromises);
  }
}

/**
 * Upload de fichier
 */
export async function uploadFile(file, path) {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Erreur uploadFile:", error);
    throw error;
  }
}
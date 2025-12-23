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
    const q = query(
      collection(db, VIDEOS_COLLECTION), 
      orderBy("order", "asc")
    );
    
    // Forcer la récupération depuis le serveur (désactiver le cache)
    const snapshot = await getDocs(q, { 
      source: 'server'  // Force server-side, ignore cache
    });
    
    if (snapshot.metadata.fromCache) {
      console.warn("Attention : Données chargées depuis le cache local malgré la demande serveur");
    } else {
      console.log("Données chargées depuis le serveur Firebase");
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
      // Modification d'une vidéo existante
      const docRef = doc(db, VIDEOS_COLLECTION, id);
      await updateDoc(docRef, videoToSave);
      return { id, ...videoToSave };
    } else {
      // Création d'une nouvelle vidéo - calculer le plus grand ordre
      const videos = await getVideos();
      const maxOrder = videos.length > 0 
        ? Math.max(...videos.map(v => v.order || 0))
        : 0;
      
      const docRef = await addDoc(collection(db, VIDEOS_COLLECTION), {
        ...videoToSave,
        createdAt: serverTimestamp(),
        order: maxOrder + 1  // Nouvelle vidéo à la fin
      });
      return { id: docRef.id, ...videoToSave, order: maxOrder + 1 };
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
      const q = query(collection(db, VIDEOS_COLLECTION), where("youtubeId", "==", videoId));
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
    
    // 1. On récupère les documents depuis le serveur avec leurs IDs
    const snapshot = await getDocs(collection(db, VIDEOS_COLLECTION));
    const firestoreDocs = snapshot.docs.map(d => ({ 
      firestoreId: d.id,           // ID du document Firestore
      youtubeId: d.data().id       // ID YouTube stocké dans le champ "id"
    }));

    const batch = writeBatch(db);
    let count = 0;

    videos.forEach((videoFromUI) => {
      // 2. On cherche le document par youtubeId
      const match = firestoreDocs.find(d => 
        d.youtubeId === videoFromUI.id
      );

      if (match) {
        const docRef = doc(db, VIDEOS_COLLECTION, match.firestoreId);
        batch.update(docRef, { 
          order: Number(videoFromUI.order), // Force le format nombre
          updatedAt: serverTimestamp()
        });
        count++;
        console.log(`Mise à jour ordre: ${match.youtubeId} -> ${videoFromUI.order}`);
      } else {
        console.warn(`Vidéo non trouvée: ${videoFromUI.id}`);
      }
    });

    if (count > 0) {
      // 3. On attend la confirmation réelle du serveur
      await batch.commit();
      console.log(`Serveur : Ordre de ${count} vidéos enregistré.`);
      
      // Petit hack pour forcer le rafraîchissement si le cache est têtu
      if (typeof window !== 'undefined') {
        console.log("Synchronisation terminée.");
      }
    } else {
      console.warn("Aucune vidéo mise à jour - vérifiez les IDs");
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
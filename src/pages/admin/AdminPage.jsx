import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Button, 
  Snackbar, 
  Alert, 
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { getVideos, updateVideoOrder, saveVideo, deleteVideo } from '../../services/videosService';
import VideoForm from '../../components/admin/VideoForm';
import VideoList from '../../components/admin/VideoList';

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showLoginDialog, setShowLoginDialog] = useState(true);
  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Vérification de l'authentification au montage
  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setShowLoginDialog(false);
      fetchVideos();
    }
  }, []);

  const handleLogin = () => {
    if (password === 'mikha-admin-2024') {
      setIsAuthenticated(true);
      setShowLoginDialog(false);
      localStorage.setItem('admin_authenticated', 'true');
      fetchVideos();
      showSnackbar('Connexion réussie', 'success');
    } else {
      showSnackbar('Mot de passe incorrect', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    navigate('/');
  };

  // Charger les vidéos depuis Firestore
  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const videosData = await getVideos();
      
      const validatedVideos = videosData.map((video, index) => ({
        ...video,
        order: typeof video.order === 'number' ? video.order : index,
      })).sort((a, b) => a.order - b.order);
      
      setVideos(validatedVideos);
    } catch (err) {
      console.error('Erreur chargement:', err);
      setError('Impossible de charger les vidéos.');
      showSnackbar('Erreur de connexion à Firebase', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // --- GESTION DES VIDÉOS ---

  // Réordonner les vidéos (Drag & Drop)
  const handleSaveOrder = async (reorderedVideos) => {
    try {
      const updatedVideos = reorderedVideos.map((video, index) => ({
        ...video,
        order: index
      }));
      
      setVideos(updatedVideos); // Mise à jour UI immédiate
      await updateVideoOrder(updatedVideos);
      showSnackbar('Ordre enregistré');
    } catch (error) {
      console.error('Erreur ordre:', error);
      showSnackbar('Erreur lors du réordonnancement', 'error');
      fetchVideos(); // Reset en cas d'échec
    }
  };

  // Ouvrir le formulaire (Ajout ou Edit)
  const handleEditVideo = (video) => {
    setCurrentVideo(JSON.parse(JSON.stringify(video)));
    setIsEditing(true);
  };

  const handleAddVideo = () => {
    setCurrentVideo(null);
    setIsEditing(true);
  };

  // SUPPRESSION OPTIMISTE (CORRIGÉE)
  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Supprimer définitivement cette vidéo ?')) {
      return;
    }

    // 1. Sauvegarde pour rollback et mise à jour UI immédiate
    const backupVideos = [...videos];
    setVideos(prev => prev.filter(v => v.id !== videoId && v.youtubeId !== videoId));

    try {
      // 2. Appel au service Firebase
      await deleteVideo(videoId);
      showSnackbar('Vidéo supprimée avec succès');
      
      // 3. Rafraîchissement silencieux pour synchroniser l'état exact
      const freshData = await getVideos();
      setVideos(freshData.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      showSnackbar(error.message || 'Erreur lors de la suppression', 'error');
      
      // 4. Rollback en cas d'erreur serveur
      setVideos(backupVideos);
    }
  };

  // Sauvegarder une vidéo (Nouveau ou Update)
  const handleSaveVideo = async (videoData) => {
    try {
      setIsSaving(true);
      
      const videoToSave = {
        ...videoData,
        category: Array.isArray(videoData.category) 
          ? videoData.category 
          : videoData.category ? [videoData.category] : [],
        order: typeof videoData.order === 'number' ? videoData.order : videos.length,
        date: videoData.date || new Date().toISOString().split('T')[0],
      };
      
      await saveVideo(videoToSave);
      
      // Rechargement complet pour s'assurer que l'ID Firestore est bien récupéré
      await fetchVideos();
      
      showSnackbar('Vidéo enregistrée avec succès');
      setIsEditing(false);
      setCurrentVideo(null);
      
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      showSnackbar('Erreur lors de la sauvegarde', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Écran de Login
  if (!isAuthenticated) {
    return (
      <Dialog open={showLoginDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Connexion Administrateur</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/')}>Annuler</Button>
          <Button onClick={handleLogin} variant="contained">Se connecter</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Administration
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {videos.length} vidéo(s) enregistrée(s)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddVideo}>
            Ajouter
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Quitter
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 0, overflow: 'hidden', borderRadius: 2 }}>
        {error ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
            <Button onClick={fetchVideos} sx={{ mt: 1 }}>Réessayer</Button>
          </Box>
        ) : (
          <VideoList 
            videos={videos}
            onVideosUpdate={handleSaveOrder}
            onEdit={handleEditVideo}
            onDelete={handleDeleteVideo}
            loading={loading}
          />
        )}
      </Paper>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <VideoForm
        open={isEditing}
        onClose={() => !isSaving && setIsEditing(false)}
        onSave={handleSaveVideo}
        video={currentVideo}
        isSaving={isSaving}
      />
    </Container>
  );
};

export default AdminPage;
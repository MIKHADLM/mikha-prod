import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import { CloudUpload as UploadIcon, Close as CloseIcon } from '@mui/icons-material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/client';

const CATEGORIES = [
  'Clip musicaux',
  'Publicité', 
  'Vidéos YouTube',
  'Vidéos courtes'
];

const VideoForm = ({ open, onClose, onSave, video, isSaving }) => {
  const [formData, setFormData] = useState({
    id: '',
    youtubeId: '',
    title: '',
    description: '',
    category: [],
    orientation: 'horizontal',
    visible: true,
    order: 0,
    date: '',
    thumbnailUrl: '',
    previewClipUrl: ''
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewClipFile, setPreviewClipFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({ thumbnail: 0, preview: 0 });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (video) {
      setFormData({
        id: video.id || '',
        youtubeId: video.youtubeId || video.id || '',
        title: video.title || '',
        description: video.description || '',
        category: Array.isArray(video.category) ? video.category : (video.category ? [video.category] : []),
        orientation: video.orientation || 'horizontal',
        visible: video.visible !== false,
        order: video.order || 0,
        date: video.date || '',
        thumbnailUrl: video.thumbnailUrl || '',
        previewClipUrl: video.previewClipUrl || ''
      });
    } else {
      setFormData({
        id: '',
        youtubeId: '',
        title: '',
        description: '',
        category: [],
        orientation: 'horizontal',
        visible: true,
        order: 0,
        date: new Date().toISOString().split('T')[0],
        thumbnailUrl: '',
        previewClipUrl: ''
      });
    }
    setThumbnailFile(null);
    setPreviewClipFile(null);
    setErrors({});
  }, [video, open]);

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setFormData(prev => ({ 
      ...prev, 
      category: typeof value === 'string' ? value.split(',') : value 
    }));
  };

  const handleFileChange = (field) => (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validation du type de fichier
      if (field === 'thumbnail' && !file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, thumbnail: 'Veuillez sélectionner une image' }));
        return;
      }
      if (field === 'preview' && !file.type.startsWith('video/')) {
        setErrors(prev => ({ ...prev, preview: 'Veuillez sélectionner une vidéo' }));
        return;
      }
      
      // Validation de la taille (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ 
          ...prev, 
          [field]: 'Le fichier est trop volumineux (max 10MB)' 
        }));
        return;
      }
      
      if (field === 'thumbnail') {
        setThumbnailFile(file);
        setErrors(prev => ({ ...prev, thumbnail: '' }));
      } else {
        setPreviewClipFile(file);
        setErrors(prev => ({ ...prev, preview: '' }));
      }
    }
  };

  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.youtubeId.trim()) newErrors.youtubeId = 'L\'ID YouTube est requis';
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (formData.category.length === 0) newErrors.category = 'Au moins une catégorie est requise';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      let thumbnailUrl = formData.thumbnailUrl;
      let previewClipUrl = formData.previewClipUrl;
      
      // Upload de la miniature si un fichier est sélectionné
      if (thumbnailFile) {
        const thumbnailPath = `thumbnails/${Date.now()}_${thumbnailFile.name}`;
        thumbnailUrl = await uploadFile(thumbnailFile, thumbnailPath);
      }
      
      // Upload de l'extrait vidéo si un fichier est sélectionné
      if (previewClipFile) {
        const previewPath = `previews/${Date.now()}_${previewClipFile.name}`;
        previewClipUrl = await uploadFile(previewClipFile, previewPath);
      }
      
      const videoData = {
        ...formData,
        id: (video && video.id) || formData.id,
        thumbnailUrl,
        previewClipUrl
      };
      
      await onSave(videoData);
      
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setErrors({ submit: 'Erreur lors de l\'enregistrement de la vidéo' });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {video ? 'Modifier la vidéo' : 'Ajouter une vidéo'}
          </Typography>
          <IconButton onClick={onClose} disabled={isSaving}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1 }}>
          {errors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.submit}
            </Alert>
          )}
          
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr' }}>
            {/* YouTube ID */}
            <TextField
              label="ID YouTube"
              value={formData.youtubeId}
              onChange={handleInputChange('youtubeId')}
              error={!!errors.youtubeId}
              helperText={errors.youtubeId}
              required
              disabled={isSaving}
              placeholder="Ex: dZvV-Izb4lw"
            />
            
            {/* Titre */}
            <TextField
              label="Titre"
              value={formData.title}
              onChange={handleInputChange('title')}
              error={!!errors.title}
              helperText={errors.title}
              required
              disabled={isSaving}
            />
            
            {/* Description */}
            <TextField
              label="Description"
              value={formData.description}
              onChange={handleInputChange('description')}
              multiline
              rows={3}
              disabled={isSaving}
              sx={{ gridColumn: '1 / -1' }}
            />
            
            {/* Catégories */}
            <FormControl sx={{ gridColumn: '1 / -1' }}>
              <InputLabel>Catégories</InputLabel>
              <Select
                multiple
                value={formData.category}
                onChange={handleCategoryChange}
                error={!!errors.category}
                disabled={isSaving}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography variant="caption" color="error">
                  {errors.category}
                </Typography>
              )}
            </FormControl>
            
            {/* Orientation */}
            <FormControl>
              <InputLabel>Orientation</InputLabel>
              <Select
                value={formData.orientation}
                onChange={handleInputChange('orientation')}
                disabled={isSaving}
              >
                <MenuItem value="horizontal">Horizontal</MenuItem>
                <MenuItem value="vertical">Vertical</MenuItem>
              </Select>
            </FormControl>
            
            {/* Date */}
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleInputChange('date')}
              disabled={isSaving}
            />
            
            {/* Upload miniature */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography variant="subtitle2" gutterBottom>
                Miniature personnalisée (optionnel)
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  disabled={isSaving}
                >
                  Choisir une image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange('thumbnail')}
                  />
                </Button>
                {thumbnailFile && (
                  <Typography variant="body2" color="text.secondary">
                    {thumbnailFile.name}
                  </Typography>
                )}
                {formData.thumbnailUrl && !thumbnailFile && (
                  <Typography variant="body2" color="success.main">
                    ✓ Miniature existante
                  </Typography>
                )}
              </Box>
              {errors.thumbnail && (
                <Typography variant="caption" color="error">
                  {errors.thumbnail}
                </Typography>
              )}
            </Box>
            
            {/* Upload extrait vidéo */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography variant="subtitle2" gutterBottom>
                Extrait vidéo pour le survol (optionnel)
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  disabled={isSaving}
                >
                  Choisir une vidéo
                  <input
                    type="file"
                    accept="video/*"
                    hidden
                    onChange={handleFileChange('preview')}
                  />
                </Button>
                {previewClipFile && (
                  <Typography variant="body2" color="text.secondary">
                    {previewClipFile.name}
                  </Typography>
                )}
                {formData.previewClipUrl && !previewClipFile && (
                  <Typography variant="body2" color="success.main">
                    ✓ Extrait vidéo existant
                  </Typography>
                )}
              </Box>
              {errors.preview && (
                <Typography variant="caption" color="error">
                  {errors.preview}
                </Typography>
              )}
            </Box>
            
            {/* Visibilité */}
            <FormControlLabel
              control={
                <Switch
                  checked={formData.visible}
                  onChange={handleInputChange('visible')}
                  disabled={isSaving}
                />
              }
              label="Vidéo visible"
              sx={{ gridColumn: '1 / -1' }}
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} disabled={isSaving}>
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSaving}
            startIcon={isSaving ? <CircularProgress size={20} /> : null}
          >
            {isSaving ? 'Enregistrement...' : (video ? 'Mettre à jour' : 'Ajouter')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VideoForm;

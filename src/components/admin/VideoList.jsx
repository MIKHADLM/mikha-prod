import React, { useState } from 'react';
import { arrayMoveImmutable } from 'array-move';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { 
  Box, 
  Paper, 
  Typography, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  Tooltip,
  CircularProgress,
  ListItemIcon,
  Skeleton,
  Avatar,
  Chip
} from '@mui/material';
import { DragIndicator, Edit, Delete, Videocam as VideoIcon, Image as ImageIcon } from '@mui/icons-material';

const SortableItem = ({ id, video, onEdit, onDelete, isProcessing }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: 'transform 250ms cubic-bezier(0.2, 0, 0, 1)',
    touchAction: 'none',
    opacity: transform ? 0.3 : 1,
    zIndex: transform ? 9999 : 'auto',
    boxShadow: transform ? 'none' : 'none',
    scale: transform ? 1 : 1,
    position: 'relative',
  };

  const thumbnailUrl = video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
  const category = Array.isArray(video.category) ? video.category[0] : video.category;
  const isVertical = video.orientation === 'vertical';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="sortable-item-wrapper"
    >
      <ListItem
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
        bgcolor: 'background.paper',
        '&:hover': { 
          bgcolor: isProcessing ? 'action.hover' : 'action.hover',
          '& .drag-handle': {
            opacity: 1,
          }
        },
        transition: 'all 0.2s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box 
        className="drag-handle"
        {...attributes} 
        {...listeners} 
        sx={{ 
          cursor: isProcessing ? 'not-allowed' : (transform ? 'grabbing' : 'grab'),
          mr: 2, 
          display: 'flex', 
          alignItems: 'center',
          opacity: transform ? 1 : 0.5,
          transition: 'opacity 0.2s, transform 0.2s',
          transform: transform ? 'scale(1.1)' : 'scale(1)',
          '&:active': {
            cursor: isProcessing ? 'not-allowed' : 'grabbing',
          },
          '&:hover': {
            opacity: 1,
          }
        }}
      >
        <DragIndicator />
      </Box>
      
      <Box 
        sx={{ 
          width: 120, 
          height: 68, 
          minWidth: 120,
          position: 'relative',
          borderRadius: 1,
          overflow: 'hidden',
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isProcessing ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <>
            {video.previewClipUrl ? (
              <video
                src={video.previewClipUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                muted
                loop
                playsInline
              />
            ) : (
              <img 
                src={thumbnailUrl} 
                alt={video.title} 
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
                }}
              />
            )}
            {isVertical && (
              <Chip 
                label="Vertical" 
                size="small" 
                color="secondary"
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  fontSize: '0.6rem',
                  height: 20,
                }}
              />
            )}
          </>
        )}
      </Box>
      
      <Box sx={{ ml: 2, flex: '1 1 auto', minWidth: 0, pr: 1 }}>
        {isProcessing ? (
          <>
            <Skeleton width="80%" height={24} />
            <Skeleton width="60%" height={20} />
          </>
        ) : (
          <>
            <Typography 
              variant="subtitle1" 
              noWrap 
              sx={{ 
                fontWeight: 'medium',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {video.title || 'Sans titre'}
              {video.previewClipUrl && (
                <Tooltip title="Avec extrait vidéo">
                  <VideoIcon color="primary" fontSize="small" />
                </Tooltip>
              )}
              {video.thumbnailUrl && (
                <Tooltip title="Miniature personnalisée">
                  <ImageIcon color="secondary" fontSize="small" />
                </Tooltip>
              )}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Typography component="span" sx={{ 
                fontSize: '0.7rem', 
                color: 'text.secondary',
                display: 'inline-block',
                backgroundColor: 'action.hover',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                {category || 'Non catégorisé'}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                ID: {video.youtubeId}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      
      <ListItemSecondaryAction>
        {isProcessing ? (
          <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <>
            <Tooltip title="Modifier">
              <span>
                <IconButton 
                  edge="end" 
                  aria-label="modifier" 
                  onClick={() => onEdit(video)} 
                  sx={{ mr: 1 }}
                  disabled={isProcessing}
                >
                  <Edit />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Supprimer">
              <span>
                <IconButton 
                  edge="end" 
                  aria-label="supprimer" 
                  color="error" 
                  onClick={() => onDelete(video.firestoreId || video.id || video.youtubeId)}
                  disabled={isProcessing}
                >
                  <Delete />
                </IconButton>
              </span>
            </Tooltip>
          </>
        )}
      </ListItemSecondaryAction>
    </ListItem>
    </div>
  );
};

const VideoList = ({ videos, onVideosUpdate, onEdit, onDelete, loading = false }) => {
  const [localVideos, setLocalVideos] = useState(videos);
  const [processingIds, setProcessingIds] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [activeId, setActiveId] = useState(null);

  React.useEffect(() => {
    setLocalVideos(videos);
  }, [videos]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setIsDragging(true);
    setActiveId(event.active.id);
    document.body.style.cursor = 'grabbing';
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    
    setIsDragging(false);
    setActiveId(null);
    document.body.style.cursor = '';
    
    if (!over || active.id === over.id) return;
    
    try {
      setProcessingIds(prev => new Set([...prev, active.id]));
      
      const oldIndex = localVideos.findIndex(item => item.youtubeId === active.id);
      const newIndex = localVideos.findIndex(item => item.youtubeId === over.id);
      
      if (oldIndex === -1 || newIndex === -1) return;
      
      const newItems = arrayMoveImmutable(localVideos, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      
      setLocalVideos(newItems);
      await onVideosUpdate(newItems);
    } catch (error) {
      console.error('Erreur lors du réordonnancement des vidéos:', error);
      onVideosUpdate([...videos]);
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(active.id);
        return newSet;
      });
    }
  };
  
  const handleDeleteWithLoading = async (videoId) => {
    try {
      setProcessingIds(prev => new Set([...prev, videoId]));
      await onDelete(videoId);
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(videoId);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <List sx={{ p: 0 }}>
        {[1, 2, 3].map((item) => (
          <ListItem 
            key={item} 
            sx={{ 
              borderBottom: '1px solid',
              borderColor: 'divider',
              height: 100,
            }}
          >
            <Skeleton variant="rectangular" width={120} height={68} sx={{ mr: 2 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="80%" height={24} />
              <Skeleton width="60%" height={20} sx={{ mt: 1 }} />
            </Box>
          </ListItem>
        ))}
      </List>
    );
  }

  if (videos.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Aucune vidéo trouvée. Ajoutez votre première vidéo.
        </Typography>
      </Box>
    );
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      autoScroll={false}
    >
      <SortableContext 
        items={localVideos.map(video => video.youtubeId)} 
        strategy={verticalListSortingStrategy}
      >
        <List 
          sx={{ 
            p: 0, 
            width: '100%',
            position: 'relative',
            minHeight: 200,
          }}
        >
          {localVideos.map((video) => (
            <SortableItem 
              key={video.firestoreId || video.id || video.youtubeId} 
              id={video.youtubeId} 
              video={video}
              onEdit={onEdit}
              onDelete={handleDeleteWithLoading}
              isProcessing={processingIds.has(video.youtubeId)}
            />
          ))}
        </List>
      </SortableContext>
      
      <DragOverlay>
        {activeId ? (
          <div
            style={{
              width: '100%',
              transform: 'scale(1.02)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              zIndex: 9999,
              borderRadius: '8px',
              border: '2px solid rgba(25, 118, 210, 0.3)',
            }}
          >
            {(() => {
              const activeVideo = localVideos.find(v => 
                v.youtubeId === activeId || 
                v.id === activeId || 
                v.firestoreId === activeId
              );
              if (!activeVideo) return null;
              
              const thumbnailUrl = activeVideo.thumbnailUrl || `https://img.youtube.com/vi/${activeVideo.youtubeId}/mqdefault.jpg`;
              const category = Array.isArray(activeVideo.category) ? activeVideo.category[0] : activeVideo.category;
              
              return (
                <ListItem
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: '#ffffff',
                    opacity: 1,
                    '&:hover': { 
                      bgcolor: '#f5f5f5',
                      '& .drag-handle': {
                        opacity: 1,
                      }
                    },
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box 
                    className="drag-handle"
                    sx={{ 
                      cursor: 'grabbing',
                      mr: 2, 
                      display: 'flex', 
                      alignItems: 'center',
                      opacity: 1,
                    }}
                  >
                    <DragIndicator />
                  </Box>
                  <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={thumbnailUrl}
                      variant="rounded"
                      sx={{ width: 120, height: 68 }}
                    />
                  </Box>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        {activeVideo.title || 'Sans titre'}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                        <Typography component="span" sx={{ 
                          fontSize: '0.7rem', 
                          color: 'text.secondary',
                          display: 'inline-block'
                        }}>
                          {category || 'Non catégorisé'}
                        </Typography>
                        <Typography component="span" variant="caption" color="text.secondary" noWrap>
                          ID: {activeVideo.youtubeId}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              );
            })()}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default VideoList;

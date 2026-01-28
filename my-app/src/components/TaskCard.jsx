import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography, Box, Chip, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const TaskCard = ({ task, index, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 2,
            borderRadius: '16px',
            boxShadow: snapshot.isDragging 
              ? '0px 10px 20px rgba(112, 144, 176, 0.2)' 
              : '0px 4px 12px rgba(112, 144, 176, 0.08)',
            backgroundColor: '#FFFFFF',
            '&:hover': {
              boxShadow: '0px 10px 20px rgba(112, 144, 176, 0.15)',
            }
          }}
        >
          <CardContent sx={{ p: '16px !important' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: '16px', 
                  fontWeight: 700, 
                  color: '#2B3674',
                  lineHeight: 1.4
                }}
              >
                {task.title}
              </Typography>
              <IconButton 
                size="small" 
                onClick={() => onDelete(task.id)}
                sx={{ color: '#A3AED0', '&:hover': { color: '#EE5D50' } }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#A3AED0', 
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {task.description}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {task.priority && (
                <Chip 
                  label={task.priority} 
                  size="small" 
                  sx={{ 
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '12px',
                    backgroundColor: task.priority === 'High' ? '#FEEFEE' : task.priority === 'Medium' ? '#FFF9EE' : '#E8FBF5',
                    color: task.priority === 'High' ? '#EE5D50' : task.priority === 'Medium' ? '#FFB547' : '#05CD99',
                  }} 
                />
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;

import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, onDeleteTask, onAddTask }) => {
  return (
    <Box sx={{ 
      width: { xs: '100%', sm: '320px' },
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '500px'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        px: 1
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#2B3674', 
            fontWeight: 700,
            fontSize: '18px'
          }}
        >
          {column.title}
          <Typography 
            component="span" 
            sx={{ 
              ml: 1, 
              color: '#A3AED0', 
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            ({tasks.length})
          </Typography>
        </Typography>
        <IconButton 
          size="small" 
          onClick={() => onAddTask(column.id)}
          sx={{ 
            backgroundColor: '#F4F7FE', 
            color: '#4318FF',
            borderRadius: '10px',
            '&:hover': { backgroundColor: '#E0E5F2' }
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flexGrow: 1,
              minHeight: '100px',
              padding: '10px',
              borderRadius: '16px',
              transition: 'background-color 0.2s ease',
              backgroundColor: snapshot.isDraggingOver ? 'rgba(67, 24, 255, 0.05)' : 'transparent'
            }}
          >
            {tasks.map((task, index) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                index={index} 
                onDelete={onDeleteTask} 
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default Column;

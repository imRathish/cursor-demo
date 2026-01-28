import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Box
} from '@mui/material';

const AddTaskModal = ({ open, onClose, onAdd, columnId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd({
      title,
      description,
      priority,
      columnId
    });
    
    // Reset and close
    setTitle('');
    setDescription('');
    setPriority('Medium');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '20px',
          padding: '8px',
          width: '100%',
          maxWidth: '450px'
        }
      }}
    >
      <DialogTitle sx={{ color: '#2B3674', fontWeight: 700 }}>Add New Task</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} sx={{ color: '#A3AED0' }}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              backgroundColor: '#4318FF', 
              '&:hover': { backgroundColor: '#3311CC' },
              borderRadius: '12px',
              px: 4
            }}
          >
            Create Task
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTaskModal;

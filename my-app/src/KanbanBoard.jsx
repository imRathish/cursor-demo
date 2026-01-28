import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Chip,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import './KanbanBoard.css';

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Design login screen', description: 'Create wireframes and mockups', priority: 'high' },
      { id: '2', title: 'Setup authentication', description: 'Implement JWT tokens', priority: 'medium' },
    ],
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    cards: [
      { id: '3', title: 'Build API endpoints', description: 'Create RESTful APIs', priority: 'high' },
    ],
  },
  done: {
    id: 'done',
    title: 'Done',
    cards: [
      { id: '4', title: 'Setup project structure', description: 'Initialize React app', priority: 'low' },
    ],
  },
};

const priorityColors = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

const columnColors = {
  todo: '#6366f1',
  inProgress: '#8b5cf6',
  done: '#06b6d4',
};

function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedCard, setDraggedCard] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [showAddCard, setShowAddCard] = useState({});

  const handleDragStart = (cardId, columnId) => {
    setDraggedCard(cardId);
    setDraggedFromColumn(columnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId) => {
    if (!draggedCard || !draggedFromColumn) return;

    const sourceColumn = columns[draggedFromColumn];
    const targetColumn = columns[targetColumnId];
    const card = sourceColumn.cards.find((c) => c.id === draggedCard);

    if (card && draggedFromColumn !== targetColumnId) {
      setColumns((prev) => ({
        ...prev,
        [draggedFromColumn]: {
          ...prev[draggedFromColumn],
          cards: prev[draggedFromColumn].cards.filter((c) => c.id !== draggedCard),
        },
        [targetColumnId]: {
          ...prev[targetColumnId],
          cards: [...prev[targetColumnId].cards, card],
        },
      }));
    }

    setDraggedCard(null);
    setDraggedFromColumn(null);
  };

  const handleAddCard = (columnId) => {
    if (!newCardTitle.trim()) return;

    const newCard = {
      id: Date.now().toString(),
      title: newCardTitle,
      description: newCardDescription,
      priority: 'medium',
    };

    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        cards: [...prev[columnId].cards, newCard],
      },
    }));

    setNewCardTitle('');
    setNewCardDescription('');
    setShowAddCard({ ...showAddCard, [columnId]: false });
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#1e293b', letterSpacing: '-0.02em' }}>
        Kanban Board
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
        }}
      >
        {Object.values(columns).map((column) => (
          <Paper
            key={column.id}
            elevation={0}
            sx={{
              minWidth: 320,
              maxWidth: 320,
              backgroundColor: '#ffffff',
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            }}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <Box
              sx={{
                p: 2.5,
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: columnColors[column.id] ? `${columnColors[column.id]}08` : '#f8fafc',
                borderRadius: '12px 12px 0 0',
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: columnColors[column.id] || '#475569',
                  fontSize: '0.95rem',
                  letterSpacing: '0.01em',
                }}
              >
                {column.title}
              </Typography>
              <Chip
                label={column.cards.length}
                size="small"
                sx={{ 
                  backgroundColor: columnColors[column.id] ? `${columnColors[column.id]}15` : '#e2e8f0', 
                  color: columnColors[column.id] || '#64748b',
                  fontWeight: 600,
                  height: 24,
                  fontSize: '0.75rem',
                }}
              />
            </Box>
            <Box
              sx={{
                p: 2,
                flex: 1,
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                backgroundColor: '#fafbfc',
              }}
            >
              {column.cards.map((card) => (
                <Card
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card.id, column.id)}
                  sx={{
                    cursor: 'grab',
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    '&:active': {
                      cursor: 'grabbing',
                    },
                    '&:hover': {
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      borderColor: columnColors[column.id] || '#cbd5e1',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'flex-start' }}>
                      <Chip
                        label={card.priority}
                        size="small"
                        sx={{
                          backgroundColor: priorityColors[card.priority] + '15',
                          color: priorityColors[card.priority],
                          fontWeight: 600,
                          height: 22,
                          fontSize: '0.7rem',
                          textTransform: 'capitalize',
                        }}
                      />
                      <IconButton 
                        size="small" 
                        sx={{ 
                          color: '#94a3b8',
                          '&:hover': { color: '#64748b', backgroundColor: '#f1f5f9' },
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 1, 
                        fontWeight: 600, 
                        color: '#1e293b',
                        fontSize: '0.95rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#64748b',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              {showAddCard[column.id] ? (
                <Box sx={{ mt: 'auto' }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Card title"
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    placeholder="Description"
                    value={newCardDescription}
                    onChange={(e) => setNewCardDescription(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleAddCard(column.id)}
                      sx={{
                        backgroundColor: columnColors[column.id] || '#6366f1',
                        '&:hover': {
                          backgroundColor: columnColors[column.id] ? `${columnColors[column.id]}dd` : '#4f46e5',
                        },
                        textTransform: 'none',
                        fontWeight: 500,
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        setShowAddCard({ ...showAddCard, [column.id]: false });
                        setNewCardTitle('');
                        setNewCardDescription('');
                      }}
                      sx={{
                        color: '#64748b',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: '#f1f5f9',
                        },
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => setShowAddCard({ ...showAddCard, [column.id]: true })}
                  sx={{
                    mt: 'auto',
                    justifyContent: 'flex-start',
                    color: '#64748b',
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    '&:hover': {
                      backgroundColor: '#f1f5f9',
                      color: columnColors[column.id] || '#475569',
                    },
                  }}
                >
                  Add a card
                </Button>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default KanbanBoard;

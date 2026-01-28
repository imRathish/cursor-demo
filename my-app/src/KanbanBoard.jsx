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
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';
import './KanbanBoard.css';

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Design login screen', description: 'Create wireframes and mockups', priority: 'high', assignee: 'JD' },
      { id: '2', title: 'Setup authentication', description: 'Implement JWT tokens', priority: 'medium', assignee: 'SS' },
    ],
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    cards: [
      { id: '3', title: 'Build API endpoints', description: 'Create RESTful APIs', priority: 'high', assignee: 'MK' },
    ],
  },
  done: {
    id: 'done',
    title: 'Done',
    cards: [
      { id: '4', title: 'Setup project structure', description: 'Initialize React app', priority: 'low', assignee: 'AL' },
    ],
  },
};

const priorityColors = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

const priorityLabels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

const columnColors = {
  todo: { primary: '#6366f1', light: '#eef2ff', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  inProgress: { primary: '#8b5cf6', light: '#f5f3ff', gradient: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)' },
  done: { primary: '#06b6d4', light: '#ecfeff', gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)' },
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
      assignee: null,
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
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, 
      minHeight: '100vh', 
      backgroundColor: '#f5f7fa',
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
    }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 1,
            fontWeight: 800, 
            color: '#0f172a', 
            letterSpacing: '-0.03em',
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
          }}
        >
          Kanban Board
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#64748b',
            fontSize: '0.95rem',
          }}
        >
          Organize and track your tasks efficiently
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 1.5, sm: 2, md: 3 },
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#cbd5e1',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#94a3b8',
            },
          },
        }}
      >
        {Object.values(columns).map((column) => (
          <Paper
            key={column.id}
            elevation={0}
            sx={{
              minWidth: { xs: 280, sm: 320 },
              maxWidth: { xs: 280, sm: 320 },
              backgroundColor: '#ffffff',
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content',
              maxHeight: 'calc(100vh - 200px)',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              },
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
                background: columnColors[column.id]?.gradient || columnColors.todo.gradient,
                borderRadius: '16px 16px 0 0',
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#ffffff',
                  fontSize: '1rem',
                  letterSpacing: '0.01em',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                }}
              >
                {column.title}
              </Typography>
              <Chip
                label={column.cards.length}
                size="small"
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  fontWeight: 700,
                  height: 26,
                  fontSize: '0.8rem',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
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
                gap: 2,
                backgroundColor: columnColors[column.id]?.light || '#fafbfc',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#cbd5e1',
                  borderRadius: '3px',
                  '&:hover': {
                    backgroundColor: '#94a3b8',
                  },
                },
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
                    borderRadius: 3,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    position: 'relative',
                    overflow: 'visible',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      backgroundColor: priorityColors[card.priority] || priorityColors.medium,
                      borderRadius: '12px 0 0 12px',
                    },
                    '&:active': {
                      cursor: 'grabbing',
                      transform: 'rotate(2deg)',
                    },
                    '&:hover': {
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                      borderColor: columnColors[column.id]?.primary || '#cbd5e1',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'flex-start' }}>
                      <Chip
                        label={priorityLabels[card.priority] || card.priority}
                        size="small"
                        sx={{
                          backgroundColor: `${priorityColors[card.priority] || priorityColors.medium}15`,
                          color: priorityColors[card.priority] || priorityColors.medium,
                          fontWeight: 700,
                          height: 24,
                          fontSize: '0.7rem',
                          textTransform: 'capitalize',
                          border: `1px solid ${priorityColors[card.priority] || priorityColors.medium}30`,
                        }}
                      />
                      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                        {card.assignee && (
                          <Tooltip title={card.assignee}>
                            <Avatar 
                              sx={{ 
                                width: 24, 
                                height: 24, 
                                fontSize: '0.7rem',
                                backgroundColor: columnColors[column.id]?.primary || '#6366f1',
                                fontWeight: 700,
                              }}
                            >
                              {card.assignee}
                            </Avatar>
                          </Tooltip>
                        )}
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: '#94a3b8',
                            width: 28,
                            height: 28,
                            '&:hover': { 
                              color: '#64748b', 
                              backgroundColor: '#f1f5f9' 
                            },
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                      <DragIndicatorIcon 
                        sx={{ 
                          color: '#cbd5e1', 
                          fontSize: '1.2rem',
                          mt: 0.5,
                          flexShrink: 0,
                        }} 
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 1, 
                            fontWeight: 700, 
                            color: '#0f172a',
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
                            lineHeight: 1.6,
                          }}
                        >
                          {card.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
              {showAddCard[column.id] ? (
                <Box sx={{ mt: 'auto', p: 1.5, backgroundColor: '#ffffff', borderRadius: 2, border: '2px dashed #cbd5e1' }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Card title"
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    sx={{ mb: 1.5 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    placeholder="Description"
                    value={newCardDescription}
                    onChange={(e) => setNewCardDescription(e.target.value)}
                    sx={{ mb: 1.5 }}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleAddCard(column.id)}
                      sx={{
                        background: columnColors[column.id]?.gradient || columnColors.todo.gradient,
                        '&:hover': {
                          opacity: 0.9,
                          transform: 'translateY(-1px)',
                        },
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.2s ease',
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
                        fontWeight: 500,
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
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    py: 1.5,
                    borderRadius: 2,
                    border: '2px dashed #cbd5e1',
                    backgroundColor: 'transparent',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      borderColor: columnColors[column.id]?.primary || '#6366f1',
                      color: columnColors[column.id]?.primary || '#475569',
                    },
                    transition: 'all 0.2s ease',
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

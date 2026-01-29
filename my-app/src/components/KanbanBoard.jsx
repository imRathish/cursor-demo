import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  AvatarGroup,
  Breadcrumbs,
  Link,
  Paper,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CommentIcon from '@mui/icons-material/Comment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from '@mui/material/styles';

const PageContainer = styled(Box)({
  backgroundColor: '#ffffff',
  minHeight: '100vh',
  padding: 0,
});

const GradientHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6C5CE7 0%, #4834D4 50%, #2D3436 100%)',
  padding: theme.spacing(3, 4),
  color: 'white',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(2, 4),
  borderBottom: '1px solid #e0e0e0',
}));

const StyledColumn = styled(Paper)(({ theme, isDraggingOver }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  flex: 1,
  width: '100%',
  border: isDraggingOver ? '2px dashed #6C5CE7' : 'none',
  backgroundColor: isDraggingOver ? '#f0f0f0' : '#f5f5f5',
  transition: 'background-color 0.2s, border 0.2s',
}));

const ColumnHeader = styled(Box)(({ theme, headerColor }) => ({
  backgroundColor: headerColor,
  color: 'white',
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: 600,
}));

const StyledCard = styled(Card)(({ theme, isDragging }) => ({
  borderRadius: theme.spacing(1.5),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff',
  transition: 'transform 0.2s, box-shadow 0.2s, opacity 0.2s',
  opacity: isDragging ? 0.5 : 1,
  userSelect: 'none',
  WebkitUserSelect: 'none',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  cursor: 'grab',
  '&:active': {
    cursor: 'grabbing',
  },
}));

const PriorityChip = styled(Chip)(({ theme, priority }) => {
  const colors = {
    important: { bg: '#FFE5E5', color: '#D63031' },
    high: { bg: '#FFE5CC', color: '#FF6B35' },
    medium: { bg: '#FFF4E6', color: '#F39C12' },
    low: { bg: '#E0E0E0', color: '#616161' },
    'high-priority': { bg: '#D5F4E6', color: '#00B894' },
  };
  const colorScheme = colors[priority] || colors.low;
  return {
    backgroundColor: colorScheme.bg,
    color: colorScheme.color,
    fontWeight: 500,
    fontSize: '0.75rem',
    height: '24px',
    borderRadius: '12px',
  };
});

const AddTaskButton = styled(Button)(({ theme, buttonColor }) => ({
  backgroundColor: buttonColor,
  color: 'white',
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 500,
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: buttonColor,
    opacity: 0.9,
  },
}));

const KanbanBoard = () => {
  const [view, setView] = useState('column');
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState(null);
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        title: 'UI/UX Design in the age of AI',
        priority: 'important',
        assignees: ['L', 'C'],
        comments: 19,
        time: '5h',
      },
      {
        id: 2,
        title: 'Responsive Website Design for 25 more clients',
        priority: 'high',
        assignees: ['A', 'B', 'C'],
        additionalAssignees: 1,
        comments: 32,
        time: '5h',
      },
      {
        id: 3,
        title: 'Blog Copywriting (Low priority)',
        priority: 'low',
        assignees: ['E'],
        comments: 18,
        time: '9h',
      },
    ],
    inProgress: [
      {
        id: 4,
        title: 'Machine Learning Progress',
        priority: 'important',
        assignees: ['F', 'G'],
        comments: 19,
        time: '5h',
      },
      {
        id: 5,
        title: 'Learn Computer Science',
        priority: 'high',
        assignees: ['H', 'I', 'J', 'K'],
        comments: 32,
        time: '5h',
      },
    ],
    completed: [
      {
        id: 6,
        title: 'User flow confirmation for fintech App',
        priority: 'important',
        assignees: ['L', 'M'],
        comments: 19,
        time: '5h',
      },
      {
        id: 7,
        title: 'Do some usual chores',
        priority: 'high-priority',
        assignees: ['N'],
        comments: 1,
        time: '5h',
      },
      {
        id: 8,
        title: 'Write a few articles for slothful',
        priority: 'low',
        assignees: ['O'],
        comments: 987,
        time: '9h',
      },
    ],
  });

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      headerColor: '#6C5CE7',
      buttonColor: '#6C5CE7',
      tasks: tasks.todo,
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      headerColor: '#FF6B35',
      buttonColor: '#FF6B35',
      tasks: tasks.inProgress,
    },
    {
      id: 'completed',
      title: 'Completed',
      headerColor: '#00B894',
      buttonColor: '#00B894',
      tasks: tasks.completed,
    },
  ];

  const getPriorityLabel = (priority) => {
    const labels = {
      important: 'Important',
      high: 'High',
      medium: 'Medium',
      low: 'Low priority',
      'high-priority': 'High Priority',
    };
    return labels[priority] || 'Low priority';
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleDragStart = (e, task, columnId) => {
    setDraggedTask(task);
    setDraggedFromColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({ taskId: task.id, columnId }));
    // Set drag image to be the card itself
    if (e.target) {
      e.dataTransfer.setDragImage(e.target, 0, 0);
    }
  };

  const handleDragEnd = (e) => {
    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    
    if (!draggedTask || draggedFromColumn === targetColumnId) {
      return;
    }

    // Remove task from source column
    const sourceTasks = tasks[draggedFromColumn].filter((t) => t.id !== draggedTask.id);
    
    // Add task to target column
    const targetTasks = [...tasks[targetColumnId], draggedTask];

    setTasks({
      ...tasks,
      [draggedFromColumn]: sourceTasks,
      [targetColumnId]: targetTasks,
    });

    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  return (
    <PageContainer>
      <GradientHeader>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <HomeIcon sx={{ fontSize: 20 }} />
            <Breadcrumbs aria-label="breadcrumb" sx={{ '& .MuiBreadcrumbs-separator': { color: 'rgba(255,255,255,0.7)' } }}>
              <Link color="inherit" href="#" sx={{ textDecoration: 'none', color: 'rgba(255,255,255,0.9)' }}>
                Projects
              </Link>
              <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>Food Delivery</Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <NotificationsIcon sx={{ fontSize: 20, cursor: 'pointer' }} />
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.2)' }}>U</Avatar>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#4834D4',
                color: 'white',
                textTransform: 'none',
                '&:hover': { bgcolor: '#3D2E9E' },
              }}
            >
              Export Data
            </Button>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.2)' }}>SS</Avatar>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'white' }}>
              Food Delivery Project
            </Typography>
            <Chip
              label="Label"
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: '0.75rem',
                height: '24px',
              }}
            />
          </Box>
        </Box>
      </GradientHeader>

      <HeaderSection>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            aria-label="view selection"
            sx={{
              '& .MuiToggleButton-root': {
                textTransform: 'none',
                border: '1px solid #e0e0e0',
                color: '#666',
                bgcolor: '#f5f5f5',
                '&.Mui-selected': {
                  bgcolor: '#424242',
                  color: '#ffffff',
                  border: '1px solid #424242',
                  '&:hover': {
                    bgcolor: '#616161',
                  },
                },
                '&:hover': {
                  bgcolor: '#e0e0e0',
                },
              },
            }}
          >
            <ToggleButton value="grid" aria-label="grid view">
              Grid View
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              List View
            </ToggleButton>
            <ToggleButton value="column" aria-label="column view" selected>
              Column View
            </ToggleButton>
            <ToggleButton value="row" aria-label="row view">
              Row View
            </ToggleButton>
          </ToggleButtonGroup>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" sx={{ textTransform: 'none' }}>
              Filter
            </Button>
            <Button variant="outlined" sx={{ textTransform: 'none' }}>
              Sort
            </Button>
          </Box>
        </Box>
      </HeaderSection>

      <Container maxWidth={false} sx={{ padding: 3, maxWidth: '100%' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 3,
            alignItems: 'flex-start',
          }}
        >
          {columns.map((column) => (
            <StyledColumn
              key={column.id}
              isDraggingOver={draggedTask && draggedFromColumn !== column.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <ColumnHeader headerColor={column.headerColor}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                  • {column.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
                  {column.tasks.length} Total
                </Typography>
              </ColumnHeader>

              <AddTaskButton
                buttonColor={column.buttonColor}
                startIcon={<AddIcon />}
                fullWidth
                onClick={() => console.log(`Add task to ${column.title}`)}
              >
                Add New Task
              </AddTaskButton>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                {column.tasks.map((task) => (
                  <StyledCard
                    key={task.id}
                    isDragging={draggedTask?.id === task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task, column.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <CardContent sx={{ padding: '16px !important' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <PriorityChip
                          label={getPriorityLabel(task.priority)}
                          priority={task.priority}
                          size="small"
                        />
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 500, fontSize: '0.9rem', color: '#333' }}
                        >
                          {task.title}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 1,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AvatarGroup
                              max={3}
                              sx={{
                                '& .MuiAvatar-root': {
                                  width: 28,
                                  height: 28,
                                  fontSize: '0.75rem',
                                  border: '2px solid white',
                                  marginLeft: '-8px',
                                  bgcolor: '#9B7EDE',
                                  '&:first-of-type': { marginLeft: 0 },
                                },
                              }}
                            >
                              {task.assignees.map((initial, idx) => (
                                <Avatar
                                  key={idx}
                                  sx={{
                                    bgcolor: '#9B7EDE',
                                    fontSize: '0.75rem',
                                    width: 28,
                                    height: 28,
                                  }}
                                >
                                  {initial}
                                </Avatar>
                              ))}
                            </AvatarGroup>
                            {task.additionalAssignees && (
                              <Typography variant="body2" sx={{ color: '#666', fontSize: '0.75rem', ml: 0.5 }}>
                                +{task.additionalAssignees}
                              </Typography>
                            )}
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <CommentIcon sx={{ fontSize: 16, color: '#666' }} />
                              <Typography
                                variant="body2"
                                sx={{ color: '#666', fontSize: '0.875rem' }}
                              >
                                {task.comments}
                              </Typography>
                            </Box>
                            {task.time && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTimeIcon sx={{ fontSize: 16, color: '#666' }} />
                                <Typography
                                  variant="body2"
                                  sx={{ color: '#666', fontSize: '0.875rem' }}
                                >
                                  {task.time}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </StyledCard>
                ))}
              </Box>
            </StyledColumn>
          ))}
        </Box>
      </Container>
    </PageContainer>
  );
};

export default KanbanBoard;

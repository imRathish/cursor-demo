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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CommentIcon from '@mui/icons-material/Comment';
import { styled } from '@mui/material/styles';

const PageContainer = styled(Box)({
  backgroundColor: '#ffffff',
  minHeight: '100vh',
  padding: 0,
});

const HeaderSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(3, 4),
  borderBottom: '1px solid #e0e0e0',
}));

const StyledColumn = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  flex: 1,
  width: '100%',
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

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#ffffff',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  cursor: 'pointer',
}));

const PriorityChip = styled(Chip)(({ theme, priority }) => {
  const colors = {
    important: { bg: '#E8D5FF', color: '#7B2CBF' },
    high: { bg: '#FFE5CC', color: '#FF6B35' },
    low: { bg: '#E0E0E0', color: '#616161' },
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
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        title: 'UI/UX Design in the age of AI',
        priority: 'important',
        assignees: ['L', 'C'],
        comments: 15,
      },
      {
        id: 2,
        title: 'Responsive Website Design for 23 more clients',
        priority: 'high',
        assignees: ['A', 'B', 'C', 'D'],
        comments: 2,
      },
      {
        id: 3,
        title: 'Blog Copywriting (Low priority)',
        priority: 'low',
        assignees: ['E'],
        comments: 7,
      },
    ],
    inProgress: [
      {
        id: 4,
        title: 'Machine Learning Progress',
        priority: 'important',
        assignees: ['F', 'G'],
        comments: 11,
      },
      {
        id: 5,
        title: 'Learn Computer Science',
        priority: 'high',
        assignees: ['H', 'I', 'J', 'K'],
        comments: 32,
      },
    ],
    completed: [
      {
        id: 6,
        title: 'User flow confirmation for fintech App',
        priority: 'important',
        assignees: ['L', 'M'],
        comments: 11,
      },
      {
        id: 7,
        title: 'Do some usual chores',
        priority: 'high',
        assignees: ['N'],
        comments: 1,
      },
      {
        id: 8,
        title: 'Write a few articles for slothtr',
        priority: 'low',
        assignees: ['O'],
        comments: 7,
      },
    ],
  });

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      headerColor: '#9B7EDE',
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
      high: 'High priority',
      low: 'Low priority',
    };
    return labels[priority] || 'Low priority';
  };

  return (
    <PageContainer>
      <HeaderSection>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="#" sx={{ textDecoration: 'none', color: '#666' }}>
            Projects
          </Link>
          <Typography color="text.primary" sx={{ color: '#666' }}>
            FoodDelivery
          </Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#333' }}>
            Food Delivery Project
          </Typography>
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
            <StyledColumn key={column.id}>
              <ColumnHeader headerColor={column.headerColor}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                  {column.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
                  {column.tasks.length} total
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
                  <StyledCard key={task.id}>
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
                          <AvatarGroup
                            max={4}
                            sx={{
                              '& .MuiAvatar-root': {
                                width: 28,
                                height: 28,
                                fontSize: '0.75rem',
                                border: '2px solid white',
                                marginLeft: '-8px',
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
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CommentIcon sx={{ fontSize: 16, color: '#666' }} />
                            <Typography
                              variant="body2"
                              sx={{ color: '#666', fontSize: '0.875rem' }}
                            >
                              {task.comments}
                            </Typography>
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

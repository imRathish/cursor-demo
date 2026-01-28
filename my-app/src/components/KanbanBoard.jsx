import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Box, Container, Typography } from '@mui/material';
import Column from './Column';
import AddTaskModal from './AddTaskModal';

// Initial data structure
const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Research Design Trends', description: 'Analyze modern Kanban designs on Dribbble', priority: 'High' },
    'task-2': { id: 'task-2', title: 'Setup Project', description: 'Initialize React app and Material UI', priority: 'Medium' },
    'task-3': { id: 'task-3', title: 'Implement DND', description: 'Integrate react-beautiful-dnd for task movement', priority: 'Low' },
  },
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      taskIds: ['task-3'],
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['todo', 'in-progress', 'done'],
};

const KanbanBoard = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('kanban-board-data');
    return saved ? JSON.parse(saved) : initialData;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState(null);

  useEffect(() => {
    localStorage.setItem('kanban-board-data', JSON.stringify(data));
  }, [data]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setData(newState);
  };

  const handleAddTask = (columnId) => {
    setActiveColumnId(columnId);
    setModalOpen(true);
  };

  const onAddConfirm = (taskData) => {
    const newId = `task-${Date.now()}`;
    const newTask = {
      id: newId,
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
    };

    const column = data.columns[taskData.columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.unshift(newId);

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [newId]: newTask,
      },
      columns: {
        ...data.columns,
        [column.id]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    };

    setData(newState);
  };

  const handleDeleteTask = (taskId) => {
    const newTasks = { ...data.tasks };
    delete newTasks[taskId];

    const newColumns = { ...data.columns };
    Object.keys(newColumns).forEach(colId => {
      newColumns[colId].taskIds = newColumns[colId].taskIds.filter(id => id !== taskId);
    });

    setData({
      ...data,
      tasks: newTasks,
      columns: newColumns,
    });
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#F4F7FE', 
      pt: 4, 
      pb: 8 
    }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#2B3674', 
            fontWeight: 700, 
            mb: 4,
            textAlign: 'left'
          }}
        >
          Kanban Board
        </Typography>

        <DragDropContext onDragEnd={onDragEnd}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'flex-start',
            overflowX: 'auto',
            pb: 2
          }}>
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  onDeleteTask={handleDeleteTask}
                  onAddTask={handleAddTask}
                />
              );
            })}
          </Box>
        </DragDropContext>

        <AddTaskModal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          onAdd={onAddConfirm}
          columnId={activeColumnId}
        />
      </Container>
    </Box>
  );
};

export default KanbanBoard;

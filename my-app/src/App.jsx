import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import KanbanBoard from './components/KanbanBoard';

const theme = createTheme({
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: '#4318FF',
    },
    background: {
      default: '#F4F7FE',
    },
    text: {
      primary: '#2B3674',
      secondary: '#A3AED0',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <KanbanBoard />
    </ThemeProvider>
  );
}

export default App;

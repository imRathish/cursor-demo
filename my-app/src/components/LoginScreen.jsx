import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Stack,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
} from '@mui/icons-material';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      // Replace with real auth call
      console.log('Login attempt:', { email, password, rememberMe });
    }, 800);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(15, 23, 42, 0.02)',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 3,
          p: 4,
        }}
      >
        <Stack spacing={2.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '999px',
                background:
                  'conic-gradient(from 180deg at 50% 50%, #4F46E5 0deg, #22C55E 120deg, #F97316 240deg, #4F46E5 360deg)',
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, letterSpacing: 0.2 }}
            >
              Sitemark
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Sign in
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Email"
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <TextField
                fullWidth
                label="Password"
                placeholder="••••••"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 1,
                  py: 1.2,
                  borderRadius: 2,
                  background:
                    'linear-gradient(135deg, #020617 0%, #020617 50%, #111827 100%)',
                  boxShadow:
                    '0 10px 15px -3px rgba(15,23,42,0.35), 0 4px 6px -4px rgba(15,23,42,0.4)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #020617 0%, #020617 50%, #020617 100%)',
                  },
                }}
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Link href="#" variant="body2">
                  Forgot your password?
                </Link>
              </Box>

              <Divider>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{
                  py: 1.1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Sign in with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                sx={{
                  py: 1.1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Sign in with Facebook
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {"Don't have an account? "}
                  <Link href="#" variant="body2">
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default LoginScreen;

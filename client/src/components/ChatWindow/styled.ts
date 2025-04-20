import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: '1rem',
  color: theme.palette.mode === 'dark' ? 'white' : 'black',
}));

export const Message = styled('div')({
  fontSize: '1.25rem',
  minHeight: '2rem',
});

export const Input = styled('input')({
  padding: '0.5rem',
  fontSize: '1rem',
  width: '80%',
  maxWidth: '500px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginBottom: '1rem',
});

export const Button = styled('button')({
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#1976d2',
  color: 'white',
  cursor: 'pointer',
  marginTop: '0.5rem',
  transition: 'background-color 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: '#1565c0',
  },

  '&:disabled': {
    backgroundColor: '#90caf9',
    cursor: 'not-allowed',
  },
});

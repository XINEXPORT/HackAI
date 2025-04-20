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

import { Snackbar, Alert } from '@mui/material';

interface Props {
  open?: boolean;
  autoHideDuration?: number;
  onClose?: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
  content?: string;
  vertical?: 'top' | 'bottom';
  horizontal?: 'right' | 'center' | 'left';
}
export default function SnackbarCustomize({
  open,
  autoHideDuration = 1000,
  onClose = () => {},
  type,
  content = 'This is an success message!',
  vertical = 'bottom',
  horizontal = 'left',
}: Props) {
  if (type === 'error') {
    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
      >
        <Alert
          onClose={onClose}
          severity="error"
          sx={{ width: '100%', fontSize: '1.4rem' }}
        >
          {content}
        </Alert>
      </Snackbar>
    );
  }

  if (type === 'warning') {
    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
      >
        <Alert
          onClose={onClose}
          severity="warning"
          sx={{ width: '100%', fontSize: '1.4rem' }}
        >
          {content}
        </Alert>
      </Snackbar>
    );
  }

  if (type === 'info') {
    return (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
      >
        <Alert
          onClose={onClose}
          severity="info"
          sx={{ width: '100%', fontSize: '1.4rem' }}
        >
          {content}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity="success"
        sx={{ width: '100%', fontSize: '1.4rem' }}
      >
        {content}
      </Alert>
    </Snackbar>
  );
}

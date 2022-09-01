export interface SnackbarGlobal {
  status: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

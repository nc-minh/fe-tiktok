import { Dialog } from '@mui/material';

export interface Props {
  open?: boolean;
  onClose?: () => void;
  children?: JSX.Element;
}

function DialogCustomize({
  onClose = () => {},
  open = false,
  children,
}: Props) {
  console.log(open);

  return (
    <Dialog onClose={onClose} open={open}>
      {children}
    </Dialog>
  );
}

export default DialogCustomize;

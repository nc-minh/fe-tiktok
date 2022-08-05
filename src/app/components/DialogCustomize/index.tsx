import { Dialog } from '@mui/material';
import classNames from 'classnames/bind';

import styles from './DialogCustomize.module.scss';

const cx = classNames.bind(styles);

export interface Props {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

function DialogCustomize({
  onClose = () => {},
  open = false,
  children,
}: Props) {
  return (
    <Dialog classes={{ paper: cx('paper') }} onClose={onClose} open={open}>
      {children}
    </Dialog>
  );
}

export default DialogCustomize;

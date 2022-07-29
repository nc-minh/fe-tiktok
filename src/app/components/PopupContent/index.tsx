import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './PopupContent.module.scss';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

const cx = classNames.bind(styles);

interface Props {
  onClose?: () => void;
  footerContent?: string;
  linkContent?: string;
  linkTo?: string;
  onClick?: () => void;
  link?: boolean;
  children?: JSX.Element;
}

function PopupContent({
  onClose = () => {},
  footerContent,
  linkContent,
  linkTo = '/',
  onClick = () => {},
  link = false,
  children,
}: Props) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('close')}>
        <CloseIcon className={cx('closeIcon')} onClick={onClose} />
      </div>
      <div className={cx('content')}>
        <div className={cx('container')}>{children}</div>
        <div className={cx('footer')}>
          <span>{footerContent}</span>
          {link ? (
            <Link className={cx('link')} to={linkTo}>
              {linkContent}
            </Link>
          ) : (
            <span onClick={onClick} className={cx('link')}>
              {linkContent}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopupContent;

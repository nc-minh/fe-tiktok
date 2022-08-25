import classNames from 'classnames/bind';
import { memo } from 'react';

import styles from './PopupBackorContinue.module.scss';

const cx = classNames.bind(styles);

interface Props {
  onDiscard?: () => void;
  onClosePopup?: () => void;
  title?: string;
  desc?: string;
  okBtn?: string;
  cancelBtn?: string;
}
function PopupBackorContinue({
  onDiscard = () => {},
  onClosePopup = () => {},
  title = 'Clear this?',
  desc = 'This is a description',
  okBtn = 'OK',
  cancelBtn = 'Cancel',
}: Props) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('titleWrapper')}>
          <h5 className={cx('title')}>{title}</h5>
          <div className={cx('desc')}>{desc}</div>
        </div>
        <div className={cx('replace')} onClick={onDiscard}>
          {okBtn}
        </div>
        <div className={cx('editing')} onClick={onClosePopup}>
          {cancelBtn}
        </div>
      </div>
    </div>
  );
}

export default memo(PopupBackorContinue);

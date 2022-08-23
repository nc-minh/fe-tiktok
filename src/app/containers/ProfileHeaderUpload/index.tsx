/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './ProfileHeaderUpload.module.scss';
import Image from 'app/components/Image';
import Button from 'app/components/Button';
import { useUpdateAvatar } from 'mutations/user';
import { reloadAvatarActions } from './slice';

const cx = classNames.bind(styles);

interface Props {
  file: Blob;
  refetchInfoLogin?: () => void;
  handleBackToEditUser?: () => void;
}
function ProfileHeaderUpload({
  file,
  refetchInfoLogin = () => {},
  handleBackToEditUser = () => {},
}: Props) {
  const dispath = useDispatch();
  const updateAvatar = useUpdateAvatar();
  const [avatarpre, setAvatarpre] = useState('');

  const handleUpdateAvatar = useCallback(() => {
    const formData = new FormData();
    formData.append('avatar', file);

    updateAvatar.mutate(formData, {
      onSuccess(data) {
        dispath(reloadAvatarActions.reloadAvatar(true));
        refetchInfoLogin();
        handleBackToEditUser();
      },
      onError(error) {},
    });
  }, [file]);

  useEffect(() => {
    if (file) {
      const value = URL.createObjectURL(file);
      setAvatarpre(value);
    }
  }, [file]);

  useEffect(() => {
    return () => {
      avatarpre && URL.revokeObjectURL(avatarpre);
    };
  }, [avatarpre, setAvatarpre]);

  return (
    <section className={cx('content')}>
      <div className={cx('imgWrapper')}>
        <Image className={cx('img')} src={avatarpre} />
      </div>
      <footer className={cx('footerAvatar')}>
        <Button className={cx('btn')} box onClick={handleBackToEditUser}>
          Cancel
        </Button>
        <Button
          className={cx('btn')}
          primary
          onClick={handleUpdateAvatar}
          loading={updateAvatar.isLoading}
        >
          Apply
        </Button>
      </footer>
    </section>
  );
}

export default ProfileHeaderUpload;

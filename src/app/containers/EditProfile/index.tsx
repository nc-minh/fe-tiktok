/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useCallback, memo, useState } from 'react';

import styles from './EditProfile.module.scss';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import Image from 'app/components/Image';
import { ReactComponent as EditIcon } from 'assets/icons/edit-1.svg';
import Button from 'app/components/Button';
import { useUpdateUser } from 'mutations/user';
import ProfileHeaderUpload from '../ProfileHeaderUpload';
import { ReactComponent as BackIcon } from 'assets/icons/arrowLeft.svg';
import { globalStateActions } from 'app/layouts/slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores';
import { useTranslation } from 'react-i18next';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .lowercase()
    .trim()
    .min(5, 'Include at least 5 characters in your username')
    .max(24, 'Maximum 24 characters')
    .required('Username is required field'),
  fullname: Yup.string()
    .trim()
    .max(30, 'Maximum 30 characters')
    .required('Password is required field'),
  bio: Yup.string().trim().max(80, 'Maximum 80 characters'),
});

const cx = classNames.bind(styles);

interface Props {
  handleOnCloseEditPopup?: () => void;
  refetchInfoLogin?: () => void;
}

function EditProfile({
  handleOnCloseEditPopup = () => {},
  refetchInfoLogin = () => {},
}: Props) {
  const { t } = useTranslation();
  const userLogin: any = useSelector(
    (state: RootState) => state.globalState.user,
  );
  const { avatar, username, fullname, bio } = userLogin;
  const [usernamePre, setUsernamePre] = useState(() => {
    return username;
  });
  const [fullnamePre, setFullnamePre] = useState(() => {
    return fullname;
  });
  const [bioPre, setBioPre] = useState(() => {
    return bio;
  });
  const updateUser = useUpdateUser();
  const dispath = useDispatch();

  const handleChangeUsernamePre = useCallback(
    (e: any) => {
      setUsernamePre(e.target.value);
    },
    [usernamePre, setUsernamePre],
  );
  const handleChangeFullnamePre = useCallback(
    (e: any) => {
      setFullnamePre(e.target.value);
    },
    [fullnamePre, setFullnamePre],
  );
  const handleChangeBioPre = useCallback(
    (e: any) => {
      setBioPre(e.target.value);
    },
    [bioPre, setBioPre],
  );
  const [avatarFile, setAvatarFile] = useState();

  const chooseAvatarFile = useCallback(
    (e: any) => {
      const file = e.target.files[0];
      if (file) setAvatarFile(file);
    },
    [avatarFile, setAvatarFile],
  );

  const handleBackToEditUser = useCallback(() => {
    setAvatarFile(undefined);
  }, [avatarFile, setAvatarFile]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <header className={cx('header')}>
          {avatarFile ? (
            <div className={cx('editAvatar')}>
              <BackIcon onClick={handleBackToEditUser} className={cx('icon')} />
              <h3>{t('text.Editphoto')}</h3>
            </div>
          ) : (
            <h3>{t('btn.editProfile')}</h3>
          )}

          <CloseIcon
            className={cx('closeIcon')}
            onClick={handleOnCloseEditPopup}
          />
        </header>
        {avatarFile ? (
          <ProfileHeaderUpload
            refetchInfoLogin={refetchInfoLogin}
            file={avatarFile}
            handleBackToEditUser={handleBackToEditUser}
          />
        ) : (
          <section className={cx('content')}>
            <div className={cx('avatar')}>
              <div className={cx('title')}>{t('text.profilePhoto')}</div>
              <div className={cx('avatarShow')}>
                <Image className={cx('avatarUrl')} src={avatar} />
                <input
                  className={cx('input')}
                  id="avatar"
                  type="file"
                  accept="image/png, image/gif, image/jpeg, image/jpg"
                  onChange={chooseAvatarFile}
                />
                <label className={cx('lable')} htmlFor="avatar">
                  <EditIcon />
                </label>
              </div>
            </div>
            <Formik
              initialValues={{
                username: String(username),
                fullname: String(fullname),
                bio: String(bio),
              }}
              validationSchema={SignupSchema}
              onSubmit={values => {
                updateUser.mutate(values, {
                  onSuccess: async data => {
                    dispath(globalStateActions.getUser(data));
                    handleOnCloseEditPopup();
                    refetchInfoLogin();
                    dispath(globalStateActions.getRefetch(true));
                  },
                  onError: async (err: any) => {},
                });
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                /* and other goodies */
              }) => (
                <form className={cx('form')} onSubmit={handleSubmit}>
                  <div className={cx('formItem')}>
                    <div className={cx('title')}>{t('text.username')}</div>
                    <div className={cx('editProfile')}>
                      <input
                        autoComplete="off"
                        className={cx('input')}
                        type="username"
                        name="username"
                        onChange={e => {
                          handleChange(e);
                          handleChangeUsernamePre(e);
                        }}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder="Username"
                      />
                      {errors.username && touched.username && (
                        <p className={cx('error')}>{errors.username}</p>
                      )}
                      <p className={cx('link')}>
                        www.tiktok.com/@{usernamePre}
                      </p>
                      <p className={cx('tip')}>{t('text.tipEditUsername')}</p>
                    </div>
                  </div>

                  <div className={cx('formItem')}>
                    <div className={cx('title')}>{t('text.name')}</div>
                    <div className={cx('editProfile')}>
                      <input
                        autoComplete="off"
                        className={cx('input')}
                        type="fullname"
                        name="fullname"
                        onChange={e => {
                          handleChange(e);
                          handleChangeFullnamePre(e);
                        }}
                        onBlur={handleBlur}
                        value={values.fullname}
                        placeholder="Fullname"
                      />
                      {errors.fullname && touched.fullname && (
                        <p className={cx('error')}>{errors.fullname}</p>
                      )}
                    </div>
                  </div>

                  <div className={cx('formItem', 'formItemBio')}>
                    <div className={cx('title')}>{t('text.bio')}</div>
                    <div className={cx('editProfile')}>
                      <textarea
                        autoComplete="off"
                        className={cx('input', 'bio')}
                        name="bio"
                        onChange={e => {
                          handleChange(e);
                          handleChangeBioPre(e);
                        }}
                        onBlur={handleBlur}
                        value={values.bio}
                        placeholder={t('text.bio')}
                      />
                      {errors.bio && touched.bio && (
                        <p className={cx('error')}>{errors.bio}</p>
                      )}
                    </div>
                  </div>

                  <footer className={cx('formFooter')}>
                    <Button
                      className={cx('btn')}
                      box
                      onClick={handleOnCloseEditPopup}
                    >
                      {t('btn.cancel')}
                    </Button>
                    <Button
                      disabled={fullnamePre === fullname && bioPre === bio}
                      className={cx('btn')}
                      primary
                      type="submit"
                      loading={updateUser.isLoading}
                    >
                      {t('btn.save')}
                    </Button>
                  </footer>
                </form>
              )}
            </Formik>
          </section>
        )}
      </div>
    </div>
  );
}

export default memo(EditProfile);

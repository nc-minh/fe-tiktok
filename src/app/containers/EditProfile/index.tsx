/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';
import { Formik } from 'formik';
import * as Yup from 'yup';

import styles from './EditProfile.module.scss';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import Image from 'app/components/Image';
import { getUserData, setUserData } from 'utils/storage';
import { ReactComponent as EditIcon } from 'assets/icons/edit-1.svg';
import Button from 'app/components/Button';
import { useCallback, useState } from 'react';
import { useUpdateUser } from 'mutations/user';
import ProfileHeaderUpload from '../ProfileHeaderUpload';
import { ReactComponent as BackIcon } from 'assets/icons/arrowLeft.svg';

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
  const { avatar, username, fullname, bio } = getUserData();
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
    (selectorFiles: any) => {
      if (selectorFiles) setAvatarFile(selectorFiles[0]);
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
              <h3>Edit photo</h3>
            </div>
          ) : (
            <h3>Edit profile</h3>
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
              <div className={cx('title')}>Profile photo</div>
              <div className={cx('avatarShow')}>
                <Image className={cx('avatarUrl')} src={avatar} />
                <input
                  className={cx('input')}
                  id="avatar"
                  type="file"
                  accept="image/png, image/gif, image/jpeg, image/jpg"
                  onChange={e => chooseAvatarFile(e.target.files)}
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
                    setUserData(data);
                    handleOnCloseEditPopup();
                    refetchInfoLogin();
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
                    <div className={cx('title')}>Username</div>
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
                      <p className={cx('tip')}>
                        Usernames can only contain letters, numbers,
                        underscores, and periods. Changing your username will
                        also change your profile link.
                      </p>
                    </div>
                  </div>

                  <div className={cx('formItem')}>
                    <div className={cx('title')}>Name</div>
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
                    <div className={cx('title')}>Bio</div>
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
                        placeholder="Bio"
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
                      Cancel
                    </Button>
                    <Button
                      disabled={fullnamePre === fullname && bioPre === bio}
                      className={cx('btn')}
                      primary
                      type="submit"
                      loading={updateUser.isLoading}
                    >
                      Save
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

export default EditProfile;

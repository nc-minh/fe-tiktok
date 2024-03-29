import { Formik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import { Typography } from '@mui/material';
import { useCallback, useState, memo } from 'react';

import styles from './SignupForm.module.scss';
import Button from 'app/components/Button';
import { SignupDataType, TokensType } from 'types/Auth';
import { useSignup, useLogin } from 'mutations/auth';
import { setTokens } from 'utils/storage';
import { ResponseError } from 'types/Error';
import { globalStateActions } from 'app/layouts/slice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .lowercase()
    .trim()
    .min(5, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Username is required field'),
  password: Yup.string()
    .trim()
    .min(5, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Password is required field'),
  retype_password: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), null], 'Password must match')
    .required('retype password is required field'),
  fullname: Yup.string().trim().required('Fullname is required field'),
});

function SignupForm() {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState<ResponseError>();
  const signup = useSignup();
  const login = useLogin();
  const dispath = useDispatch();

  const handleOnSubmit = useCallback((values: SignupDataType) => {
    signup.mutate(values, {
      onSuccess: async res => {
        dispath(globalStateActions.getUser(res));
        const username = values.username;
        const password = values.password;

        await login.mutateAsync(
          {
            username,
            password,
          },
          {
            onSuccess: async (tokens: TokensType) => {
              setTokens(tokens.tokens);
              window.location.replace('/');
            },
          },
        );
      },
      onError: async (err: any) => {
        setServerError(err);
      },
    });
  }, []);

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>{t('text.signup')}</h2>
      <Formik
        initialValues={{
          username: '',
          password: '',
          fullname: '',
          retype_password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
          const { retype_password, ...val } = values;

          handleOnSubmit(val);
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
            <input
              autoComplete="off"
              className={cx('input')}
              type="username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              placeholder={t('placeholder.username')}
            />
            {errors.username && (
                <Typography className={cx('error')}>
                  {touched.username}
                </Typography>
              ) && (
                <Typography className={cx('error')}>
                  {errors.username}
                </Typography>
              )}

            <input
              autoComplete="off"
              className={cx('input')}
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder={t('placeholder.password')}
            />

            {errors.password && (
                <Typography className={cx('error')}>
                  {touched.password}
                </Typography>
              ) && (
                <Typography className={cx('error')}>
                  {errors.password}
                </Typography>
              )}
            <input
              autoComplete="off"
              className={cx('input')}
              type="password"
              name="retype_password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.retype_password}
              placeholder={t('placeholder.retypePassword')}
            />

            {errors.retype_password && (
                <Typography className={cx('error')}>
                  {touched.retype_password}
                </Typography>
              ) && (
                <Typography className={cx('error')}>
                  {errors.retype_password}
                </Typography>
              )}
            <input
              autoComplete="off"
              className={cx('input')}
              type="fullname"
              name="fullname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullname}
              placeholder={t('placeholder.fullname')}
            />
            {errors.fullname && (
                <Typography className={cx('error')}>
                  {touched.fullname}
                </Typography>
              ) && (
                <Typography className={cx('error')}>
                  {errors.fullname}
                </Typography>
              )}
            {serverError?.message !== '' && (
              <Typography className={cx('responseError')}>
                {serverError?.message}
              </Typography>
            )}
            <Button
              loading={signup.isLoading}
              className={cx('btn')}
              outline
              type="submit"
            >
              {t('text.signup')}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default memo(SignupForm);

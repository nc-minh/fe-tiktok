import { Formik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import { Typography } from '@mui/material';
import { useCallback, useState, memo } from 'react';

import styles from './LoginForm.module.scss';
import Button from 'app/components/Button';
import { LoginType, TokensType } from 'types/Auth';
import { useLogin } from 'mutations/auth';
import { setTokens } from 'utils/storage';
import { ResponseError } from 'types/Error';
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
});

function LoginForm() {
  const { t } = useTranslation();
  const [serverError, setServerError] = useState<ResponseError>();
  const login = useLogin();

  const handleOnSubmit = useCallback((values: LoginType) => {
    login.mutate(values, {
      onSuccess: async (res: TokensType) => {
        setTokens(res?.tokens);
        window.location.replace('/');
      },
      onError: async (err: any) => {
        setServerError(err);
      },
    });
  }, []);

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>{t('text.login')}</h2>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          handleOnSubmit(values);
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

            {serverError?.message !== '' && (
              <Typography className={cx('responseError')}>
                {serverError?.message}
              </Typography>
            )}
            <Button
              loading={login.isLoading || login.isLoading}
              className={cx('btn')}
              outline
              type="submit"
            >
              {t('text.login')}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default memo(LoginForm);

import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { publicRoutes } from 'app/routes';
import DefaultLayout from './DefaultLayout';
import DialogCustomize from 'app/components/DialogCustomize';
import PopupContent from 'app/components/PopupContent';
import PopupLogin from 'app/containers/PopupLogin';
import PopupSignup from 'app/containers/PopupSignup';
import { RootState } from 'stores';
import { detectLoginActions } from 'app/components/ProfileHeaderBase/slice';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserInfo } from 'queries/users';
import { getTokens } from 'utils/storage';
import { globalStateActions } from './slice';
import githubIcon from 'assets/icons/socialNetwork/github-logo.png';
import SnackbarCustomize from 'app/components/SnackbarCustomize';

function RootLayout() {
  const dispath = useDispatch();

  const [tabLogin, setTabLogin] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<any>('info');

  const tokens = getTokens();

  const detectLogin: any = useSelector(
    (state: RootState) => state.detectLogin.detectLogin,
  );

  const refetchState: any = useSelector(
    (state: RootState) => state.globalState.refetch,
  );

  const snackbarGlobal: any = useSelector(
    (state: RootState) => state.globalState.snackbarGlobal,
  );

  const handleOnCloseDialog = useCallback(() => {
    setIsLogin(false);
    setTabLogin(true);
    dispath(detectLoginActions.detectLogin(false));
  }, [setIsLogin, isLogin, detectLogin]);

  const handleSwitchLoginTab = useCallback(() => {
    setTabLogin(!tabLogin);
  }, [tabLogin, setTabLogin]);

  const { data: GetUserInfoLogin, refetch } = useGetUserInfo(
    tokens?.accessToken ? true : false,
  );

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, [openSnackbar, setOpenSnackbar]);

  useEffect(() => {
    if (GetUserInfoLogin) {
      dispath(globalStateActions.getUser(GetUserInfoLogin));
      setSnackbarMessage('success');
    }
  }, [GetUserInfoLogin]);

  useEffect(() => {
    if (detectLogin) {
      setIsLogin(true);
    }
  }, [detectLogin]);

  useEffect(() => {
    if (refetchState) {
      refetch();
      dispath(globalStateActions.getRefetch(false));
    }
  }, [refetchState]);

  useEffect(() => {
    if (snackbarGlobal?.status) {
      setSnackbarMessage(snackbarGlobal?.message);
      setOpenSnackbar(true);
      setSnackbarType(snackbarGlobal?.type);
    }
  }, [snackbarGlobal]);

  if (isMobile) {
    return (
      <>
        <strong
          style={{
            textAlign: 'center',
            width: '100%',
            display: 'block',
            marginTop: '120px',
          }}
        >
          This content is available only on PC
        </strong>
        <div
          style={{
            width: '56px',
            height: '56px',
            margin: 'auto',
            marginTop: '24px',
          }}
        >
          <a
            style={{ width: '100%', height: '100%' }}
            href="https://github.com/nc-minh"
          >
            <img
              style={{ width: '100%', height: '100%' }}
              src={githubIcon}
              alt="github"
            />
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const PageComponent = route.component;

            let Layout: any = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <PageComponent />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
      <DialogCustomize open={isLogin} onClose={handleOnCloseDialog}>
        <PopupContent
          onClose={handleOnCloseDialog}
          footerContent={
            tabLogin ? "Don't have an account?" : 'Already have an account?'
          }
          linkContent={tabLogin ? 'Sign up' : 'Log in'}
          onClick={handleSwitchLoginTab}
        >
          {tabLogin ? <PopupLogin /> : <PopupSignup />}
        </PopupContent>
      </DialogCustomize>
      {/* SnackbarCustomize */}
      <SnackbarCustomize
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        content={snackbarMessage}
        type={snackbarType}
      />
    </>
  );
}

export default memo(RootLayout);

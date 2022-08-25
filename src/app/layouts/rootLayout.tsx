/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { publicRoutes } from 'app/routes';
import DefaultLayout from './DefaultLayout';
import DialogCustomize from 'app/components/DialogCustomize';
import PopupContent from 'app/components/PopupContent';
import PopupLogin from 'app/containers/PopupLogin';
import PopupSignup from 'app/containers/PopupSignup';
import { RootState } from 'stores';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { detectLoginActions } from 'app/components/ProfileHeaderBase/slice';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserInfo } from 'queries/users';
import { getTokens } from 'utils/storage';

function RootLayout() {
  const dispath = useDispatch();

  const [tabLogin, setTabLogin] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const tokens = getTokens();

  console.log('tokens', tokens);

  const handleOnCloseDialog = useCallback(() => {
    setIsLogin(false);
    setTabLogin(true);
  }, [setIsLogin, isLogin]);

  const handleSwitchLoginTab = useCallback(() => {
    setTabLogin(!tabLogin);
  }, [tabLogin, setTabLogin]);

  const detectLogin: any = useSelector(
    (state: RootState) => state.detectLogin.detectLogin,
  );

  const { data: GetUserInfoLogin } = useGetUserInfo(
    tokens?.accessToken ? true : false,
  );

  useEffect(() => {
    if (GetUserInfoLogin) {
      console.log('GetUserInfoLogin', GetUserInfoLogin);
      dispath(detectLoginActions.detectLogin(false));
    }
  }, [GetUserInfoLogin]);

  useEffect(() => {
    if (detectLogin) {
      setIsLogin(true);
    }
  }, [detectLogin]);

  console.log('okok', 'realod');

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
    </>
  );
}

export default memo(RootLayout);

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
import { detectLoginActions } from 'app/components/ProfileHeaderBase/slice';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserInfo } from 'queries/users';
import { getTokens } from 'utils/storage';
import { userActions } from './slice';

function RootLayout() {
  const dispath = useDispatch();

  const [tabLogin, setTabLogin] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const tokens = getTokens();

  const detectLogin: any = useSelector(
    (state: RootState) => state.detectLogin.detectLogin,
  );

  const refetchState: any = useSelector(
    (state: RootState) => state.getUser.refetch,
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

  useEffect(() => {
    if (GetUserInfoLogin) {
      console.log('GetUserInfoLogin', GetUserInfoLogin);
      dispath(userActions.getUser(GetUserInfoLogin));
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
      dispath(userActions.getRefetch(false));
    }
  }, [refetchState]);

  console.log('root layout', 'realod');

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

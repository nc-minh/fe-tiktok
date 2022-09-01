import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultMobileLayout from './layouts/DefaultMobileLayout';
import { publicMobileRoutes } from './routes/routes';

function MobileLayout() {
  return (
    <>
      <div className="App">
        <Routes>
          {publicMobileRoutes.map((route, index) => {
            const PageComponent = route.component;

            let Layout: any = DefaultMobileLayout;

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
    </>
  );
}

export default MobileLayout;

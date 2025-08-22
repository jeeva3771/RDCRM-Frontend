import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from "../routes";

const AppContent = () => {
  // Safety check: ensure routes is an array
  const routesArray = Array.isArray(routes) ? routes : [];
  
  if (!Array.isArray(routes)) {
    console.warn('Routes is not an array:', routes);
  }

  return (
    <>
      {/* <Suspense fallback={<CSpinner color="primary" />}> */}
      <Routes>
        {routesArray.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.element />}
              />
            )
          );
        })}
        {/* <Route path="/" element={<Navigate to="dashboard" replace />} /> */}
      </Routes>
      {/* </Suspense> */}
    </>
  );
};

export default React.memo(AppContent);
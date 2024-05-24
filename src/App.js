import { Suspense, lazy } from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { routes } from "./routes/routes";
import SuspenseLoader from './components/common/SuspenseLoader';
import DataProvider from './context/DataProvider';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

const ErrorComponent = lazy(() => import('./components/common/ErrorComponent'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Navigate to='/signup'/>}/>
       {/* <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} /> */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
     
      <Route path={routes.main.path} element={<routes.main.element />} >
        <Route path={`${routes.emails.path}/:type`} element={<routes.emails.element />} errorElement={<ErrorComponent />} />
        <Route path={routes.view.path} element={<routes.view.element />} errorElement={<ErrorComponent />} />
      </Route>
      <Route path={routes.invalid.path} element={<Navigate to={`${routes.emails.path}
      `} />} />
    </Route>
  )
)

function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </Suspense>
  );
}

export default App;

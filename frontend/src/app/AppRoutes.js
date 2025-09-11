import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const About = lazy(() => import('./pages/About'));
// Services
const TrainingCourses = lazy(() => import('./services/TrainingCourses'));
const RemoteServices = lazy(() => import('./services/RemoteServices'));
// Products
const WatanTopup = lazy(() => import('./products/WatanTopup'));
const ProductCourses = lazy(() => import('./products/ProductCourses'));
const GlobalSaaS = lazy(() => import('./products/GlobalSaaS'));


class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          {/* Root as dashboard/home */}
          <Route exact path="/" component={ Dashboard } />
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route path="/services/training" component={ TrainingCourses } />
          <Route path="/services/remote" component={ RemoteServices } />
          <Route path="/products/watan" component={ WatanTopup } />
          <Route path="/products/courses" component={ ProductCourses } />
          <Route path="/products/global-saas" component={ GlobalSaaS } />
          <Route path="/about" component={ About } />


          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
import React from 'react';
import { Trans } from 'react-i18next';

const TrainingCourses = () => (
  <div className="content-wrapper">
    <div className="row">
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-4"><Trans>Training Courses</Trans></h3>
            <p className="text-muted"><Trans>Sample training course showcase using existing theme styles.</Trans></p>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="border rounded p-3 h-100">
                  <h5 className="text-primary mb-2"><Trans>React Basics</Trans></h5>
                  <p className="small mb-2"><Trans>Introduction to components, props, and state.</Trans></p>
                  <span className="badge badge-info"><Trans>Beginner</Trans></span>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="border rounded p-3 h-100">
                  <h5 className="text-primary mb-2"><Trans>Django API</Trans></h5>
                  <p className="small mb-2"><Trans>Building REST endpoints and serializers.</Trans></p>
                  <span className="badge badge-success"><Trans>Intermediate</Trans></span>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="border rounded p-3 h-100">
                  <h5 className="text-primary mb-2"><Trans>Fullstack Deployment</Trans></h5>
                  <p className="small mb-2"><Trans>CI/CD and production considerations.</Trans></p>
                  <span className="badge badge-warning"><Trans>Advanced</Trans></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TrainingCourses;

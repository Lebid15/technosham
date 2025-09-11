import React from 'react';
import { Trans } from 'react-i18next';

const RemoteServices = () => (
  <div className="content-wrapper">
    <div className="row">
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-4"><Trans>Remote Services</Trans></h3>
            <p className="text-muted"><Trans>Examples of remote assistance offerings.</Trans></p>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="border rounded p-3 h-100">
                  <h5 className="text-primary mb-2"><Trans>Cloud Setup</Trans></h5>
                  <p className="small mb-0"><Trans>Provision and optimize cloud infrastructure.</Trans></p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="border rounded p-3 h-100">
                  <h5 className="text-primary mb-2"><Trans>Performance Audit</Trans></h5>
                  <p className="small mb-0"><Trans>Analyze and enhance application speed.</Trans></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RemoteServices;

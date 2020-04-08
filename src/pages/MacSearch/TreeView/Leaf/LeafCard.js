import 'patternfly/dist/css/patternfly-additions.min.css';
import 'patternfly/dist/css/patternfly.min.css';
import '../tree.css';
import swIcon from './sw-icon.png';
import React from 'react';
import { history } from '../../../../modules/history';

import { getUserRoles } from '../../../../state/utils';
export const LeafCard = ({ value, handleCheckVisible }) => {
  const { id, name, model, ip, is_visible } = value;
  return (
    <>
      <div className="list-group-item">
        <div className="list-group-item-header">
          {getUserRoles().includes('administrator')  && (
            <div className="list-view-pf-checkbox recenter-icon">
              <input
                type="checkbox"
                checked={is_visible}
                onChange={(e) => {
                  console.log(value);
                  handleCheckVisible({ ...value, is_visible: !is_visible})}}
              />
            </div>
          )}
          <div className="list-view-pf-actions recenter-icon">
            <span
              onClick={(e) => handleFindBySwitch(id, e)}
              className="pficon pficon-search search-mac-icon"
            ></span>
          </div>
          <div className="list-view-pf-main-info">
            <div className="list-view-pf-left">
              <span className="fa list-view-pf-icon-sm">
                <img src={swIcon} alt="switch-icon" />
              </span>
            </div>
            <div className="list-view-pf-body">
              <div className="list-view-pf-description">
                <div className="list-group-item-heading">
                  <a href="/switches/hayQueVer">{name}</a>
                </div>
              </div>
              <div className="list-view-pf-additional-info">
                <div className="list-view-pf-additional-info-item expand-all-row">
                  <span className="pficon pficon-cluster"></span>
                  <strong>Ip: </strong> {ip}
                </div>
                <div className="list-view-pf-additional-info-item expand-all-row">
                  <span className="pficon pficon-screen"></span>
                  <strong>Model: </strong> {model}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item-container container-fluid hidden"></div>
      </div>
    </>
  );
};

const handleFindBySwitch = (id) => {
  history.push(`/macSearch/findbymac/${id}?type=switch`);
};

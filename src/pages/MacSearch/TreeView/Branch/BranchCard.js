import 'patternfly/dist/css/patternfly-additions.min.css';
import 'patternfly/dist/css/patternfly.min.css';
import '../tree.css';

import React from 'react';

export const BranchCard = ({ value }) => {
  const { name, isOpen, branches } = value;

  const countChildSwitches = () => {
    let total = 0;
    branches.forEach(br => { if (br.type === "leaf") total++; });
    return total;
  }
  
  return (
      <div className="list-group-item">
        <div className="list-group-item-header">
          <div className={"list-view-pf-expand"}>
            <span className={isOpen ? "fa fa-angle-right fa-angle-down" : "fa fa-angle-right"}></span>
          </div>
          <div className="list-view-pf-actions">
            <span className="pficon pficon-search search-mac-icon"></span>
          </div>
          <div className="list-view-pf-main-info">
            <div className="list-view-pf-left">
              <span className="fa fa-building list-view-pf-icon-sm"></span>
            </div>
            <div className="list-view-pf-body">
              <div className="list-view-pf-description">
                <div className="list-group-item-heading">{name}</div>
              </div>
              <div className="list-view-pf-additional-info">
                <div className="list-view-pf-additional-info-item">
                  <span className="pficon pficon-container-node"></span>
                  <strong>{countChildSwitches()}</strong> Switches
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

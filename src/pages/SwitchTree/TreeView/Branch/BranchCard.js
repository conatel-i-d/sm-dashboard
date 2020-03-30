import 'patternfly/dist/css/patternfly-additions.min.css';
import 'patternfly/dist/css/patternfly.min.css';


import React from 'react';

export const BranchCard = ({ value }) => {
  const { name, isOpen, branches } = value;

  const countChildSwitches = () => {
    let total = 0;
    branches.forEach(br => { if (br.type === "leaf") total++; });
    return total;
  }
  
  return (
      <div class="list-group-item">
        <div class="list-group-item-header">
          <div class={"list-view-pf-expand"}>
            <span class={isOpen ? "fa fa-angle-right fa-angle-down" : "fa fa-angle-right"}></span>
          </div>
          <div class="list-view-pf-main-info">
            <div class="list-view-pf-left">
              <span class="fa fa-building list-view-pf-icon-sm"></span>
            </div>
            <div class="list-view-pf-body">
              <div class="list-view-pf-description">
                <div class="list-group-item-heading">{name}</div>
              </div>
              <div class="list-view-pf-additional-info">
                <div class="list-view-pf-additional-info-item">
                  <span class="pficon pficon-container-node"></span>
                  <strong>{countChildSwitches()}</strong> Switches
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

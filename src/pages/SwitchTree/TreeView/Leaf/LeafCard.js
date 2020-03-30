import 'patternfly/dist/css/patternfly-additions.min.css';
import 'patternfly/dist/css/patternfly.min.css';

import React from 'react';

export const LeafCard = ({ value }) => {
  console.log('value in LeafCard', value);
  const { name, model, ip, mac_entries, isChecked, handleChange } = value;
  return (
    <>
      <div class="list-group-item">
        <div class="list-group-item-header">
          <div class="list-view-pf-checkbox">
            <input type="checkbox" autocomplete="off" />
          </div>
          <div class="list-view-pf-actions">
            <button class="btn btn-default">Action</button>
            <div class="dropdown pull-right dropdown-kebab-pf">
              <button
                class="btn btn-link dropdown-toggle"
                type="button"
                id=""
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                <span class="fa fa-ellipsis-v"></span>
              </button>
              <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="">
                <li>
                  <a href="#">Action</a>
                </li>
                <li>
                  <a href="#">Another Action</a>
                </li>
                <li>
                  <a href="#">Something Else Here</a>
                </li>
                <li role="separator" class="divider"></li>
                <li>
                  <a href="#">Separated Link</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="list-view-pf-main-info">
            <div class="list-view-pf-left">
              <span class="fa fa-plane list-view-pf-icon-sm"></span>
            </div>
            <div class="list-view-pf-body">
              <div class="list-view-pf-description">
                <div class="list-group-item-heading">Event 1</div>
                <div class="list-group-item-text">
                  The following snippet of text is{' '}
                  <a href="#">rendered as link text</a>.
                </div>
              </div>
              <div class="list-view-pf-additional-info">
                <div class="list-view-pf-additional-info-item">
                  <span class="pficon pficon-screen"></span>
                  <strong>8</strong> Hosts
                </div>
                <div class="list-view-pf-additional-info-item">
                  <span class="pficon pficon-cluster"></span>
                  <strong>6</strong> Clusters
                </div>
                <div class="list-view-pf-additional-info-item">
                  <span class="pficon pficon-container-node"></span>
                  <strong>10</strong> Nodes
                </div>
                <div class="list-view-pf-additional-info-item">
                  <span class="pficon pficon-image"></span>
                  <strong>8</strong> Images
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-group-item-container container-fluid hidden"></div>
      </div>
    </>
  );
};

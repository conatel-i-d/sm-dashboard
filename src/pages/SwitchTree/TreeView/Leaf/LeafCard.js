import 'patternfly/dist/css/patternfly-additions.min.css';
import 'patternfly/dist/css/patternfly.min.css';

import swIcon from './sw-icon.png';
import React from 'react';
import { history } from '../../../../modules/history';

const ENTITY = 'switchesTree';

function onActionFactory(action, id) {
  history.push(`/${ENTITY}/${action}/${id}`);
}

export const LeafCard = ({ value, handleCheckVisible }) => {
  const [isActionOpen, setIsActionOpen] = React.useState(false);

  const { id, name, model, ip, isVisibleForOperators } = value;

  const onEdit = () => onActionFactory('edit', id);
  const onDelete = () => onActionFactory('delete', id);

  return (
    <>
      <div class="list-group-item">
        <div class="list-group-item-header">
          <div class="list-view-pf-checkbox">
            <input
              type="checkbox"
              checked={isVisibleForOperators}
              onClick={e => handleCheckVisible(id, e)}
              autocomplete="off"
            />
          </div>
          <div class="list-view-pf-actions">
            <div class={isActionOpen ? 'dropdown pull-right dropdown-kebab-pf open' : 'dropdown pull-right dropdown-kebab-pf' }>
              <button
                class="btn btn-link dropdown-toggle"
                type="button"
                id=""
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isActionOpen}
                onClick={() => setIsActionOpen(!isActionOpen)}
              >
                <span class="fa fa-ellipsis-v"></span>
              </button>
                <ul
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="pf-toggle-id-3"
                  role="menu"
                  onMouseLeave={e => {setIsActionOpen(false)}}
                >
                  <li role="menuitem" onClick={onEdit}>
                    <div class="pf-c-dropdown__menu-item">Editar</div>
                  </li>
                  <li role="menuitem" onClick={onDelete}>
                    <div
                      class="pf-c-dropdown__menu-item"
                      style={{ color: 'red' }}
                    >
                      Eliminar
                    </div>
                  </li>
                </ul>
            </div>
          </div>
          <div class="list-view-pf-main-info">
            <div class="list-view-pf-left">
              <span class="fa list-view-pf-icon-sm">
                <img src={swIcon} alt="switch-icon" />
              </span>
            </div>
            <div class="list-view-pf-body">
              <div class="list-view-pf-description">
                <div class="list-group-item-heading">
                  <a href="#">{name}</a>
                </div>
              </div>
              <div class="list-view-pf-additional-info">
                <div class="list-view-pf-additional-info-item">
                  <span class="pficon pficon-screen"></span>
                  <strong>Model: </strong> {model}
                </div>
                <div class="list-view-pf-additional-info-item">
                  <span class="pficon pficon-cluster"></span>
                  <strong>Ip: </strong> {ip}
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

import React from 'react';
import { connect } from 'react-redux';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  NotificationBadge
} from '@patternfly/react-core';
import { BellIcon, CogIcon } from '@patternfly/react-icons';
import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';
import { css } from '@patternfly/react-styles';

import { logout } from '../../../../state/ui';
import Notifications from '../../../Notifications';

export const kebabDropdownItems = [
  <DropdownItem key="1">
    <NotificationBadge isRead={false} aria-label="Notifications">
      <BellIcon />
    </NotificationBadge>
  </DropdownItem>,
  <DropdownItem key="2"></DropdownItem>
];

export function PageToolbar({ logout }) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const userDropdownItems = React.useMemo(
    () => [
      <DropdownItem key="1" onClick={logout}>
        Logout
      </DropdownItem>
    ],
    [logout]
  );

  return (
    <Toolbar>
      <ToolbarGroup
        className={css(
          accessibleStyles.screenReader,
          accessibleStyles.visibleOnLg,
          accessibleStyles.visibleOnMd
        )}
      >
        <ToolbarItem>
          <Notifications />
        </ToolbarItem>
        <ToolbarItem>
          <Button aria-label="Settings actions" variant={ButtonVariant.plain}>
            <CogIcon />
          </Button>
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarItem
          className={css(
            accessibleStyles.screenReader,
            accessibleStyles.visibleOnMd
          )}
        >
          <Dropdown
            isPlain
            position="right"
            onSelect={onDropdownSelect}
            isOpen={isDropdownOpen}
            toggle={
              <DropdownToggle onToggle={onDropdownToggle}>
                CONATEL S.A.
              </DropdownToggle>
            }
            dropdownItems={userDropdownItems}
          />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );

  function onDropdownSelect() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function onDropdownToggle(isDropdownOpen) {
    setIsDropdownOpen(isDropdownOpen);
  }
}

export default connect(() => ({}), { logout })(PageToolbar);

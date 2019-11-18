import React from 'react';
import { connect } from 'react-redux';
import { Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Button,
  ButtonVariant,
  KebabToggle,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  DropdownToggle
} from '@patternfly/react-core';
import { BellIcon, CogIcon } from '@patternfly/react-icons';
import accessibleStyles from '@patternfly/react-styles/css/utilities/Accessibility/accessibility';
import spacingStyles from '@patternfly/react-styles/css/utilities/Spacing/spacing';
import { css } from '@patternfly/react-styles';

import { logout } from '../../../../state/ui';

export const kebabDropdownItems = [
  <DropdownItem key="1">
    <BellIcon /> Notifications
  </DropdownItem>,
  <DropdownItem key="2">
    <CogIcon /> Settings
  </DropdownItem>
];

export function PageToolbar({ logout }) {
  const [isKebabDropdownOpen, setIsKebabDropdownOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const userDropdownItems = React.useMemo(() => [
    <DropdownItem key="1" onClick={logout}>Logout</DropdownItem>
  ], [ logout ]);

  return (
    <Toolbar>
      <ToolbarGroup className={css(accessibleStyles.screenReader, accessibleStyles.visibleOnLg)}>
        <ToolbarItem>
          <Button aria-label="Notifications actions" variant={ButtonVariant.plain}>
            <BellIcon />
          </Button>
        </ToolbarItem>
        <ToolbarItem>
          <Button aria-label="Settings actions" variant={ButtonVariant.plain}>
            <CogIcon />
          </Button>
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarItem className={css(accessibleStyles.hiddenOnLg, spacingStyles.mr_0)}>
          <Dropdown
            isPlain
            position="right"
            onSelect={onKebabDropdownSelect}
            toggle={<KebabToggle onToggle={onKebabDropdownToggle} />}
            isOpen={isKebabDropdownOpen}
            dropdownItems={kebabDropdownItems}
          />
        </ToolbarItem>
        <ToolbarItem className={css(accessibleStyles.screenReader, accessibleStyles.visibleOnMd)}>
          <Dropdown
            isPlain
            position="right"
            onSelect={onDropdownSelect}
            isOpen={isDropdownOpen}
            toggle={<DropdownToggle onToggle={onDropdownToggle}>CONATEL S.A.</DropdownToggle>}
            dropdownItems={userDropdownItems}
          />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );

  function onKebabDropdownSelect () {
    setIsKebabDropdownOpen(!isKebabDropdownOpen);
  }

  function onKebabDropdownToggle(isKebabDropdownOpen) {
    setIsKebabDropdownOpen(isKebabDropdownOpen);
  }

  function onDropdownSelect() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function onDropdownToggle(isDropdownOpen) {
    setIsDropdownOpen(isDropdownOpen);
  }
}

export default connect(() => ({}), { logout })(PageToolbar);

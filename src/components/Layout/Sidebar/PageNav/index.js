import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavList, NavItem, NavVariants } from '@patternfly/react-core';
import { Link } from 'react-router-dom'

import { selectPathname } from '../../../../state/ui';

export function PageNav({pathname}) {
  return (
    <Nav aria-label="Nav" theme="dark">
      <NavList variant={NavVariants.simple}>
        <NavItem itemId={0} isActive={pathname === '/'}>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem itemId={1} isActive={pathname === '/table-view'}>
          <Link to="/table-view">TableView</Link>
        </NavItem>
        <NavItem itemId={1} isActive={pathname === '/virtual-table-view'}>
          <Link to="/virtual-table-view">VirtualTableView</Link>
        </NavItem>
        <NavItem itemId={2} isActive={pathname === '/cards-view'}>
          <Link to="/cards-view">CardsView</Link>
        </NavItem>
        <NavItem itemId={3} isActive={pathname === '/settings-view'}>
          <Link to="/settings-view">SettingsView</Link>
        </NavItem>
        <NavItem itemId={4} isActive={pathname === '/account-view'}>
          <Link to="/account-view">AccountView</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
}

export default connect(selectPathname)(PageNav);
import { Nav, NavItem, NavList, NavVariants } from '@patternfly/react-core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectPathname } from '../../../../state/ui';


export function PageNav({pathname}) {
  return (
    <Nav aria-label="Nav" theme="dark">
      <NavList variant={NavVariants.simple}>
        <NavItem itemId={0} isActive={pathname === '/'}>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem itemId={1} isActive={/^\/switches/.test(pathname)}>
          <Link to="/switches">Switches</Link>
        </NavItem>
        <NavItem itemId={1} isActive={/^\/logs/.test(pathname)}>
          <Link to="/logs">Logs</Link>
        </NavItem>
        <NavItem itemId={1} isActive={/^\/switchTree/.test(pathname)}>
          <Link to="/switchTree">SwitchesTree</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
}

export default connect(selectPathname)(PageNav);
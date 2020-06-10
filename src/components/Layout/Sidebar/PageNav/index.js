import { Nav, NavItem, NavList, NavVariants } from '@patternfly/react-core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectPathname } from '../../../../state/ui';
import { updateFilterInput as swUpdateFilterInput } from '../../../../state/switches';
import { updateFilterInput as logsUpdateFilterInput } from '../../../../state/logs'
export function PageNav({pathname}) {
  return (
    <Nav aria-label="Nav" theme="dark">
      <NavList variant={NavVariants.simple}>
        <NavItem itemId={0} isActive={pathname === '/'}>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem itemId={1} isActive={/^\/switches/.test(pathname)}>
          <Link to="/switches" onClick={() => swUpdateFilterInput("")}>Switches</Link>
        </NavItem>
        <NavItem itemId={1} isActive={/^\/logs/.test(pathname)}>
          <Link to="/logs" onClick={() => logsUpdateFilterInput("")}>Logs</Link>
        </NavItem>
        <NavItem itemId={1} isActive={/^\/MacSearch/.test(pathname)}>
          <Link to="/macSearch" onClick={() => swUpdateFilterInput("")}>Search By Mac</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
}

export default connect(selectPathname)(PageNav);
import React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Brand, } from '@patternfly/react-core';

import PageToolbar from './PageToolbar'
import logo from './logo.png';
import { navToggle } from '../../../state/ui';

export function Header({navToggle}) {
  return (
    <PageHeader
      logo={<Brand src={logo} alt="Conatel Logo" />}
      toolbar={<PageToolbar />}
      showNavToggle
      onNavToggle={navToggle}
    />
  );
}

export default connect(() => ({}), { navToggle })(Header);
import React from 'react';
import { connect } from 'react-redux';
import { PageHeader, Brand, Avatar } from '@patternfly/react-core';

import PageToolbar from './PageToolbar'
import logo from './logo.png';
import avatar from './avatar.svg';
import { navToggle } from '../../../state/ui';

export function Header({navToggle}) {
  return (
    <PageHeader
      logo={<Brand src={logo} alt="Conatel Logo" />}
      toolbar={<PageToolbar />}
      avatar={<Avatar src={avatar} alt="Avatar image" />}
      showNavToggle
      onNavToggle={navToggle}
    />
  );
}

export default connect(() => ({}), { navToggle })(Header);
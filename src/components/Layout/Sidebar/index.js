import React from 'react';
import { connect } from 'react-redux';
import { PageSidebar } from '@patternfly/react-core';

import PageNav from './PageNav';
import {navState} from '../../../state/ui'

export function Sidebar({isNavOpen}) {
  return (
    <PageSidebar nav={<PageNav />} theme="dark" isNavOpen={isNavOpen} />
  );
}

export default connect(navState)(Sidebar);
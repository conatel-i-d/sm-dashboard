import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbHeading } from '@patternfly/react-core';

import { selectPathname } from '../../../state/ui/';
import toTitleCase from '../../../modules/toTitleCase.js';

export function LayoutBreadcrumb({pathname}) {
  let url = '';
  return (
    <Breadcrumb>
      {pathname.split('/').map((fragment, index, list) => {
        url = url + fragment + '/';
        if (index === 0) {
          return <BreadcrumbItem key={index}><Link to={url}>/</Link></BreadcrumbItem>
        }
        return index + 1 === list.length
          ? <BreadcrumbHeading key={index}>{toTitleCase(fragment)}</BreadcrumbHeading>
          : <BreadcrumbItem key={index}><Link to={url}>{toTitleCase(fragment)}</Link></BreadcrumbItem>;
      })}
    </Breadcrumb>
  );
};

export default connect(selectPathname)(LayoutBreadcrumb);
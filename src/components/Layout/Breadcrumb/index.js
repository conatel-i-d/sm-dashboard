import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbHeading
} from '@patternfly/react-core';

import { updateFilterInput as swUpdateFilterInput } from '../../../state/switches';
import { updateFilterInput as logsUpdateFilterInput } from '../../../state/logs';
import { selectPathname } from '../../../state/ui/';

import toTitleCase from '../../../modules/toTitleCase.js';

export function LayoutBreadcrumb({
  pathname,
  swUpdateFilterInput,
  logsUpdateFilterInput
}) {
  let url = '';
  return (
    <Breadcrumb>
      {pathname.split('/').map((fragment, index, list) => {
        url = url + fragment + '/';
        if (index === 0) {
          return (
            <BreadcrumbItem key={index}>
              <Link to={url}>/</Link>
            </BreadcrumbItem>
          );
        }
        return index + 1 === list.length ? (
          <BreadcrumbHeading key={index}>
            {toTitleCase(fragment)}
          </BreadcrumbHeading>
        ) : (
          <BreadcrumbItem key={index}>
            <Link
              to={url}
              onClick={() => {
                swUpdateFilterInput('');
                logsUpdateFilterInput('');
              }}
            >
              {toTitleCase(fragment)}
            </Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

export default connect(selectPathname, {
  swUpdateFilterInput,
  logsUpdateFilterInput
})(LayoutBreadcrumb);

import React from 'react';
import { SimpleListItem } from '@patternfly/react-core';
import { LeafCard } from './LeafCard'

export const Leaf = (props) => {
  var handleOnClick = React.useCallback(e => e.stopPropagation(), []);
  return (
    <SimpleListItem onClick={handleOnClick}>
        <LeafCard {...props} />
    </SimpleListItem>
  );
};

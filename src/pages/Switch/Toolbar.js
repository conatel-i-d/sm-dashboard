import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ButtonVariant,
  Toolbar as PatternflyToolbar,
  ToolbarItem,
  InputGroup,
  TextInput,
  TextContent,
  TextVariants,
  Text
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';

import { updateFilterInput, selectSwitchNicsCount } from '../../state/nics';

function Toolbar({ updateFilterInput, count }) {
  return (
    <PatternflyToolbar className="Switch__Toolbar">
      <ToolbarItem>
        <InputGroup>
          <TextInput
            onChange={e => updateFilterInput(e)}
            name="filterInput"
            type="search"
            aria-label="filter input"
          />
          <Button
            variant={ButtonVariant.control}
            aria-label="search button for fitler input"
          >
            <SearchIcon />
          </Button>
        </InputGroup>
      </ToolbarItem>
      <ToolbarItem>
        <TextContent>
          <Text component={TextVariants.h5}><b>Número de Interfaces:</b> {count}</Text>
        </TextContent>
      </ToolbarItem>
    </PatternflyToolbar>
  );
}

export default connect(selectSwitchNicsCount, { updateFilterInput })(Toolbar);

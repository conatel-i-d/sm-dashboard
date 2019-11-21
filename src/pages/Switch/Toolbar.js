import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  ButtonVariant,
  Toolbar as PatternflyToolbar,
  ToolbarItem,
  InputGroup,
  TextInput
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';

import { updateFilterInput } from '../../state/nics';

function Toolbar({ updateFilterInput }) {
  return (
    <PatternflyToolbar className="Switches__Toolbar">
      <ToolbarItem></ToolbarItem>
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
    </PatternflyToolbar>
  );
}

export default connect(() => ({}), { updateFilterInput })(Toolbar);

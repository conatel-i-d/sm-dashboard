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
import { FilterIcon } from '@patternfly/react-icons';

import { updateFilterInput } from '../../state/switches';

const Toolbar = ({ updateFilterInput }) => {
  return (
    <PatternflyToolbar className="Switches__Toolbar">
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
            aria-label="search button for filter input"
          >
            <FilterIcon />
          </Button>
        </InputGroup>
      </ToolbarItem>
    </PatternflyToolbar>
  );
}

export default connect(() => ({}), { updateFilterInput })(Toolbar);

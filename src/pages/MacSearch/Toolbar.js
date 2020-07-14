import './style.css'

import React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  ButtonVariant,
  Toolbar as PatternflyToolbar,
  ToolbarItem,
  InputGroup,
  TextInput,
  ToolbarGroup
} from '@patternfly/react-core';
import { FilterIcon } from '@patternfly/react-icons';

import { updateFilterInput } from '../../state/switches';

const Toolbar = ({ updateFilterInput }) => {
  React.useEffect(() => {
    updateFilterInput("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <PatternflyToolbar className="Switches__Toolbar">
      <ToolbarGroup>
        <ToolbarItem className="--filter-text">
          <p className="--filter-text">Filtro por edificio: </p>
          </ToolbarItem>
        <ToolbarItem>
          <InputGroup>
            <TextInput
              onChange={(e) => updateFilterInput(e)}
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
      </ToolbarGroup>
    </PatternflyToolbar>
  );
};

export default connect(() => ({}), { updateFilterInput })(Toolbar);

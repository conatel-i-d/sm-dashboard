import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Button,
  ButtonVariant,
  Toolbar as PatternflyToolbar,
  ToolbarItem,
  InputGroup,
  TextInput,
} from '@patternfly/react-core';
import { PlusCircleIcon, SearchIcon } from '@patternfly/react-icons';

import { updateFilterInput } from '../../state/switches';

function Toolbar({ updateFilterInput }) {
  return (
    <PatternflyToolbar className="Switches__Toolbar">
      <ToolbarItem><Link to="/switches/create">
        <Button variant="link" icon={<PlusCircleIcon />}>
          Crear un nuevo Switch
        </Button></Link>
      </ToolbarItem>
      <ToolbarItem>
        <InputGroup>
          <TextInput onChange={ updateFilterInput } name="filterInput" type="search" aria-label="filter input" />
          <Button variant={ButtonVariant.control} aria-label="search button for fitler input">
            <SearchIcon />
          </Button>
        </InputGroup>
      </ToolbarItem>
    </PatternflyToolbar>
  );
}

export default connect(() => ({}), { updateFilterInput })(Toolbar);
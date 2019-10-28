import React from 'react';
import { connect } from 'react-redux';
import { 
  Button,
  ButtonVariant,
  Toolbar as PatternflyToolbar,
  ToolbarItem,
  InputGroup,
  TextInput,
} from '@patternfly/react-core';
import { PlusCircleIcon, SearchIcon } from '@patternfly/react-icons';

import { toggleModal, updateFilterInput } from '../../state/switches';

function Toolbar({ toggleModal, updateFilterInput }) {
  return (
    <PatternflyToolbar className="Switches__Toolbar">
      <ToolbarItem>
        <Button variant="link" icon={<PlusCircleIcon />} onClick={toggleModal}>
          Crear un nuevo Switch
        </Button>
      </ToolbarItem>
      <ToolbarItem>
        <InputGroup>
          <TextInput onChange={updateFilterInput} name="filterInput" type="search" aria-label="filter input" />
          <Button variant={ButtonVariant.control} aria-label="search button for fitler input">
            <SearchIcon />
          </Button>
        </InputGroup>
      </ToolbarItem>
    </PatternflyToolbar>
  );
}

export default connect(() => ({}), { toggleModal, updateFilterInput })(Toolbar);
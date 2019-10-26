import React from 'react';
import { connect } from 'react-redux';
import { Button, Toolbar as PatternflyToolbar, ToolbarItem } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';

import { toggleModal } from '../../../state/switches';

function Toolbar({ toggleModal }) {
  return (
    <PatternflyToolbar className="Switches__Toolbar">
      <ToolbarItem>
        <Button variant="link" icon={<PlusCircleIcon />} onClick={toggleModal}>
          Crear un nuevo Switch
        </Button>
      </ToolbarItem>
    </PatternflyToolbar>
  );
}

export default connect(() => ({}), { toggleModal })(Toolbar);
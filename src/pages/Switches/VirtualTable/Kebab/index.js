import React from 'react';

import { Dropdown, DropdownItem, DropdownPosition, KebabToggle } from '@patternfly/react-core';

function Kebab({ isKebabOpen, onKebabSelect, onKebabToggle }) {
  return (
    <Dropdown
      onSelect={onKebabSelect}
      position={DropdownPosition.right}
      toggle={<KebabToggle onToggle={onKebabToggle} />}
      isOpen={isKebabOpen}
      isPlain
      dropdownItems={[
        <DropdownItem key="edit">Edit</DropdownItem>,
        <DropdownItem key="delete">Delete</DropdownItem>
      ]}
    />
  )
}

export default Kebab;
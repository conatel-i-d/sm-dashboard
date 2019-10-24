import React from 'react';
import { connect } from 'react-redux';
import { 
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Button,
  Select,
  SelectOption,
  SelectVariant,
  SelectDirection,
  Text,
  TextVariants,
  FormGroup,
  TextInput
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';

import { beersState, updateState, beersGet } from '../../../state/beers';

export const OPTIONS = [
  { value: '10', disabled: false, isPlaceholder: true },
  { value: '15', disabled: false },
  { value: '20', disabled: false },
  { value: '25', disabled: false },
  { value: '30', disabled: false },
  { value: '35', disabled: false },
  { value: '40', disabled: false }
]

export function VirtualTableView({page, perPage, updateState, beersGet, loading}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const onSelect = React.useCallback((_, selection, isPlaceholder) => {
    if (isPlaceholder) return;
    setIsExpanded(false);
    updateState({
      perPage: +selection,
      ...(perPage > +selection ? {} : {page: 1})
    });
  }, [setIsExpanded, updateState, perPage]);

  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem>
          <Text component={TextVariants.p}>
            Cantidad por página:
          </Text>
        </ToolbarItem>
        <ToolbarItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={setIsExpanded}
            onSelect={onSelect}
            selections={perPage}
            isExpanded={isExpanded}
            ariaLabelledBy="Per Page"
            direction={SelectDirection.down}
          >
            {OPTIONS.map((option, index) => (
              <SelectOption
                isDisabled={option.disabled}
                key={index}
                value={option.value}
                isPlaceholder={option.isPlaceholder}
              />
            ))}
          </Select>
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarItem>
          <Text component={TextVariants.p}>
            Página:
          </Text>
        </ToolbarItem>
        <ToolbarItem className="VirtualTableToolbar__page-form-group">
          <FormGroup
            fieldId="page"
          >
            <TextInput
              readOnly
              disabled
              type="text"
              id="page"
              name="page"
              value={page - 1 <= 0 ? 1 : page - 1}
            />
          </FormGroup>
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarItem>
          <Button isDisabled={loading} variant="primary" onClick={beersGet}>
            {loading ? <Spinner size="md"/> : 'Cargar más'}
          </Button>
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );
}

export default connect(beersState, {updateState, beersGet})(VirtualTableView);


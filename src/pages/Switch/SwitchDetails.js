import React from 'react';
import {
  Form,
  FormGroup,
  TextInput,
  Split,
  SplitItem,
} from '@patternfly/react-core';

function SwitchDetails({ model }) {
  return (
    <Split gutter="sm">
        <SplitItem isFilled>
          <Form isHorizontal>
            <FormGroup
              label="Nombre:"
              type="text"
              fieldId="name"
            >
              <TextInput 
                value={model.name}
                id="name"
                aria-describedby="name"
                readOnly
              />
            </FormGroup>
            <FormGroup
              label="Model:"
              type="text"
              fieldId="model"
            >
              <TextInput 
                value={model.model}
                id="model"
                aria-describedby="model"
                readOnly
              />
            </FormGroup>
          </Form>
        </SplitItem>
        <SplitItem isFilled>
          <Form isHorizontal>
            <FormGroup
              label="Descripción:"
              type="text"
              fieldId="description"
              >
              <TextInput 
                value={model.description}
                id="description"
                aria-describedby="description"
                readOnly
                />
            </FormGroup>
            <FormGroup
              label="IP:"
              type="text"
              fieldId="ip"
              >
              <TextInput 
                value={model.ip}
                id="ip"
                aria-describedby="ip"
                readOnly
                />
            </FormGroup>
          </Form>
        </SplitItem>
      </Split>
  );
}

export default SwitchDetails;
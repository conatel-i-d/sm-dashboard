import React from 'react';
import { FormGroup, Form as PatternflyForm, TextInput } from '@patternfly/react-core';

export const InsertMacStep = (props) => {
  const [state, setState] = React.useState({});

  return (
    <PatternflyForm>
      <FormGroup label="Mac address" isRequired fieldId="switch-form-mac">
        <TextInput
          isRequired
          type="text"
          id="switch-form-mac"
          name="switch-form-mac"
          aria-describedby="switch-form-mac-helper"
          value={state.findMac}
          onChange={(value) => {
            setState({ ...state, findMac: value });
          }}
        />
      </FormGroup>
    </PatternflyForm>
  );
};
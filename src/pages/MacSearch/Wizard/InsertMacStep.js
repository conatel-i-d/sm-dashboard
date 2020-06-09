import React from 'react';
import { FormGroup, Form as PatternflyForm, TextInput } from '@patternfly/react-core';

const InsertMacStep = ({ findMac, handleFinMacChange}) => {
  return (
    <PatternflyForm>
      <FormGroup label="Mac address" isRequired fieldId="switch-form-mac">
        <TextInput
          isRequired
          type="text"
          id="switch-form-mac"
          name="switch-form-mac"
          aria-describedby="switch-form-mac-helper"
          value={findMac}
          onChange={value => {
            handleFinMacChange(value)
          }}
        />
      </FormGroup>
    </PatternflyForm>
  );
};

export default InsertMacStep;
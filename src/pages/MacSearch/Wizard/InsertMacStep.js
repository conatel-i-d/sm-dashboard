import React from 'react';
import {
  FormGroup,
  Form as PatternflyForm,
  TextInput
} from '@patternfly/react-core';

const InsertMacStep = ({ findMac, handleFinMacChange }) => {
  return (
    <>
      <PatternflyForm>
        <FormGroup label="Mac address" isRequired fieldId="switch-form-mac">
          <TextInput
            isRequired
            type="text"
            id="switch-form-mac"
            name="switch-form-mac"
            aria-describedby="switch-form-mac-helper"
            value={findMac}
            onChange={(value) => {
              handleFinMacChange(value);
            }}
          />
        </FormGroup>
      </PatternflyForm>
     

      <div className="pf-l-bullseye">
      <div className="pf-c-empty-state pf-m-lg">
        <div className="pf-c-empty-state__body">
        Ingresar la dirección MAC o una parte de ella, en uno de los siguientes
        formatos sin importar mayusculas o minusculas:
        <ul>
          <li style={{ margin: "0 0 0 25%", textAlign: "left" }}>- AA:AA:AA:AA:AA:AA</li>
          <li style={{ margin: "0 0 0 25%", textAlign: "left" }}>- AAAA-AAAA-AAAA</li>
          <li style={{ margin: "0 0 0 25%", textAlign: "left" }}>- AA-AA-AA-AA-AA-AA</li>
        </ul>
      </div>
      </div>
    </div>
    </>
  );
};

export default InsertMacStep;

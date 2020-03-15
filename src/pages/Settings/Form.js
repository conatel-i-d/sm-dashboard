import React from 'react';
import { connect } from 'react-redux';
import {
  Form as PatternflyForm,
  FormGroup,
  TextInput,
  ActionGroup,
  Button,
} from '@patternfly/react-core'

import { selectSettings, saveSettings } from '../../state/settings';

function Form({ settings, saveSettings }) {
  var [formState, setFormState] = React.useState(settings);
  
  var handleOnChange = React.useCallback((key) => (value) => {
    setFormState({...formState, [key]: value})
  }, [formState, setFormState]);

  var handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    saveSettings(formState);
  }, [formState, saveSettings]);
  
  var handleReset = React.useCallback(() => setFormState({...settings}), [settings]);

  return (
    <>
      <h2>Configuración de servidor LDAP</h2>
      <PatternflyForm isHorizontal>
        <FormGroup
          label="User DN"
          fieldId="horizontal-form-userDN"
        >
          <TextInput
            value={formState.userDN}
            type="text"
            id="horizontal-form-userDN"
            aria-describedby="horizontal-form-name-helper"
            name="horizontal-form-userDN"
            onChange={handleOnChange('userDN')}
          />
        </FormGroup>
        <FormGroup
          label="Bind DN"
          fieldId="horizontal-form-bindDN"
        >
          <TextInput
            value={formState.bindDN}
            type="text"
            id="horizontal-form-bindDN"
            aria-describedby="horizontal-form-name-helper"
            name="horizontal-form-bindDN"
            onChange={handleOnChange('bindDN')}
          />
        </FormGroup>
        <FormGroup
          label="Connection URL"
          fieldId="horizontal-form-connectionURL"
        >
          <TextInput
            value={formState.connectionURL}
            type="text"
            id="horizontal-form-connectionURL"
            aria-describedby="horizontal-form-name-helper"
            name="horizontal-form-connectionURL"
            onChange={handleOnChange('connectionURL')}
          />
        </FormGroup>
        <FormGroup
          label="Bind Credential"
          fieldId="horizontal-form-bindCredential"
        >
          <TextInput
            value={formState.bindCredential}
            type="text"
            id="horizontal-form-bindCredential"
            aria-describedby="horizontal-form-name-helper"
            name="horizontal-form-bindCredential"
            onChange={handleOnChange('bindCredential')}
          />
        </FormGroup>
        <ActionGroup>
          <Button variant="primary" type="submit" onClick={ handleSubmit }>Guardar cambios</Button>
          <Button variant="secondary" onClick={ handleReset }>Restablecer valores</Button>
        </ActionGroup>
      </PatternflyForm>
    </>
  );
}

export default connect(selectSettings, { saveSettings })(Form);
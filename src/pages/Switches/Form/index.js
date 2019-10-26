import React from 'react';
import { FormGroup, Form as PatternflyForm, TextInput } from '@patternfly/react-core';

function Form({ model, onChange }) {
  return (
    <PatternflyForm>
      <FormGroup
        label="Nombre"
        isRequired
        fieldId="switch-form-name"
      >
        <TextInput
          isRequired
          type="text"
          id="switch-form-name"
          name="switch-form-name"
          aria-describedby="switch-form-name-helper"
          value={model.name}
          onChange={handleChange('name')}
        />
      </FormGroup>
      <FormGroup 
        label="Descripción"
        isRequired
        fieldId="switch-form-description"
      >
        <TextInput
          isRequired
          type="text"
          id="switch-form-description"
          name="switch-form-description"
          value={model.description}
          onChange={handleChange('description')}
        />
      </FormGroup>
      <FormGroup 
        label="Modelo"
        isRequired
        fieldId="switch-form-model"
        helperText="Ejemplo: Cisco 2960"  
      >
        <TextInput
          isRequired
          type="text"
          id="switch-form-model"
          name="switch-form-model"
          value={model.model}
          onChange={handleChange('model')}
        />
      </FormGroup>
      <FormGroup 
        label="IP"
        isRequired
        fieldId="switch-form-ip"
        helperText="OBS: El servidor debe tener acceso a esta IP para poder interacutar con el Switch"  
      >
        <TextInput
          isRequired
          type="text"
          id="switch-form-ip"
          name="switch-form-ip"
          value={model.ip}
          onChange={handleChange('ip')}
        />
      </FormGroup>
    </PatternflyForm>
  );

  function handleChange(key) {
    return function (value) {
      onChange({...model, [key]: value});
    }
  }
}

export default Form;
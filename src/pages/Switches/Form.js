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
      <FormGroup 
        label="SSH User"
        isRequired
        fieldId="switch-form-user"
        helperText="OBS: Solo para los switches agregados manual, no aplica a los switches obtenidos del Cisco Prime"  
      >
        <TextInput
          isRequired={false}
          type="text"
          id="switch-form-user"
          name="switch-form-user"
          value={model.ansible_user}
          onChange={handleChange('ansible_user')}
        />
      </FormGroup>
      <FormGroup 
        label="SSH Passwrod"
        isRequired
        fieldId="switch-form-password"
        helperText="OBS: Solo para los switches agregados manual, no aplica a los switches obtenidos del Cisco Prime"  
      >
        <TextInput
          isRequired={false}
          type="password"
          id="switch-form-password"
          name="switch-form-password"
          value={model.ansible_ssh_pass}
          onChange={handleChange('ansible_ssh_pass')}
        />
      </FormGroup>
      <FormGroup 
        label="SSH Port"
        isRequired
        fieldId="switch-form-port"
        helperText="OBS: Solo para los switches agregados manual, no aplica a los switches obtenidos del Cisco Prime"  
      >
        <TextInput
          isRequired={false}
          type="number"
          id="switch-form-port"
          name="switch-form-port"
          value={model.ansible_ssh_port}
          onChange={handleChange('ansible_ssh_port')}
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
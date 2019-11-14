import React from 'react';

import {
  LoginForm,
  LoginMainFooterBandItem,
  LoginPage
} from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

import { connect } from 'react-redux';

import { getLoginState, loginSubmit } from '../../state/ui';

import { useCustomState } from '../../modules/setStateHook';

const SimpleLoginPage = ({ loginSubmit }) => {
  const helperText = (
    <React.Fragment>
      <ExclamationCircleIcon />
      &nbsp;Credenciales no validas.
    </React.Fragment>
  );

  const signUpForAccountMessage = (
    <LoginMainFooterBandItem>
      No esta registrado? <a href="#">Registrese</a>
    </LoginMainFooterBandItem>
  );
  const forgotCredentials = (
    <LoginMainFooterBandItem>
      <a href="#">Olvido su contraseña o usuario?</a>
    </LoginMainFooterBandItem>
  );

  const [state, setState] = useCustomState({
    username: '',
    password: '',
    showHelperText: false,
    isValidUsername: true,
    isValidPassword: true,
    isRememberMeChecked: false
  });

  const {
    username,
    password,
    isValidUsername,
    showHelperText,
    isValidPassword
  } = state;

  const handleLoginSubmit = event => {
    event.preventDefault();
    loginSubmit({ username, password });
  };

  const loginForm = () => (
    <LoginForm
      showHelperText={showHelperText}
      helperText={helperText}
      usernameLabel="Usuario"
      usernameValue={username}
      onChangeUsername={username => setState({ username })}
      isValidUsername={isValidUsername}
      passwordLabel="Contraseña"
      passwordValue={password}
      onChangePassword={password => setState({ password })}
      isValidPassword={isValidPassword}
      onChangeRememberMe={() => {}}
      onLoginButtonClick={handleLoginSubmit}
    />
  );
  return (
    <LoginPage
      loginTitle="Inicie Sesión"
      signUpForAccountMessage={signUpForAccountMessage}
      forgotCredentials={forgotCredentials}
    >
      {loginForm()}
    </LoginPage>
  );
};

export default connect(getLoginState, { loginSubmit })(SimpleLoginPage);

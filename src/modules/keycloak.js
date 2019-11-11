let keycloak;

export { keycloak, init };

function init() {
  // If the Keycloak constructor doesn't exist we'll throw an error.
  if (window.Keycloak === undefined) {
    throw new Error('Can\'t find the Keycloak global constructor');
  }

  // Initialize a Keycloak object
  keycloak = new window.Keycloak({
    url: '/auth',
    realm: 'sm',
    clientId: 'dashboard'
  });
}
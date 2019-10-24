import lowerCase from 'lodash/lowerCase';

export function titleCase(str) {
  str = lowerCase(str).split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

export default titleCase;
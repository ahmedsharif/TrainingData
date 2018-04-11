export function captialize(str = '') {
  return typeof str !== 'string' ? '' : str[0].toUpperCase() + str.slice(1);
}

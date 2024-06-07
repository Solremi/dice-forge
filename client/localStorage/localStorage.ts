export function addTokenToLocalStorage(token: string) {
  localStorage.setItem('jwt', token);
}

export function getTokenFromLocalStorage() {
  const jwt = localStorage.getItem('jwt');

  return { jwt };
}

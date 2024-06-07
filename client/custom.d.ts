/* This code snippet is declaring a module named 'jwt-decode' and exporting a
default function called jwtDecode. The function jwtDecode takes a string
parameter representing a token and returns a generic type T. The default type
for T is set to 'any', meaning it can be any type. This declaration allows other
parts of the codebase to import and use the jwtDecode function from the
'jwt-decode' module. */
declare module 'jwt-decode' {
  export default function jwtDecode<T = any>(token: string): T;
}

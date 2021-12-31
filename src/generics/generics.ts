export const printObject = ( argument: any) => {
  console.log( argument );
}

//* T: lo que retorna debe ser del mismo tipo que el argumento
export function genericFunction<T>( argument: T ): T {
  return argument;
}

export const genericFunctionArrow = <T>( argument: T ) => argument;
//* Los decoradores son funciones que se ejecutan en tiempo de compilación/transpilación
//* Se utilizan para extender la funcionalidad de otras funciones.
function printToConsole( constructor: Function ) {
  console.log( constructor );
}

const printToConsoleConditional = ( print: boolean = false ): Function => {
  if ( print ) {
    return printToConsole;
  } else {
    return () => {}
  }
}

//* Es común ver los decoradores como funciones tradicionales
const bloquearPrototipo = function( constructor: Function ) {
  Object.seal( constructor );
  Object.seal( constructor.prototype );
}

//* Un factory decorator es una función que retorna otra función
function CheckValidPokemonId() {
  return function( target: any, propertyKey: string, descriptor: PropertyDescriptor ) {
    
    const originalMethod = descriptor.value;

    descriptor.value = ( id: number ) => {
      if ( id < 1 || id > 800 ) {
        return console.error('El id del pokemon debe estar entre 1 y 800');
      } else {
        return originalMethod( id );    
      }
    } 
  }
}

//* Podemos anidar varios decoradores
//@printToConsole
@bloquearPrototipo
@printToConsoleConditional( false )
export class Pokemon {

  @readonly( true )
  public publicApi: string = 'https://pokeapi.co'

  constructor(
    public name: string
  ){}

  //* Los factory decorators van con () al final porque debe disparar la función que retornará
  @CheckValidPokemonId()
  savePokemonToDB( id: number ) {
    console.log( `Pokemon guardado en DB ${ id }` );
  }
}

//* Decorador que sirva para que publicAPi de la clase Pokemon sea de solo lectura (que nadie lo pueda modificar)
function readonly( isWritable: boolean = true ): Function {
  //* Si estamos decorando una propiedad <descriptor: PropertyDescriptor> no se recibe
  return function( target: any, propertyKey: string ) {
    
    const descriptor: PropertyDescriptor = {
      get() {
        console.log( this )
        return 'Brawer'
      },
      set( this, val ) {
        // console.log( this, val );
        Object.defineProperty(this, propertyKey, {
          value: val,
          writable: !isWritable,
          enumerable: false
        })
      }
    }

    return descriptor;

  }
}
import { genericFunctionArrow } from '../generics/generics';
import { Villain } from '../interfaces';


const deadpool = {
  name: 'Deadpool',
  realName: 'Wade Winston Wilson',
  dangerLevel: 130
}

console.log( genericFunctionArrow<Villain>( deadpool ) );
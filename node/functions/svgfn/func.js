const fdk=require('@fnproject/fdk');
import OkitData from '../../okit-node/src/data/okit_data.js';

fdk.handle(function(input){
  let name = 'World';
  if (input.name) {
    name = input.name;
  }
  console.log('\nInside Node Hello World function')
  return {'message': 'Hello ' + name}
})

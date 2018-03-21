// import { cube, foo, graph } from 'my-module';
graph.options = {
    color:'blue',
    thickness:'3px'
}; 
function cube(x) {
    return x * x * x;
  }
// graph.draw();
console.log(cube(3)); // 27
console.log(foo);    // 4.555806215962888
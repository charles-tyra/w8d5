function sum() {
   let sum = 0;
   let args = Array.from(arguments);
   args.forEach(arg => {
      sum += arg;
   });
   return sum;
}
console.log(sum(1, 2, 3, 4))

function dotdotdotSum(...args) {
   let sum = 0;
   args.forEach(function(arg) { sum += arg });
   return sum;
}

console.log(dotdotdotSum(1, 2, 3, 4))


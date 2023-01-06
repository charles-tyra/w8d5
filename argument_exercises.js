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


Function.prototype.dotDotDotMyBind = function(context, ...bindArgs) {
   let kyle = this;

   return function(...callArgs) {
      return kyle.apply(context, bindArgs.concat(callArgs))
   }
}


Function.prototype.myBind = function (context) {
   let kyle = this; 
   let bindArgs = Array.from(arguments).slice(1)

   return function () {
      // let callArgs = Array.from(arguments)
      return kyle.apply(context, bindArgs.concat(Array.from(arguments)))
   }
}


class Cat {
   constructor(name) {
     this.name = name;
   }
 
   says(sound, person) {
     console.log(`${this.name} says ${sound} to ${person}!`);
     return true;
   }
 }
 
 class Dog {
   constructor(name) {
     this.name = name;
   }
 }
 
 const markov = new Cat("Markov");
 const pavlov = new Dog("Pavlov");
 
 markov.says("meow", "Ned");
 // Markov says meow to Ned!
 // true
 
 // bind time args are "meow" and "Kush", no call time args
 markov.says.myBind(pavlov, "meow", "Kush")();
 // Pavlov says meow to Kush!
 // true
 
 // no bind time args (other than context), call time args are "meow" and "a tree"
 markov.says.myBind(pavlov)("meow", "a tree");
 const pavlovSays = markov.says.myBind(pavlov);
 pavlovSays('wofwof', 'lyns');
 // Pavlov says meow to a tree!
 // true
 
 // bind time arg is "meow", call time arg is "Markov"
 const meow = markov.says.myBind(pavlov, 'meow');
 meow('markov');
 markov.says.myBind(pavlov, "meow")("Markov");
 // Pavlov says meow to Markov!
 // true
 
 // no bind time args (other than context), call time args are "meow" and "me"
 const notMarkovSays = markov.says.myBind(pavlov);
 notMarkovSays("meow", "me");
 // Pavlov says meow to me!
 // true
console.log("Calculate factorial of a number");

let a = 6
let arr = [];

for (let i = 1; i <= a; i++) {
      arr.push(i);
}
const multi = ((a, b) => {
      return a * b;
})
console.log("Factorial of " + a +" is " +arr.reduce(multi));
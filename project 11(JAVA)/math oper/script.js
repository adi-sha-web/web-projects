m = Math.random()
console.log(m)

let a = parseInt(prompt("Enter a number"));
let b = parseInt(prompt("Enter another number"));

if (m <= 0.1) {
      alert("for Addition       '+'  press 1\n" +
            "for Subtraction    '-'  press 2\n" +
            "for Multiplication '*'  press 3\n" +
            "for Division       '/'  press 4\n" +
            "for Exponentiation '**' press 5")

      let c = prompt("Enter operation")

      if (c == 1) {
            alert("The result is :- " + (a - b))
      }
      else if (c == 2) {
            alert("The result is :- " + (a * b))
      }
      else if (c == 3) {
            alert("The result is :- " + (a / b))
      }
      else if (c == 4) {
            alert("The result is :- " + (a ** b))
      }
      else if (c == 5) {

            alert("The result is :- " + (a + b))
      }
}

else {

      alert("for Addition       '+'  press 1\n" +
            "for Subtraction    '-'  press 2\n" +
            "for Multiplication '*'  press 3\n" +
            "for Division       '/'  press 4\n" +
            "for Exponentiation '**' press 5")

      var c = prompt("Enter operation")

      if (c == 1) {
            alert("The result is :- " + (a + b))
      }
      else if (c == 2) {
            alert("The result is :- " + (a - b))
      }
      else if (c == 3) {
            alert("The result is :- " + (a * b))
      }
      else if (c == 4) {
            alert("The result is :- " + (a / b))
      }
      else if (c == 5) {

            alert("The result is :- " + (a ** b))
      }

}
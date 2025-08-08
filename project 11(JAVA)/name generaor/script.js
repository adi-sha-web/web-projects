console.log("Business Name Generator")

function name_gen() {

      m1 = Math.floor(Math.random() * 3) + 1;
      if (m1 == 1) {
            bng1 = "Crazy ";
      }
      else if (m1 == 2) {
            bng1 = "Fire ";
      }
      else if (m1 == 3) {
            bng1 = "Amazing ";
      }

      m2 = Math.floor(Math.random() * 3) + 1;
      if (m2 == 1) {
            bng2 = "Engine";
      }
      else if (m2 == 2) {
            bng2 = "Foods";
      }
      else if (m2 == 3) {
            bng2 = "Garments";
      }

      m3 = Math.floor(Math.random() * 3) + 1;
      if (m3 == 1) {
            bng3 = " Bros";
      }
      else if (m3 == 2) {
            bng3 = " Limited";
      }
      else if (m3 == 3) {
            bng3 = " Hub";
      }

      bng = bng1 + bng2 + bng3;
      return bng;
}
Bname = name_gen();
console.log("Your Business Name is: " + Bname);
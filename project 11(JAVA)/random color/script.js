console.log("Applying random color to boxes");
      
      function ran_color() {
            let a=Math.floor(Math.random() * 256) ;
            
            let b=Math.floor(Math.random() * 256) ;
            
            let c=Math.floor(Math.random() * 256) ;
            
            return `rgb(${a},${b}, ${c})`;
      }

let e = document.getElementsByClassName("box");
e[0].style.backgroundColor= ran_color();
e[1].style.backgroundColor= ran_color();
e[2].style.backgroundColor= ran_color();
e[3].style.backgroundColor= ran_color();
e[4].style.backgroundColor= ran_color();
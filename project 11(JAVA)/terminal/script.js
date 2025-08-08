async function main() {

      let t= setInterval(() => {
            let last =document.querySelector(".terminal").lastElementChild;
            
            if (last.innerHTML.endsWith("...")){
                  last.innerHTML= last.innerHTML.slice(0,last.innerHTML.length-3);
            }
            else{
                  last.innerHTML += "."
            }
      }, 100);

      async function s(value) {
            return new Promise(resolve => {
                  setTimeout(() => {
                        document.querySelector(".terminal").innerHTML += value;
                        resolve();
                  }, (Math.random() * 6 + 1) * 1000);
                  
            });
      }

      await s("<h3>Initializing Hacking</h3>");
      await s("<h3>Reading your Files</h3>");
      await s("<h3>Password files Detected</h3>");
      await s("<h3>Sending all passwords and personal files to server</h3>");
      await s("<h3>Cleaning up</h3>");
      function randomdelay() {
            return new Promise(resolve => {
                  setTimeout(() => {resolve();}, (Math.random() * 6 + 1) * 1000);                  
            });
      }
      await randomdelay()
      clearInterval(t)
}
main();

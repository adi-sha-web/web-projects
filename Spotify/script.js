let playsong = new Audio();

let namel = [];

function plays(track) {
      playsong.src = "/Spotify/song/A2" + track;
      playsong.play();
      document.getElementById("bplay").src = "svg/pause.svg";

}

function formatSecondsToMinutes(seconds) {
      if (isNaN(seconds) || seconds < 0) {
            return "00:00"; // Return a default value for invalid input
      }
      // const floored = Math.floor(seconds);
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

async function main(fold) {
      console.log("Spotify script loaded");
      let load = await fetch(`http://127.0.0.1:3000/Spotify/song/${fold}/`);
      let res = await load.text();
      let div = document.createElement("div");
      div.innerHTML = res;
      let r = div.getElementsByTagName("a");
      let namel = []
      for (let index = 0; index < r.length; index++) {
            const element = r[index];
            if ((element.innerText).endsWith(".mp3")) {
                  let name = element.innerText
                  namel.push(name);
                  let ins = document.querySelector(".list");
                  setTimeout(() => {
                        ins.innerHTML += `<li class="song"> <img src="svg/song.svg" alt=""> <div class="name">${name}</div> <div class="button"><img src="svg/wplay.svg" alt=""></div> </li>`;
                        // Fade in the newly added item
                        const items = ins.querySelectorAll(".song");
                        const lastItem = items[items.length - 1];
                        Array.from(document.querySelectorAll(".song")).forEach((element) => {

                              let ck = element.querySelector(".button");

                              ck.addEventListener("click", () => {
                                    let song = element.querySelector(".name").innerText;

                                    let c = document.querySelector(".namet");
                                    c.innerText = song.split(".mp3")[0];
                                    plays(song);
                              });
                        });
                  }, index * 150); // 150ms delay between each item
            }
      }

      // Attach event listeners after songs are rendered
      playsong.addEventListener("timeupdate", () => {
            let t = document.querySelector(".time");
            let ct = formatSecondsToMinutes(playsong.currentTime);
            let d = formatSecondsToMinutes(playsong.duration);

            t.innerText = ct + "/" + d;
            document.querySelector(".circle").style.left = (playsong.currentTime / playsong.duration) * 100 + "%";
      })

      document.getElementById("bplay").addEventListener("click", () => {
            if (playsong.paused) {
                  playsong.play();
                  document.getElementById("bplay").src = "svg/pause.svg";
            }
            else {
                  playsong.pause();
                  document.getElementById("bplay").src = "svg/play.svg";

            }
      });

      previous.addEventListener("click", () => {
            let currentSong = document.querySelector(".namet").innerText + ".mp3";
            let idx = namel.indexOf(currentSong);
            if (idx > 0) {
                  let prevSong = namel[idx - 1];
                  console.log(prevSong);
                  document.querySelector(".namet").innerText = prevSong.split(".mp3")[0];
                  plays(prevSong);
            }
      });
      next.addEventListener("click", () => {
            let currentSong = document.querySelector(".namet").innerText + ".mp3";
            let idx = namel.indexOf(currentSong);
            if (idx < namel.length - 1) {
                  let nexSong = namel[idx + 1];
                  console.log(nexSong);
                  document.querySelector(".namet").innerText = nexSong.split(".mp3")[0];
                  plays(nexSong);
            }
      });

      document.querySelector(".timeline").addEventListener("click", e => {
            document.querySelector(".circle").style.left = (e.offsetX / e.target.offsetWidth) * 100 + "%";
            playsong.currentTime = (((e.offsetX / e.target.offsetWidth) * 100) * playsong.duration) / 100;
      });
}

// document.getElementById("play").addEventListener("click", () => {
//       document.querySelector(".list").innerHTML = "";
//       main()
// })

document.querySelector(".ham").addEventListener("click", (e) => {
      document.querySelector(".left").style.left = "0%";
      console.log("clicked");
      e.stopPropagation()
});

document.querySelector(".cross").addEventListener("click", () => {
      document.querySelector(".left").style.left = "-110%";

});

document.querySelector(".right").addEventListener("click", () => {
      if (document.querySelector(".left").style.left == "0%") {
            document.querySelector(".left").style.left = "-110%";
            console.log("clicked");
      }
});

document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {
      console.log(e.target.value,);
      playsong.volume = parseInt(e.target.value) / 100;
      if (e.target.value == 0) {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "svg/volmute.svg";
      }
      else if (e.target.value < 50 && e.target.value > 0) {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "svg/vollow.svg";

      }
      else {
            document.querySelector(".volume").getElementsByTagName("img")[0].src = "svg/volfull.svg";
      }

});


Array.from(document.getElementsByClassName("play")).forEach((e) => {
      e.addEventListener("click", item => {
            let folder = item.currentTarget.dataset.folder;
            document.querySelector(".list").innerHTML = "";
            main(folder);

      });

});
console.log("Spotify script loaded");

let playsong = new Audio();

function pausect() {
      playsong.pause()
      document.getElementById("bplay").src = "svg/play.svg";
      function currenttk(tk) {
            document.querySelectorAll(".content ul li").forEach((e) => {
                  if (e.querySelector(".name").innerText == tk) {
                        e.querySelector(".button img").src = "svg/wplay.svg";
                  }
            });
      }
      let cs = document.querySelector(".namet").innerText + ".mp3"
      currenttk(cs)
}

let folder = "";

let namel = [];

function plays(track) {
      playsong.src = `/Spotify/song/${folder}/` + track;
      playsong.play();
      document.getElementById("bplay").src = "svg/pause.svg";
      function currenttk(tk) {
            document.querySelectorAll(".content ul li").forEach((e) => {
                  if (e.querySelector(".name").innerText == tk) {
                        e.querySelector(".button img").src = "svg/pause.svg";
                  }
                  else {
                        e.querySelector(".button img").src = "svg/wplay.svg";
                  }
            });
      }
      let cs = document.querySelector(".namet").innerText + ".mp3"
      currenttk(cs)
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

//displaying album
displayalbum();

async function displayalbum() {
      let load = await fetch(`http://127.0.0.1:3000/Spotify/song`);
      let res = await load.text();
      let div = document.createElement("div");
      div.innerHTML = res;
      let r = div.getElementsByTagName("a");
      let array = Array.from(r)
      for (let index = 0; index < array.length; index++) {
            const e = array[index];
            if (e.href.includes("/song/")) {
                  let f = e.innerText.split("/")[0];
                  let load = await fetch(`http://127.0.0.1:3000/Spotify/song/${f}/info.json`);
                  let res = await load.json();
                  document.querySelector(".container").innerHTML +=
                        `<div class="card">
                              <img src="song/${f}/cover.jpeg" alt="${res.title}">
                              <div data-folder="${f}" class="play">
                                    <img src="svg/playlogo.svg" alt="">
                              </div>
                              <div class="card-content">
                                    <h4>${res.title}</h4>
                                    <p>${res.artist}</p>
                              </div>
                        </div>`
            }
      }
      Array.from(document.getElementsByClassName("play")).forEach((e) => {
            e.addEventListener("click", item => {
                  document.querySelector(".left").style.left = "0";
                  folder = item.currentTarget.dataset.folder;
                  document.querySelector(".list").innerHTML = "";
                  main(folder);
            });
      });
}

async function main(fold) {
      console.log("Spotify script loaded");
      let load = await fetch(`/Spotify/song/${fold}/`);
      let res = await load.text();
      let div = document.createElement("div");
      div.innerHTML = res;
      let r = div.getElementsByTagName("a");
      namel = [];
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

                              ck.addEventListener("click", (e) => {
                                    let song = element.querySelector(".name").innerText;
                                    let c = document.querySelector(".namet");
                                    c.innerText = song.split(".mp3")[0];
                                    if ((e.target.src).endsWith("wplay.svg")) {
                                          plays(song);
                                    }
                                    else if ((e.target.src).endsWith("pause.svg")) {
                                          pausect()
                                          e.target.src = "svg/wplay.svg";
                                    }
                              });
                        });

                        function currenttk(tk) {
                              document.querySelectorAll(".content ul li").forEach((e) => {
                                    if (e.querySelector(".name").innerText == tk) {
                                          e.querySelector(".button img").src = "svg/pause.svg";
                                    }
                              });
                        }
                        let cs = document.querySelector(".namet").innerText + ".mp3"
                        currenttk(cs)
                  }, index * 150); // 150ms delay between each item
            }
      }

      let c = document.querySelector(".namet");
      c.innerText = (namel[0]).split(".mp3")[0];
      plays(namel[0]);
      // The following code is for debugging: it logs all .button img elements after DOMContentLoaded

      // Attach event listeners after songs are rendered
      playsong.addEventListener("timeupdate", () => {
            let t = document.querySelector(".time");
            let ct = formatSecondsToMinutes(playsong.currentTime);
            let d = formatSecondsToMinutes(playsong.duration);

            t.innerText = ct + "/" + d;
            document.querySelector(".circle").style.left = (playsong.currentTime / playsong.duration) * 100 + "%";
            if (playsong.ended) {
                  let idx = namel.indexOf(c.innerText + ".mp3");
                  if (idx < namel.length - 1) {
                        let nextSong = namel[idx + 1];
                        c.innerText = nextSong.split(".mp3")[0];
                        plays(nextSong);
                  }
            }
      })

      document.getElementById("bplay").addEventListener("click", () => {
            if (playsong.paused) {
                  playsong.play();
                  document.getElementById("bplay").src = "svg/pause.svg";
                  let cs = document.querySelector(".namet").innerText + ".mp3"

                  document.querySelectorAll(".content ul li").forEach((e) => {
                        if (e.querySelector(".name").innerText == cs) {
                              e.querySelector(".button img").src = "svg/pause.svg";
                        }
                  });
            }
            else {
                  pausect();
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

document.querySelector(".ham").addEventListener("click", (e) => {
      document.querySelector(".left").style.left = "0%";
      e.stopPropagation()
});

document.querySelector(".cross").addEventListener("click", () => {
      document.querySelector(".left").style.left = "-100%";

});

document.querySelector(".right").addEventListener("click", (e) => {
      if (document.querySelector(".left").style.left == "0%") {
            document.querySelector(".left").style.left = "-100%";
            e.stopPropagation()
      }
});

let values = "";

document.querySelector(".volume").getElementsByTagName("input")[0].addEventListener("change", (e) => {
      playsong.volume = parseInt(e.target.value) / 100;
      values = e.target.value;
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

document.querySelector(".volume img").addEventListener("click", (e) => {
      e.target.src = "svg/volmute.svg";
      if (document.querySelector(".volume input").value > 0) {
            e.target.src = "svg/volmute.svg";
            document.querySelector(".volume input").value = 0;
            playsong.volume = 0;
      }
      else {
            e.target.src = "svg/volfull.svg";
            document.querySelector(".volume input").value = 100;
            playsong.volume = 1;
      }
});

document.querySelector(".top ul li").addEventListener("click", () => {
      window.location.reload();
})

Array.from(document.getElementsByClassName("play")).forEach((e) => {
      e.addEventListener("click", item => {
            folder = item.currentTarget.dataset.folder;
            document.querySelector(".list").innerHTML = "";
            main(folder);
      });

});





const config = [{
      initDataTypes: ['cenc'],
      audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: 'SW_SECURE_CRYPTO' // or 'HW_SECURE_ALL' depending on your needs
      }]
}];

navigator.requestMediaKeySystemAccess('com.widevine.alpha', config)
      .then(keySystemAccess => {
            // Proceed with creating MediaKeys
      });






displayartist()

async function displayartist() {
      let load = await fetch(`http://127.0.0.1:3000/Spotify/artist`);
      let res = await load.text();
      let div = document.createElement("div");
      div.innerHTML = res;
      let r = div.getElementsByTagName("a");
      let array = Array.from(r)
      for (let index = 0; index < array.length; index++) {
            const e = array[index];
            if (e.href.includes("/artist/")) {
                  let f = e.innerText.split("/")[0];
                  let load = await fetch(`http://127.0.0.1:3000/Spotify/artist/${f}/infor.json`);
                  let res = await load.json();
                  document.querySelector(".mart").innerHTML +=
                        `<div class="artist">
                              <div class="round"><img src="artist/${f}/cover.jpeg" alt=""></div>
                              <div data-folder="${f}" class="aplay">
                                    <img src="svg/playlogo.svg" alt="">
                              </div>
                              <div>
                                    ${res.title}
                                    <p>${res.art}</p>
                              </div>
                        </div>`
            }
      }
      document.querySelector(".floot").innerHTML +=
            `<iframe data-testid="embed-iframe" style="border-radius:12px"
                  src=""
                  width="100%" height="100%" frameBorder="0" allowfullscreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"></iframe>`;
      Array.from(document.getElementsByClassName("aplay")).forEach((e) => {
            e.addEventListener("click", async item => {
                  if (window.matchMedia("(max-width: 1250px)").matches) {
                        // Code for screens smaller than or equal to 1250px
                        document.querySelector(".floot").style.right = "0";
                        folder = item.currentTarget.dataset.folder;
                        let load = await fetch(`http://127.0.0.1:3000/Spotify/artist/${folder}/infor.json`);
                        let res = await load.json();
                        document.querySelector(".floot iframe").src = `${res.add}`;
                  }
                  else if (window.matchMedia("(min-width: 1251px)").matches) {
                        // Code for screens greater than 1250px

                        document.querySelector(".floot").style.display = "block";
                        document.querySelector(".left").style.width = "20%";
                        document.querySelector(".right").style.width = "55%";
                        folder = item.currentTarget.dataset.folder;
                        let load = await fetch(`http://127.0.0.1:3000/Spotify/artist/${folder}/infor.json`);
                        let res = await load.json();
                        document.querySelector(".floot iframe").src = `${res.add}`;
                  }
            });
      });

      // document.querySelector(".aplay").addEventListener("click", () => {
      //       document.querySelector(".floot").style.display = "block";
      //       document.querySelector(".left").style.width = "20%";
      //       document.querySelector(".right").style.width = "55%";
      // });

      document.querySelector(".hb").addEventListener("click", () => {
            if (window.matchMedia("(max-width: 1250px)").matches) {
                  document.querySelector(".floot").style.right = "-100%";
            }
            else if (window.matchMedia("(min-width: 1251px)").matches) {
                  document.querySelector(".floot").style.display = "none";
                  document.querySelector(".left").style.width = "25%";
                  document.querySelector(".right").style.width = "75%";
            }
      });
};




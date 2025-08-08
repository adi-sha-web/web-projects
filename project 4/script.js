let $ = _ => { return document.querySelector(_) };
let C = _ => { return document.getElementsByClassName(_) };
let shuffle = false, repeat = false, playing = false, like = false, mute = false, list = false, seach = false, Hold = false, current = 2, order = false, lsts = undefined, per;

let sorted = [];
let Songs = [
      {
            n: "Carrying You",
            i: "u75x4ys3gomvpg5/carrying_you.jpg",
            s: "diozt6yj4uzab7n/carrying_you.mp3",
            a: "Joe Hisaishi",
            d: "185.84",
            o: 0
      },

      {
            n: "In The End",
            i: "0o6v2zi6nlpq8sg/in_the_end.jpg",
            s: "5nera809vgb6nrr/in_the_end.mp3",
            a: "Linkin Park",
            d: "218.61",
            o: 1
      },

      {
            n: "Let Me Down Slowly",
            i: "1cujg5rbj2fojym/let_me_down_slowly.jpg",
            s: "n4kgpy16cpe9l3d/let_me_down_slowly.mp3",
            a: "Alec Benjamin",
            d: "169.87",
            o: 2
      },

      {
            n: "Tum Hi Ho",
            i: "dnuuwr9gyshfhy5/tum_hi_ho.jpg",
            s: "5xyzwr8m73ew6t8/tum_hi_ho.mp3",
            a: "Arijit Singh",
            d: "262.03",
            o: 3
      },

      {
            n: "Lovely",
            i: "x1fhmgfkfg5mz6t/lovely.jpg",
            s: "2py42eyefr8e57z/lovely.mp3",
            a: "Billie Eilish & Khalid",
            d: "200.54",
            o: 4
      },

      {
            n: "Arcade",
            i: "iclpuv9nj25y16d/arcade.jpg",
            s: "33fztp5xewsddsw/arcade.mp3",
            a: "Duncan Laurence",
            d: "183.09",
            o: 5
      },

      {
            n: "Chahun Main Ya Naa",
            i: "dnuuwr9gyshfhy5/tum_hi_ho.jpg",
            s: "c9eab456nzl4ixq/chahun_main_ya_naa.mp3",
            a: "Arijit Singh",
            d: "304.92",
            o: 6
      },

      {
            n: "Blue Bird",
            i: "efzc63af4b0ffeh/blue_bird.jpg",
            s: "egvkkz1ipek2tgy/blue_bird.mp3",
            a: "Ikimono Gakari",
            d: "216.04",
            o: 7
      },

      {
            n: "All My Love",
            i: "k3pupwp1okubric/all_my_love.webp",
            s: "mx1k3eogxbgqjnl/all_my_love.mp3",
            a: "Aoi Teshima",
            d: "254.06",
            o: 8
      },

      {
            n: "Khamoshiyan",
            i: "vmvyyvdc8f07558/khamoshiyan.jpg",
            s: "ru08ah26symht8m/khamoshiyan.mp3",
            a: "Arijit Singh",
            d: "335.77",
            o: 9
      }
]

const FoldPlayer = () => {
      let bgg = $(".bgg"), cn = $(".cn"), minplayer = $('#minplayer'), pi = $("#playerImage");
      bgg.style.height = "60px";
      cn.style.height = "60px";
      bgg.style.borderRadius = "30px"
      cn.style.borderRadius = "30px"
      minplayer.style.borderRadius = "30px"
      bgg.style.opacity = "0"
      cn.style.opacity = "0"
      pi.style.left = "10px";
      pi.style.top = "calc(100vh - 50px)";
      pi.style.height = "40px";
      pi.style.width = "40px";
      $("#minbtnset").style.display = "block";
      setTimeout(() => {
            $("#minbtnset").style.opacity = "1";
      }, 1)

      if (list) {
            $("#playerImage").style.display = "block";
            setTimeout(() => {
                  $("#playerImage").style.opacity = "1";
            }, 1)
      }
}

const ExpendPlayer = () => {
      let bgg = $(".bgg"), cn = $(".cn"), minplayer = $('#minplayer'), pi = $("#playerImage");
      bgg.style.height = "100vh";
      cn.style.height = "100vh";
      bgg.style.borderRadius = "0"
      cn.style.borderRadius = "0"
      minplayer.style.borderRadius = "0"
      bgg.style.opacity = "1"
      cn.style.opacity = "1"
      pi.style.left = "calc(50vw - calc(100vh / 6))";
      pi.style.top = "calc(25vh - calc(100vh / 6))";
      pi.style.height = "calc(100vh / 3)";
      pi.style.width = "calc(100vh / 3)";
      $("#minbtnset").style.opacity = "0"
      setTimeout(() => {
            $("#minbtnset").style.display = "none";
      }, 1000)
      if (list) {
            $("#playerImage").style.opacity = "0";
            setTimeout(() => {
                  $("#playerImage").style.display = "none";
            }, 300)
      }
}

const seekMove = (e) => {
      let c, W = innerWidth, H = innerHeight;
      try { c = e.pageX } catch { }
      try { c = e.touches[0].pageX } catch { }
      var x = c - W * .075, X, w = W * .85
      if (x < 0) X = 0;
      else if (x > w) X = w;
      else X = x;
      per = Songs[current].d * X / w
      X = 100 * X / W
      $("#changingT").innerHTML = secToMin(per);
      $("#seekDot").style.left = `calc(${X}vw - 7.5px)`;
      $("#seekbarc").style.left = `calc(${X}vw - 85vw)`;
      $("#changingT").style.left = `calc(${X}vw - 25px)`;
}

const onHold = (e) => {
      Hold = true;
      $("#seekDot").style.transform = 'scale(.01)';
      let sb = $('#seekbar')
      sb.style.height = '15px';
      $("#changingT").style.top = "-30px"
      $("#changingT").style.opacity = "1"
      $("#ct").style.opacity = "0";
      $("#dr").style.opacity = "0";
      $("#btnset2").style.opacity = "0";
      if (e.cancelable) e.preventDefault;
      seekMove(e);
}
const onMove = (e) => {
      if (e.cancelable) e.preventDefault;
      if (Hold) seekMove(e);
}
const onRelese = () => {
      $("#seekDot").style.transform = 'scale(1)';
      let sb = $('#seekbar')
      sb.style.height = '3px';
      $("#changingT").style.top = "-10px"
      $("#changingT").style.opacity = "0"
      $("#ct").style.opacity = "1";
      $("#dr").style.opacity = "1";
      $("#btnset2").style.opacity = "1";
      if (Hold) $("#audio").currentTime = per;
      Hold = false;
}

const Shuffle = () => {
      if (!shuffle) {
            $("#sx").style.stroke = "none";
            shuffle = true;
      }
      else {
            $("#sx").style.stroke = "white";
            shuffle = false;
      }
}

const Repeat = () => {
      if (!repeat) {
            $("#r1").style.stroke = "none";
            repeat = true;
      }
      else {
            $("#r1").style.stroke = "white";
            repeat = false;
      }
}

const Like = () => {
      if (like) {
            $("#ld").style.fill = "none";
            like = false;
      }
      else {
            $("#ld").style.fill = "white";
            like = true;
      }
}

const Play = () => {
      ClearWave();
      $("#pe").style.fill = "white";
      $("#pe2").style.fill = "white";
      $("#ps").style.fill = "none";
      $("#ps2").style.fill = "none";
      var p = audio.play();
      if (p !== undefined) { p.then(() => { }).catch(e => { }) }
      $("#vis" + current).style.stroke = "white";
      try {
            $("#vis2" + current).style.stroke = "white";
      } catch { }
      playing = true;
}

const Pause = () => {
      $("#pe").style.fill = "none";
      $("#pe2").style.fill = "none";
      $("#ps").style.fill = "white";
      $("#ps2").style.fill = "white";
      var p = audio.pause();
      if (p !== undefined) { p.then(() => { }).catch(e => { }) }
      $("#vis" + current).style.stroke = "none";
      try {
            $("#vis2" + current).style.stroke = "none";
      } catch { }
      playing = false;
}

const Playing = () => {
      if (!playing) Play();
      else Pause();
}

const Mute = () => {
      if (!mute) {
            $("#volum").style.fill = "none";
            $("#volm").style.fill = "white";
            $("#volbar").innerHTML = "0%";
            audio.muted = true;
            mute = true;
      }
      else {
            $("#volum").style.fill = "white";
            $("#volm").style.fill = "none";
            $("#volbar").innerHTML = "100%";
            audio.muted = false;
            mute = false;
      }
}

const List = () => {
      if (list) {
            $("#listC").style.opacity = "0";
            $("#playerImage").style.opacity = "1";
            $("#playerImage").style.display = "block";
            setTimeout(() => {
                  $("#listC").style.display = "block";

            }, 300)
            list = false;
      }
      else {
            $("#listC").style.opacity = "1";
            $("#playerImage").style.opacity = "0";
            $("#listC").style.display = "block";
            setTimeout(() => {
                  $("#playerImage").style.display = "none";
            }, 300)
            list = true;
      }
}
const RandomPlay = () => {
      current = Math.round(Math.random() * (Songs.length - 1));
      SetToPlayer();
      Play();
}
const Next = () => {
      ++current;
      current %= Songs.length;
      SetToPlayer();
      if (playing) Play();
}

const Prev = () => {
      --current;
      if (current < 0) current = Songs.length - 1
      SetToPlayer();
      if (playing) Play();
}

const ClearWave = () => {
      for (let x of Songs) {
            $("#vis" + x.o).style.stroke = "none";
            try {
                  $("#vis2" + x.o).style.stroke = "none"
            } catch { }
      }
}
const Order = () => {
      if (!order) {
            CreateListItem(sorted, "lists", "cd", "vis")
            $("#cot").innerHTML = "Alphabetical Order"
            order = true;
      }
      else {
            CreateListItem(Songs, "lists", "cd", "vis")
            $("#cot").innerHTML = "Custom Order"
            order = false;
      }
}
const Search = () => {
      if (!search) {
            $("#srch").style.fill = "none";
            $("#back").style.fill = "white";
            $("#search").style.display = "block"
            $("#ctrlc").style.display = "none"
            $("#result").style.display = "block"
            $("#search").select();
            $("#mlst").innerHTML = "";
            search = true;
      }
      else {
            $("#srch").style.fill = "white";
            $("#back").style.fill = "none";
            $("#search").style.display = "none"
            $("#ctrlc").style.display = "flex"
            $("#result").style.display = "none"
            CreateListItem(Songs, "mlst", "cd2", "vis2");
            $("#search").value = ""
            search = false;
      }
}
const searchRes = () => {
      let res = [];
      Songs.forEach(v => {
            let val = $("#search").value;
            val = val.toString();
            val = val.toUpperCase();
            let vn = v.n;
            vn = vn.toString();
            vn = vn.toUpperCase();
            let srch = vn.match(val)
            if (srch == val) res.push(v);
      });
      $("#result").innerHTML = `${res.length} Found`
      CreateListItem(res, "mlst", "cd2", "vis2");
}

const CreateListItem = (v, id, c, s) => {

      $("#" + id).innerHTML = "";
      v.forEach((d, i) => {
            let data = `
<div class="card" id="${c + d.o}" onclick="current = ${d.o};SetToPlayer();Play();">
    <div class="cardin">
        <div class="bgi">
            <div class="ci" style="background-image:url('https://www.dropbox.com/s/${d.i}?raw=1');"></div>
        </div>
        <span>${d.n}</span>
        <span>${d.a}</span>   
        <svg class="vis"viewBox="0 0 100 100" stroke="none" stroke-width="25" stroke-lineCap="round" id="${s + d.o}">
            <line x1="15"y1="15"x2="15"y2="85">
                <animate attributeName="y1" values="15;40;15" dur="1.6s" repeatCount="indefinite" />
                <animate attributeName="y2" values="85;60;85" dur="1.6s" repeatCount="indefinite" />
            </line>
            <line x1="50"y1="15"x2="50"y2="85">
                <animate attributeName="y1" values="15;40;15" dur="1s" repeatCount="indefinite" />
                <animate attributeName="y2" values="85;60;85" dur="1s" repeatCount="indefinite" />
            </line>
            <line x1="85"y1="15"x2="85"y2="85">
                <animate attributeName="y1" values="15;40;15" dur="1.3s" repeatCount="indefinite" />
                <animate attributeName="y2" values="85;60;85" dur="1.3s" repeatCount="indefinite" />
            </line>
        </svg>         
        <div class="buttonC cmen">
            <svg class="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360C94.93 360 120 385.1 120 416C120 446.9 94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07 360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07 40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"/>
             </svg>
         </div>            
     </div>
</div>  
${i < v.length - 1 ? "<hr>" : ""}      
        `;
            $("#" + id).innerHTML += data;
      })
      $("#" + id).innerHTML += "<br><br>";
      if (playing) {
            $("#vis" + current).style.stroke = "white";
            try {
                  $("#vis2" + current).style.stroke = "white";
            } catch { }
      }
}

const secToMin = (t) => {
      t = Math.ceil(parseFloat(t));
      let min = Math.ceil(t / 60);
      let sec = t % 60;
      if (--min < 0) min = 0;
      return min + ":" + (sec < 10 ? "0" : "") + sec;
}

const SetToPlayer = () => {
      let d = Songs[current];
      $("#pimg").style.backgroundImage = `url("https://www.dropbox.com/s/${d.i}?raw=1")`;
      $("#songn").innerHTML = d.n;
      $("#songs").innerHTML = d.a;
      $("#plsn").innerHTML = d.n;
      $("#plsa").innerHTML = d.a;
      $("#dr").innerHTML = secToMin(d.d);
      $("#audio").src = `https://www.dropbox.com/s/${d.s}?raw=1`;
      $("#seekbar").style.background =
            `linear-gradient(90deg, rgba(300,300,300,.6) ${0}%, rgba(200,200,200,.4) ${0}%)`
}

const Dl = () => {
      window.location = `https://www.dropbox.com/s/${Songs[current].s}?dl=1`
}

sorted = [...Songs];
sorted.sort((a, b) => { if (a.n < b.n) return -1 });


const init = () => {

      $("#shuffle").onclick = Shuffle;
      $("#repeat").onclick = Repeat;
      $("#like").onclick = Like;
      $("#playing").onclick = Playing;
      $("#playing2").onclick = Playing;
      $("#down").onclick = FoldPlayer;
      $('#up').onclick = ExpendPlayer;
      $("#vol").onclick = Mute;
      $("#lsb").onclick = List;
      $("#next").onclick = Next;
      $("#prev").onclick = Prev;
      $("#next2").onclick = Next;
      $("#prev2").onclick = Prev;
      $("#order").onclick = Order;
      $("#random").onclick = RandomPlay;
      $("#sb").onclick = Search;
      $("#search").oninput = searchRes;
      $("#download").onclick = Dl;


      // touches and others     
      seekCon.ontouchstart = onHold;
      $('.cn').ontouchmove = onMove;
      seekCon.ontouchend = onRelese;
      seekCon.onmousedown = onHold;
      $('.cn').onmousemove = onMove;
      onmouseup = onRelese;

      CreateListItem(Songs, "mlst", "cd2", "vis2")
      CreateListItem(Songs, "lists", "cd", "vis")

      $("#sn").innerHTML = Songs.length + " Tracks"
      for (let x of C("buttonC")) {
            x.ontouchstart = () => {
                  x.style.transform = "scale(.8)";
                  x.style.background = "rgba(300,300,300,.2)";
                  x.style.transition = "all .1s"

            }
            x.onmousedown = () => {
                  x.style.transform = "scale(.8)";
                  x.style.background = "rgba(300,300,300,.2)";
                  x.style.transition = "all .1s"

            }
            x.ontouchend = () => {
                  x.style.transform = "scale(1)";
                  x.style.background = "transparent";
                  x.style.transition = "all .5s"
            }
            x.onmouseup = () => {
                  x.style.transform = "scale(1)";
                  x.style.background = "transparent";
                  x.style.transition = "all .5s"
            }
      }
      $("#audio").ontimeupdate = () => {
            //console.log(audio.duration)
            if (!Hold) {
                  let p = parseFloat(audio.currentTime / Songs[current].d);
                  $("#seekDot").style.left = `calc(${p * 85}vw - 7.5px)`;
                  $("#seekbarc").style.left = `calc(${p * 85}vw - 85vw)`;
                  $("#changingT").style.left = `calc(${p * 85}vw - 25px)`;
                  $("#ct").innerHTML = secToMin(audio.currentTime);

            }
      }
      audio.onprogress = () => {
            let b = audio.buffered.end(audio.buffered.length - 1);
            let d = audio.duration;
            if (d > 0) {
                  let p = ((b / d) * 100);
                  $("#seekbar").style.background =
                        `linear-gradient(90deg, rgba(300,300,300,.5) ${p}%, rgba(200,200,200,.4) ${p}%)`
            }
      };

      audio.onended = () => {
            if (!repeat) Play();
            else {
                  ++current;
                  current %= Songs.length;
                  if (shuffle) {
                        RandomPlay()
                  }
                  SetToPlayer();
                  Play();
            }
      }
      SetToPlayer();
      setTimeout(() => {
            $("#load").style.opacity = 0;
            $("#load").style.transform = "scale(5000)";
            setTimeout(() => {
                  $("#load").style.display = "none";
                  FoldPlayer();
            }, 500)
      }, 1000)

}
onload = init;
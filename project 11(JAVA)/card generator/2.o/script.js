function createCard(title, cName, views, monthsOld, duration, thumbnail){
    // Finish this function
    document.querySelector(".o").innerHTML = title;
    let c = document.querySelector(".t").children;
    c[0].innerHTML = cName;
    c[4].innerHTML = monthsOld + " months ago";
    if (views > 999 && views < 999999) {
        c[2].innerHTML = Math.floor(views / 1000) + "K views";
    }
    else if (views > 999999 ) {
        c[2].innerHTML = Math.floor(views / 1000000) + "M views";
    }
    else {
        c[2].innerHTML = views + " views";
    }
    document.querySelector(".gi").innerHTML = duration;
}
console.log(createCard("Starting with frontend devlopment | Sigma Web Dev video #1", "AdiWithcodes",76700000, 1, "12:34" ))
  
       
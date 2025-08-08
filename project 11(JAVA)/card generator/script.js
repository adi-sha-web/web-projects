function createCard(title = "Introduction to Backend |Sigma Web Dev video #2", cName = "CodeWithHarry", views = "567000", monthsOld = "7", duration = "12:45") {
    // Finish this function
    let div = document.createElement("div");
    div.className = "container";
    document.body.append(div);

    div = document.createElement("div");
    div.className = "templet";
    document.body.lastElementChild.append(div);

    let im = document.body.lastElementChild.firstElementChild
    im.insertAdjacentHTML("afterbegin", `<img height = 85px src="templet.jpg" alt="templet">`)
    im.insertAdjacentHTML("beforeend", `<p class="gi">${duration}</p>`);

    div = document.createElement("div");
    div.className = "containt";
    document.body.lastElementChild.append(div);

    div = document.createElement("div");
    div.className = "o";
    document.body.lastElementChild.lastElementChild.prepend(div);

    im = document.body.lastElementChild.lastElementChild.firstElementChild;
    im.insertAdjacentHTML("afterbegin", `<p>${title}</p>`);

    div = document.createElement("div");
    div.className = "t";
    document.body.lastElementChild.lastElementChild.append(div);

    im = document.body.lastElementChild.lastElementChild.lastElementChild;
    im.insertAdjacentHTML("afterbegin", `<p>${cName} </p>`);


    if (views > 999 && views < 999999) {
        let NV = Math.floor(views / 1000) + "K views";
        im = document.body.lastElementChild.lastElementChild.lastElementChild;
        im.insertAdjacentHTML("beforeend", `<p> • ${NV}</p>`);
    }
    else if (views > 999999) {
        let NV = Math.floor(views / 1000000) + "M views";
        im = document.body.lastElementChild.lastElementChild.lastElementChild;
        im.insertAdjacentHTML("beforeend", `<p> • ${NV} </p>`);
    }
    else {
        im = document.body.lastElementChild.lastElementChild.lastElementChild;
        im.insertAdjacentHTML("beforeend", `<p> • ${views}  views </p>`);
    }

    im = document.body.lastElementChild.lastElementChild.lastElementChild;
    im.insertAdjacentHTML("beforeend", `<p> • ${monthsOld} months ago </p>`);

}
// createCard("Starting with frontend devlopment | Sigma Web Dev video #1", "AdiWithcodes",76700000, 1, "12:34");
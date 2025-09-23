let searchbar = document.querySelector("#searchbar");
let searchbarTextarea = document.querySelector("#searchbar textarea");
let searchbarTextareaSearchiconHiden = document.querySelector("#searchbar #searchicon_hidden");
let searchbarCloseIcon = document.querySelector("#searchbar_close_icon svg");

searchbarTextarea.addEventListener("click", () => {
    searchbar.classList.add("tap");
    searchbarTextarea.classList.add("tap");
    searchbarTextareaSearchiconHiden.classList.add("tap");
});

searchbarTextarea.addEventListener("blur", () => {
    searchbar.classList.remove("tap");
    searchbarTextarea.classList.remove("tap");
    searchbarTextareaSearchiconHiden.classList.remove("tap");
});

searchbarTextarea.addEventListener("input", () => {
    if(searchbarTextarea.value != ""){
        searchbarCloseIcon.classList.add("tap");
    }
    else{
        searchbarCloseIcon.classList.remove("tap");   
    }
});

searchbarCloseIcon.addEventListener("mousedown", (e) => {
    e.preventDefault(); // prevent textarea blur
    searchbarTextarea.value = "";
    searchbarCloseIcon.classList.remove("tap");
});

let menu = document.querySelector("#menu_icon");
let leftSideBar = document.querySelector("#left_side_bar");

menu.onclick = function(){
    leftSideBar.classList.toggle("minimize");
}

// Menu for three dot will apprear when we will click on three dot
let threedots = document.querySelectorAll(".threedot");
let threedotMenu = document.querySelector(".threedot_menu");

threedots.forEach((threedot) => 
    threedot.addEventListener("click", (e)=> {
    threedotMenu.style.display = "block";
    console.log(`${e.pageX}px`);
    if (e.pageX < 1300) {
        if (leftSideBar.classList.contains("minimize")) {
        threedotMenu.style.top = `${e.pageY}px`;
        threedotMenu.style.left = `${e.pageX - 88}px`;
        }
        else{
            threedotMenu.style.top = `${e.pageY}px`;
            threedotMenu.style.left = `${e.pageX - 236}px`;
        }
    }
    else{
        if (leftSideBar.classList.contains("minimize")) {
        threedotMenu.style.top = `${e.pageY}px`;
        threedotMenu.style.left = `${e.pageX - 348}px`;
        }
        else{
            threedotMenu.style.top = `${e.pageY}px`;
            threedotMenu.style.left = `${e.pageX - 500}px`;
        }
    }
    }
))

document.addEventListener("click", (e) => {
  if (!threedotMenu.contains(e.target) && !e.target.classList.contains("threedot")) {
    threedotMenu.style.display = "none";
  }
});





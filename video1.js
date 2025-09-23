// Load comments from local storage (Local storage implementation)
document.addEventListener("DOMContentLoaded", () => {
    let localstorage_comment = JSON.parse(localStorage.getItem("comments"));
    localstorage_comment.forEach((comment) => comments.push(comment));
    updateTaskList();
})


let searchbar = document.querySelector("#searchbar");
let searchbarTextarea = document.querySelector("#searchbar textarea");
let searchbarTextareaSearchiconHiden = document.querySelector("#searchbar #searchicon_hidden");
let searchbarCloseIcon = document.querySelector("#searchbar_close_icon svg");
// search bar click operation
searchbarTextarea.addEventListener("click", () => {
    searchbar.classList.add("tap");
    searchbarTextarea.classList.add("tap");
    searchbarTextareaSearchiconHiden.classList.add("tap");
});
// search bar outside click operation (close the active search bar)
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

// Left side Menu bar open/close 
let menu = document.querySelector("#menu_icon");
let leftSideBar = document.querySelector("#left_side_bar");

leftSideBar.classList.add("minimize");
menu.onclick = function(){
    leftSideBar.classList.toggle("minimize");
}

document.onclick = function(e){
        // If the click was outside both the sidebar and the menu button, close (minimize) the sidebar.
if (!leftSideBar.contains(e.target) && !menu.contains(e.target)) {
    leftSideBar.classList.add("minimize");
}
}

// comment section
let CommentSecTextarea = document.querySelector("#comments");

CommentSecTextarea.addEventListener("input", function() {
    this.style.height = this.scrollHeight + "px";
});

// Comments-count activated
let CommentCount = document.querySelector(".comment_count h2");

updateCommentCount();

function updateCommentCount(){
    let comments = document.querySelectorAll(".comment");
    CommentCount.innerText = comments.length + " Comments";
}

// introduce array or, list for comments (for local storage implementation)
const comments = [];


// New Comment - 
CommentSecTextarea.addEventListener("keydown", (e)=>{
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        let comment_text = CommentSecTextarea.value.trim();
        if (comment_text) {
            comments.push({profile: "profile", profile_name: "@user", description: comment_text});
            updateTaskList();
        }
    }
})

function updateTaskList(){
    let CommentList = document.querySelector(".comment_list");
    CommentList.innerHTML = "";
    comments.forEach((comment) => {
        let newcomment = document.createElement("div");
        newcomment.classList.add("comment");
        newcomment.innerHTML = `<div class="profile"></div>
                        <div class="comm_des">
                        <div class="profile_name"> @user</div>
                        <div class="comment_description"> ${comment.description} </div>
                        <div class="Like"> 
                        <div id="like">
                        <img src="Youtube/like.svg" alt=""> 
                        <p>100</p>
                        </div>
                        <div class="Dislike">
                            <img src="Youtube/dislike.svg" alt="" id="dislike"> 
                        </div>
                        </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24" id="threedot" class="comment_threedot">
                        <circle cx="12" cy="5" r="2"/>
                        <circle cx="12" cy="12" r="2"/>
                        <circle cx="12" cy="19" r="2"/>
                        </svg>
                        `
        CommentList.appendChild(newcomment);});
        
        CommentSecTextarea.value = "";
        updateCommentCount();
        saveComments();
    }

// Local storage implementation
const saveComments = () => {
    localStorage.setItem("comments", JSON.stringify(comments));
}

// threedot menu 
let threedotMenu = document.querySelector(".threedot_menu");
let threedots = document.querySelectorAll(".right_side_video_container .threedot");
threedots.forEach((threedot) => 
    threedot.addEventListener("click", (e)=> {
    threedotMenu.style.display = "block";
    threedotMenu.style.left = `${e.pageX - 244}px`;
    threedotMenu.style.top = `${e.pageY + 16}px`;
})) 

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("threedot")) {
    threedotMenu.style.display = "none";
  }
});

// subscribe button action
let subscribe = document.querySelector(".Subscribe");
let subscribemenu = document.querySelector(".Subscribe_div");

const subscribed = `
  <img src="Youtube/notification.svg" alt="" id="Subscribe_notification">
  <p>Subscribed</p>
  <img src="Youtube/downarrow.svg" alt="" id="Subscribe_downarrow">
`;

const unsubscribed = `
  <img src="Youtube/notification.svg" alt="" id="Subscribe_notification">
  <img src="Youtube/downarrow.svg" alt="" id="Subscribe_downarrow">
`;

let isSubscribed = false;

// Subscribe button further animation based on subscribe menu
let all = document.querySelector(".all");
let Personalized = document.querySelector(".Personalized");
let None = document.querySelector(".None");
let Unsubscribe = document.querySelector(".Unsubscribe");

subscribe.addEventListener("click", (e) => {
    if (!isSubscribed) {
    subscribe.innerHTML = subscribed;
    subscribe.style.backgroundColor = "#ff5df1ff";
    
    // After 100 miliseconds, it will rotate and move little right
    setTimeout(() => {
        Subscribe_notification.style.transform = "rotate(20deg)";
    }, 100);
    // After 100 miliseconds, it will rotate and move little right
    setTimeout(() => {
        Subscribe_notification.style.transform = "rotate(-20deg)";
    }, 160); 
    // After 400 miliseconds, remove the text
    setTimeout(() => {
    subscribe.innerHTML = `<img src="Youtube/notification.svg" alt="" id="Subscribe_notification">
                          <img src="Youtube/downarrow.svg" alt="" id="Subscribe_downarrow">
                          `;
    Subscribe_notification.style.transform = "rotate(0deg)";
    subscribe.style.backgroundColor = "#181818";
    }, 400); 

    isSubscribed = true;

    all.style.backgroundColor = "#eeeeee";
    None.style.backgroundColor = "#eeeeee";
    Unsubscribe.style.backgroundColor = "#eeeeee";
    Personalized.style.backgroundColor = "#cdcdcd";
    }
    else{
    // Show the menu relative to button position
    let rect = subscribe.getBoundingClientRect();
    let menuHeight = subscribemenu.offsetHeight || 200; // fallback if hidden
    let spaceBelow = window.innerHeight - rect.bottom;

    subscribemenu.style.display = "block";

    if (spaceBelow < menuHeight) {
      // Not enough space below → show above
      subscribemenu.style.top = `${rect.top + window.scrollY - menuHeight - 10}px`;
    } else {
      // Enough space below → show below
      subscribemenu.style.top = `${rect.bottom + window.scrollY + 10}px`;
    }
        subscribemenu.style.left = `${rect.left + window.scrollX}px`;
    
    // click on all
    all.onclick = function(){
        subscribe.innerHTML = `<img src="Youtube/All.svg" alt="" id="Subscribe_notification">
                            <img src="Youtube/downarrow.svg" alt="" id="Subscribe_downarrow">
                            `;
        Personalized.style.backgroundColor = "#eeeeee";
        None.style.backgroundColor = "#eeeeee";
        Unsubscribe.style.backgroundColor = "#eeeeee";
        all.style.backgroundColor = "#cdcdcd";
        subscribemenu.style.display = "none";
    }
    // click on Personalized
    Personalized.onclick = function(){
        subscribe.innerHTML = `<img src="Youtube/notification.svg" alt="" id="Subscribe_notification">
                            <img src="Youtube/downarrow.svg" alt="" id="Subscribe_downarrow">
                            `;
        all.style.backgroundColor = "#eeeeee";
        None.style.backgroundColor = "#eeeeee";
        Unsubscribe.style.backgroundColor = "#eeeeee";
        Personalized.style.backgroundColor = "#cdcdcd";
        subscribemenu.style.display = "none";
    }
    // click on None
    None.onclick = function(){
        subscribe.innerHTML = `<img src="Youtube/None.svg" alt="" id="Subscribe_notification">
                            <img src="Youtube/downarrow.svg" alt="" id="Subscribe_downarrow">
                            `;
        all.style.backgroundColor = "#eeeeee";
        Personalized.style.backgroundColor = "#eeeeee";
        Unsubscribe.style.backgroundColor = "#eeeeee";
        None.style.backgroundColor = "#cdcdcd";
        subscribemenu.style.display = "none";
    }
    // click on Unsubscribe
    Unsubscribe.onclick = function(){
        subscribe.innerHTML = `<p>Subscribe</p>`;
        all.style.backgroundColor = "#eeeeee";
        Personalized.style.backgroundColor = "#eeeeee";
        None.style.backgroundColor = "#eeeeee";
        Unsubscribe.style.backgroundColor = "#cdcdcd";
        subscribemenu.style.display = "none";
        isSubscribed = false;
    }
    }
})

document.addEventListener("click", (e) => {
  if (!subscribe.contains(e.target) && !subscribemenu.contains(e.target)) {
    subscribemenu.style.display = "none";
  }
});



// Like and Dislike button
let like = document.querySelector("#like");
let dislike = document.querySelector(".Dislike");

const defaultLike = like.innerHTML;
const defaultDislike = dislike.innerHTML;

const liked = `<img src="Youtube/likeFilled.svg" alt=""> 
                        <p>101</p>`;
                    
const disliked = `<img src="Youtube/dislikeFilled.svg" alt="" id="dislike"> `;                        

like.onclick = function(){
    dislike.innerHTML = defaultDislike;
    if (like.innerHTML == liked) {
        like.innerHTML = defaultLike;
    }
    else{
        like.innerHTML = liked;
    }
}

dislike.onclick = function(){
    like.innerHTML = defaultLike;
    if (dislike.innerHTML == disliked) {
        dislike.innerHTML = defaultDislike;
    }
    else{
        dislike.innerHTML = disliked;
    }
}

// video description height expand and compression
ongoingVideoDescription = document.querySelector(".ongoing_video_video_description");
ongoingVideoDescriptionTextContainer = document.querySelector(".ongoing_video_video_description div");
ongoingVideoDescription.onclick = function(){
    ongoingVideoDescriptionTextContainer.classList.toggle("tap");
    ongoingVideoDescription.classList.toggle("tap");
}


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("body").classList.add("js");

    //load footer and header
    loadTop();
    loadBottom();  

    // modify the title logo based on if it is dark mode
    if (window.matchMedia) {
        const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
        colorSchemeQuery.addEventListener("change", updateFavicon);
        updateFavicon();
    }
});



function updateFavicon() {
    /* modify the title logo based on if it is dark mode */
    const isDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const favicon = document.getElementById("favicon");
    const faviconDark = document.getElementById("favicon-dark");

    if (isDarkMode) {
        favicon.setAttribute("disabled", "disabled");
        faviconDark.removeAttribute("disabled");
    } else {
        favicon.removeAttribute("disabled");
        faviconDark.setAttribute("disabled", "disabled");
    }
}
    
function loadTop() { 
    /* load top ("headerpage.html") to every single page */
    fetch("headerpage.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("#headerpage").innerHTML = data;
            // js on the top
            initTop();
    });
}

function loadBottom() { 
    /* load bottom ("footerpage.html") to every single page */
    fetch("footerpage.html")
        .then((response) => response.text())
        .then((data) => {
            document.querySelector("#footerpage").innerHTML = data;
            // js on the bottom
            initBottom();
        });
    
    
}


// js at Hearder part
function initTop() {
    const mobileMenu = document.getElementById("mobile-menu");
    const menuButton = document.getElementById("menu-button");
    const menuCover = document.getElementById("menu-cover");
    const contactUs = document.getElementById("contact-us-mobile");
    const faqs = document.getElementById("faqs-mobile");
    const destinationsButton = document.getElementById("destinations-mobile");
    const destinationsList = document.getElementById("destinations-mobile-dropdown");

    // the menu cover displayed (turn dark on the page) when the mobile menu is expanded
    menuButton.addEventListener("click", function () {
        if (mobileMenu.style.left == "-75%" || mobileMenu.style.left == "") {
            expandMobileMenu(mobileMenu, menuCover);
        } else {
            collapseMobileMenu(mobileMenu, menuCover);
        }
    });

    // click on the menu cover to collapse the mobile menu
    menuCover.addEventListener("click", function () { collapseMobileMenu(mobileMenu, menuCover) });

    // add a yellow indicator based on which page the user is visiting
    const yellow = "#fcc500";
    if (["/destinations.html", "/outdoors.html", "/attraction.html", "/culture.html", "/arts.html"].includes(currentLocation)) { 
        document.getElementById("destinations-desktop").style.borderColor = yellow;
        document.getElementById("destinations-mobile").style.borderColor = yellow;
    }
    if (currentLocation == "/dining.html") {
        document.getElementById("dining-desktop").style.borderColor = yellow;
        document.getElementById("dining-mobile").style.borderColor = yellow;
    }
    if (currentLocation == "/shopping.html") { 
        document.getElementById("shopping-desktop").style.borderColor = yellow;
        document.getElementById("shopping-mobile").style.borderColor = yellow;
    }
    if (currentLocation == "/transport.html") { 
        document.getElementById("transport-desktop").style.borderColor = yellow;
        document.getElementById("transport-mobile").style.borderColor = yellow;
    }
    if (currentLocation == "/accommodation.html") { 
        document.getElementById("accommodation-desktop").style.borderColor = yellow;
        document.getElementById("accommodation-mobile").style.borderColor = yellow;
    }
    if (currentLocation == "/about-us.html") { 
        document.getElementById("about-us-desktop").style.borderColor = yellow;
        document.getElementById("about-us-mobile").style.borderColor = yellow;
    }

    // expand or callapse the destination sublist
    destinationsButton.addEventListener("click", function () {
        if (destinationsList.style.display == ""
            || destinationsList.style.display == "none") {
            destinationsList.style.display = "flex";
            destinationsButton.children[1].innerHTML= "&nbsp&nbspDestinations &#x25B4";
        }
        else {
            destinationsList.style.display = "none";
            destinationsButton.children[1].innerHTML= "&nbsp&nbspDestinations &#x25BE";
        }
    });
}


function initBottom() {
    const mediaQuery = window.matchMedia(
    "(max-width: 1080px) and (min-resolution: 250dpi), (max-width: 720px)"
        );
    const images = document.querySelectorAll(".icon");

    /* change image style (actually change to different image (different color, same size)) when hover */
    images.forEach((image) => {
        const originalSrc = image.src;
        const hoverSrc = image.dataset.hoverSrc;
        image.addEventListener("mouseover", function () {
            image.src = hoverSrc;
        });
        image.addEventListener("mouseout", function () {
            image.src = originalSrc;
        });
    });


    /* check the email address is valid or not */
    const emailInput = document.getElementById('email-input');
    const goButton = document.getElementById('go-button');

    goButton.addEventListener("click", function () { getEmailAddress(emailInput) });
    emailInput.addEventListener('keyup',
        function (event) {
            if (event.key == "Enter") {
                getEmailAddress(emailInput)
            }
        });
};

function expandMobileMenu(mobileMenu, menuCover) { 
    /*expand the mobile menu*/
    mobileMenu.style.left = "0px";
    menuCover.style.visibility = "visible";
}

function collapseMobileMenu(mobileMenu, menuCover) { 
    mobileMenu.style.left = "-75%";
    menuCover.style.visibility = "hidden";
}



function isValidEmail(email) {
    /* define the regular expression of a valid email address */
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
}

function getEmailAddress(emailInput) {
    const email = emailInput.value;
    if (email=="") {
        const info = document.getElementById("empty-warning");
        pop(info);
    }
    else
        if (isValidEmail(email)) {
        const info = document.getElementById("valid-subscribed");
        pop(info);
    } else {
        const info = document.getElementById("invalid-warning");
        pop(info);
    }
    emailInput.value = "";
}
    

function pop(info) { 
    /* pop the window to tell the result, whcih last for 3 secs. */
    info.style.visibility = "visible";
    setTimeout(function() {
            info.style.visibility = 'hidden';
        }, 1500);
    
}





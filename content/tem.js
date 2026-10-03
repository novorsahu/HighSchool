


/* =========================================================
   HIGHSCHOOL - SUBJECT PAGE SCRIPT
   File: tem.js
========================================================= */


/* =========================================================
   CHAPTER ORDER
========================================================= */

const topicOrder = [
    "chap-1",
    "chap-2",
    "chap-3",
    "chap-4",
    "chap-5",
    "chap-6",
    "chap-7",
    "chap-8",
    "chap-9",
    "chap-10",
    "chap-11",
    "chap-12",
    "chap-13",
    "chap-14",
    "chap-15"
];


let currentIndex = -1;


/* =========================================================
   SIDEBAR TOGGLE
========================================================= */

function toggleSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}


/* =========================================================
   CLOSE SIDEBAR ON MOBILE
========================================================= */

function closeSidebarOnMobile() {

    const sidebar = document.getElementById("sidebar");

    if (
        window.innerWidth <= 768 &&
        sidebar &&
        sidebar.classList.contains("open")
    ) {
        sidebar.classList.remove("open");
    }
}


/* =========================================================
   CLOSE SIDEBAR WHEN SUBJECT HEADING (H4) IS CLICKED
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sidebar = document.getElementById("sidebar");
    const sidebarHeading = sidebar?.querySelector("h4");

    if (!sidebar || !sidebarHeading) return;

    sidebarHeading.addEventListener("click", function () {

        // Close mobile sidebar
        sidebar.classList.remove("open");

        // Remove any inline transform if present
        sidebar.style.transform = "";

    });

});


















/* =========================================================
   HIGHSCHOOL
   MATHEMATICAL SYMBOL / ICON SLIDER
   File: template.js
   ========================================================= */

/* =========================================================
   MATHEMATICAL SYMBOL / ICON SLIDER
========================================================= */

const mathSymbols = [
    {
        type: "image",
        src: "https://img.icons8.com/?size=100&id=9428&format=png&color=000000",
        duration: 2500,
        animation: "slide-left"
    },


    {
    type: "image",
    src:"../../assets/img/favicon/theta (3).png",
    duration: 2400,
    animation: "rotate"
},
    {
        type: "image",
        src: "https://img.icons8.com/?size=100&id=SlHf6Bk5Ulzx&format=png&color=000000",
        alt: "Mathematics",
        duration: 2500,
        animation: "slide-right"
    },
    {
        type: "image",
        src: "https://img.icons8.com/?size=100&id=38531&format=png&color=000000",
        alt: "Mathematics",
        duration: 2500,
        animation: "scale"
    },

{
    type: "video",
    src: "../../assets/img/favicon/multiply.mp4",
    duration: 4000,
    animation: "slide-left"
},
    {
        type: "image",
        src: "https://img.icons8.com/?size=100&id=77483&format=png&color=000000",
        duration: 2500,
          animation: "rotate"
    },
    {
        type: "image",
        src: "https://img.icons8.com/?size=100&id=79475&format=png&color=000000",
        duration: 2500,
        animation: "slide-down"
    },
    {
        type: "image",
        src: "https://img.icons8.com/?size=100&id=62154&format=png&color=000000",
        duration: 2500,
        animation: "zoom"
    }, 

    {
    type: "icon",
    content: "fi fi-rs-infinity",
    duration: 2400,
    animation: "rotate"
},

{
        type: "image",
        src: "../../assets/img/favicon/square-root.png",
        duration: 2500,
        animation: "zoom"
    },

{
    type: "video",
    src: "../../assets/img/favicon/maths.mp4",
    duration: 4000,
    animation: "scale"
},

];




      

let mathSymbolIndex = 0;
let mathSymbolTimer = null;

function getMathSymbolSlot() {
    return document.querySelector("#sidebar h4 .math-symbol-slot");
}

function createMathSymbol(item) {
    const symbol = document.createElement("span");

    symbol.className = "math-symbol";
    symbol.classList.add(`math-animation-${item.animation}`);

    if (item.type === "text") {
        symbol.textContent = item.content;
    }

    if (item.type === "image") {
        const image = document.createElement("img");

        image.src = item.src;
        image.alt = item.alt || "Mathematical icon";
        image.draggable = false;
        image.decoding = "async";

        symbol.appendChild(image);
    }

if (item.type === "icon") {
    const icon = document.createElement("i");
    icon.className = item.content;

    icon.style.color = "#0056b3";
    icon.style.webkitTextFillColor = "#0056b3";

    symbol.appendChild(icon);
}


if (item.type === "video") {
    const video = document.createElement("video");

    video.src = item.src;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";

    symbol.appendChild(video);
}

    return symbol;
}









function showMathSymbol() {
    const slot = getMathSymbolSlot();

    if (!slot || mathSymbols.length === 0) {
        return;
    }

    clearTimeout(mathSymbolTimer);

    const oldSymbol = slot.querySelector(".math-symbol");

    if (oldSymbol) {
        oldSymbol.remove();
    }

    const item = mathSymbols[mathSymbolIndex];
    const symbol = createMathSymbol(item);

    slot.appendChild(symbol);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            symbol.classList.add("math-symbol-visible");
        });
    });

    mathSymbolTimer = setTimeout(() => {
        mathSymbolIndex++;

        if (mathSymbolIndex >= mathSymbols.length) {
            mathSymbolIndex = 0;
        }

        showMathSymbol();
    }, item.duration);
}

function startMathSymbolSlider() {
    if (!Array.isArray(mathSymbols) || mathSymbols.length === 0) {
        return;
    }

    showMathSymbol();
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        startMathSymbolSlider,
        { once: true }
    );
} else {
    startMathSymbolSlider();
}

















/* =========================================================
   LOAD CHAPTER CONTENT
========================================================= */

function loadContent(topicKey, element = null) {

    const index = topicOrder.indexOf(topicKey);

    if (index === -1) {

        console.warn(
            "HighSchool: Invalid chapter:",
            topicKey
        );

        return;
    }


    currentIndex = index;


    fetch(`${topicKey}.html`)
        .then(response => {

            if (!response.ok) {
                throw new Error("Chapter not found");
            }

            return response.text();
        })


        .then(html => {

            const contentArea =
                document.getElementById("content-area");


            if (!contentArea) {
                return;
            }


            /* -----------------------------------------
               CHAPTER CONTENT
            ----------------------------------------- */

            contentArea.innerHTML = html;


            /* -----------------------------------------
               NEXT / BACK BUTTONS
            ----------------------------------------- */

            contentArea.innerHTML += `

                <div class="nav-buttons">

                    <button
                        class="nav-btn back-btn"
                        onclick="goBack()"
                        ${currentIndex <= 0 ? "disabled" : ""}
                    >

                        <i class="bi bi-arrow-left-short"></i>
                       

                        <span>Back</span>

                    </button>


                    <button
                        class="nav-btn next-btn"
                        onclick="goNext()"
                        ${currentIndex >= topicOrder.length - 1 ? "disabled" : ""}
                    >

                        <span>Next</span>

                        <i class="bi bi-arrow-right-short"></i>

                    </button>

                </div>

            `;


            /* -----------------------------------------
               ACTIVE SIDEBAR ITEM
            ----------------------------------------- */

            document
                .querySelectorAll("#sidebar li")
                .forEach(li => {

                    li.classList.remove("active");

                });


            if (element) {

                element.classList.add("active");

            } else {

                const activeItem =
                    document.querySelector(
                        `#sidebar li[data-key="${topicKey}"]`
                    );


                if (activeItem) {

                    activeItem.classList.add("active");

                }
            }


            closeSidebarOnMobile();

        })


        .catch(error => {

            console.error(
                "HighSchool: Error loading chapter:",
                error
            );


            const contentArea =
                document.getElementById("content-area");


            if (contentArea) {

                contentArea.innerHTML = `
                    <p>Content not found.</p>
                `;

            }

        });
}


/* =========================================================
   NEXT CHAPTER
========================================================= */

function goNext() {

    if (
        currentIndex >= 0 &&
        currentIndex < topicOrder.length - 1
    ) {

        const nextKey =
            topicOrder[currentIndex + 1];


        window.location.hash = nextKey;
    }
}


/* =========================================================
   PREVIOUS CHAPTER
========================================================= */

function goBack() {

    if (currentIndex > 0) {

        const previousKey =
            topicOrder[currentIndex - 1];


        window.location.hash = previousKey;
    }
}


/* =========================================================
   SIDEBAR CHAPTER CLICK
========================================================= */

function navigateToHash(key, element) {

    const currentHash =
        window.location.hash.substring(1);


    /*
       Same chapter par dobara click kiya gaya
    */

    if (currentHash === key) {

        loadContent(key, element);

        return;
    }


    /*
       Hash change hoga.
       hashchange event chapter load karega.
    */

    window.location.hash = key;
}


/* =========================================================
   HASH CHANGE
========================================================= */

window.addEventListener("hashchange", () => {

    const hash =
        window.location.hash.substring(1);


    /*
       Hash nahi hai
       → Subject home page
       → Existing/default HTML content ko
         browser normally load karega.
    */

    if (!hash) {

        currentIndex = -1;

        return;
    }


    /*
       Invalid hash
    */

    if (!topicOrder.includes(hash)) {

        currentIndex = -1;

        return;
    }


    const element =
        document.querySelector(
            `#sidebar li[data-key="${hash}"]`
        );


    loadContent(hash, element);
});


/* =========================================================
   PAGE LOAD / REFRESH
========================================================= */




function goToSubjectHome() {

    const cleanUrl =
        window.location.pathname +
        window.location.search;

    window.history.replaceState(
        null,
        "",
        cleanUrl
    );

    loadIntro();
}







/* =========================================================
   PAGE LOAD / REFRESH
========================================================= */

window.addEventListener("DOMContentLoaded", () => {

    const hash =
        window.location.hash.substring(1);

    /*
       Valid chapter hash
       → chapter load karo
    */

    if (
        hash &&
        topicOrder.includes(hash)
    ) {

        const element =
            document.querySelector(
                `#sidebar li[data-key="${hash}"]`
            );

        loadContent(hash, element);

        return;
    }

    /*
       No hash
       → Intro automatically load karo
    */

    if (!hash) {

        loadIntro();

    }

});







/* =========================================================
   SUBJECT HOME / SIDEBAR H4 CLICK
========================================================= */


    /*
       Subject page ko normal URL par reload karo.

       Example:

       maths.html#chap-5

       ↓

       maths.html
    */


/* =========================================================
   SUBJECT H4 → INTRO
========================================================= */



/* =========================================================
   SUBJECT LIST
========================================================= */

function changeSubject(subject) {

    const allLists =
        document.querySelectorAll(".subject-list");


    allLists.forEach(list => {

        list.style.display = "none";

    });


    const selectedList =
        document.getElementById(subject);


    if (selectedList) {

        selectedList.style.display = "block";

    }
}


/* =========================================================
   COMPONENT LOADER
========================================================= */

function loadComponent(id, file) {

    fetch(file)

        .then(response => response.text())

        .then(data => {

            const element =
                document.getElementById(id);


            if (!element) {
                return;
            }


            element.innerHTML = data;


            /* -----------------------------------------
               HEADER MOBILE NAVIGATION
            ----------------------------------------- */

            if (id === "header") {

                const toggle =
                    document.querySelector(
                        ".mobile-nav-toggle"
                    );


                const navbar =
                    document.querySelector(
                        "#navbar"
                    );


                if (toggle && navbar) {

                    toggle.addEventListener(
                        "click",
                        function () {

                            navbar.classList.toggle(
                                "navbar-mobile"
                            );


                            this.classList.toggle(
                                "bi-list"
                            );


                            this.classList.toggle(
                                "bi-x"
                            );

                        }
                    );
                }


                /* -------------------------------------
                   MOBILE DROPDOWN
                ------------------------------------- */

                const dropdownLinks =
                    document.querySelectorAll(
                        ".navbar .dropdown > a"
                    );


                dropdownLinks.forEach(link => {

                    link.addEventListener(
                        "click",
                        function (e) {

                            if (
                                navbar &&
                                navbar.classList.contains(
                                    "navbar-mobile"
                                )
                            ) {

                                e.preventDefault();


                                this.nextElementSibling
                                    .classList.toggle(
                                        "dropdown-active"
                                    );
                            }

                        }
                    );

                });

            }

        })


        .catch(error => {

            console.error(
                "Error loading " + file,
                error
            );

        });
}


/* =========================================================
   COMPONENT PATH
========================================================= */

function getPath(file) {

    const depth =
        window.location.pathname
            .split("/")
            .length;


    if (depth > 3) {

        return "../" + file;

    } else {

        return file;

    }
}


/* =========================================================
   LOAD HEADER & FOOTER
========================================================= */

loadComponent(
    "header",
    getPath("header.html")
);


loadComponent(
    "footer",
    getPath("footer.html")
);





/*========= intro  loading  ========*/




/* =========================================================
   INTRO CONTENT
========================================================= */

async function loadIntro() {

    const contentArea =
        document.getElementById("content-area");

    if (!contentArea) {
        return;
    }

    try {

        const response =
            await fetch("./intro.html");

        if (!response.ok) {
            throw new Error(
                "intro.html not found"
            );
        }

        const html =
            await response.text();

        contentArea.innerHTML = html;

        currentIndex = -1;

        /* Remove active chapter */

        document
            .querySelectorAll("#sidebar li")
            .forEach(li => {
                li.classList.remove("active");
            });

    } catch (error) {

        console.error(
            "HighSchool: Error loading intro:",
            error
        );

    }
}
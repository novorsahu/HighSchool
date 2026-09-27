  /**
   * Mobile nav toggle
   */
 
// Utility function to select elements
function select(el, all = false) {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
}

// Utility function to bind events
function on(eventType, selector, listener, all = false) {
  let elements = select(selector, all);
  if (elements) {
    if (all) {
      elements.forEach(el => el.addEventListener(eventType, listener));
    } else {
      elements.addEventListener(eventType, listener);
    }
  }
}

// Mobile nav toggle
on('click', '.mobile-nav-toggle', function(e) {
  select('#navbar').classList.toggle('navbar-mobile');
  this.classList.toggle('bi-list');
  this.classList.toggle('bi-x');
});

// Mobile nav dropdowns activate
on('click', '.navbar .dropdown > a', function(e) {
  if (select('#navbar').classList.contains('navbar-mobile')) {
    e.preventDefault();
    this.nextElementSibling.classList.toggle('dropdown-active');
  }
}, true);












const topicOrder = ["intro", "headings", "paragraphs", "images", "links"];
let currentIndex = 0;

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}


// on and select use karne k liye





// ADVANCED SEARCH BAR : Sidebar + Loaded Content
/*
function advancedSearch() {
  const input = document.getElementById("searchInput").value.toLowerCase();

  // Filter Sidebar Items
  const sidebarItems = document.querySelectorAll("#sidebar li");
  sidebarItems.forEach(item => {
    const text = item.innerText.toLowerCase();
    if (text.includes(input)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  // Filter Loaded Content (only if content already loaded)
  const contentArea = document.getElementById("content-area");
  const originalContent = contentArea.getAttribute("data-original");

  if (!originalContent) {
    contentArea.setAttribute("data-original", contentArea.innerHTML);
  }

  if (input.trim() === "") {
    contentArea.innerHTML = contentArea.getAttribute("data-original");
    return;
  }

  const searchText = contentArea.innerText.toLowerCase();
  if (!searchText.includes(input)) {
    contentArea.innerHTML = `<p>No matching content for <strong>\"${input}\"</strong>.</p>`;
  } else {
    // Optionally highlight matches (very basic)
    const highlighted = contentArea.innerHTML.replace(
      new RegExp(input, "gi"),
      match => `<mark>${match}</mark>`
    );
    contentArea.innerHTML = highlighted;
  }
}
*/

// ADVANCED SEARCH BAR : Sidebar + Loaded Content


function advancedSearch() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  let matchFound = false;

  // Search in sidebar topics
  const topics = document.querySelectorAll("#sidebar li");
  topics.forEach(topic => {
    if (topic.textContent.toLowerCase().includes(input)) {
      topic.style.display = "block";
      matchFound = true;
    } else {
      topic.style.display = "none";
    }
  });

  // Search inside loaded content
  const contentArea = document.getElementById("content-area");
  const originalContent = contentArea.innerText.toLowerCase();
  
  if (originalContent.includes(input) && input.trim() !== "") {
    const regex = new RegExp(`(${input})`, 'gi');
    contentArea.innerHTML = contentArea.innerHTML.replace(regex, '<mark>$1</mark>');
    matchFound = true;
  }

  // If nothing matches
  if (!matchFound) {
    contentArea.innerHTML = "<p style='padding:20px; color:gray;'>🔍 No results found.</p>";
  }
}

 // JavaScript Functionality (Basic)
        function performSearch() {
            const searchTerm = document.querySelector('.search-input').value;
            if (searchTerm.trim() !== '') {
                alert('Searching for: ' + searchTerm); // Or console.log for development
                // Yahan aap actual search logic add kar sakte hain,
                // jaise ki results fetch karna ya kisi aur page par redirect karna.
            } else {
                alert('Please enter a search term!');
            }
        }







  

// mobile responsive
function closeSidebarOnMobile() {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth <= 768 && sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
  }
}

function loadContent(topicKey, el = null) {
  currentIndex = topicOrder.indexOf(topicKey);












  fetch(`${topicKey}.html`)
    .then(response => response.text())
    .then(html => {
      const contentArea = document.getElementById("content-area");
      contentArea.innerHTML = html;

      contentArea.innerHTML += `
        <div class="nav-buttons">
          <button onclick="goBack()" ${currentIndex === 0 ? "disabled" : ""}>⏮️ Back</button>
          <button onclick="goNext()" ${currentIndex === topicOrder.length - 1 ? "disabled" : ""}> Next ⏭️</button>
        </div>
      `;

      document.querySelectorAll("#sidebar li").forEach(li => li.classList.remove("active"));
      if (el) {
        el.classList.add("active");
      } else {
        document.querySelectorAll(`#sidebar li[data-key="${topicKey}"]`).forEach(li => li.classList.add("active"));
      }

      closeSidebarOnMobile();
    })
    .catch(() => {
      document.getElementById("content-area").innerHTML = "<p>Content not found.</p>";
    });
}

function goBack() {
  if (currentIndex > 0) {
    const prevKey = topicOrder[currentIndex - 1];
    window.location.hash = prevKey;
  }
}

function goNext() {
  if (currentIndex < topicOrder.length - 1) {
    const nextKey = topicOrder[currentIndex + 1];
    window.location.hash = nextKey;
  }
}







function navigateToHash(key, element) {
  window.location.hash = key;
  loadContent(key, element);
}

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1) || "intro";
  const el = document.querySelector(`#sidebar li[data-key="${hash}"]`);
  loadContent(hash, el);
});







//change subjects

function changeSubject(subject) {
  const allLists = document.querySelectorAll('.subject-list');
  allLists.forEach(list => list.style.display = 'none');
  const selectedList = document.getElementById(subject);
  if (selectedList) selectedList.style.display = 'block';
}



















// footer loaded


function loadFooter() {
  fetch("dup.html")
    .then(response => response.text())
    .then(data => {
       
   document.getElementById("footer").innerHTML = data;
    })
    .catch(err => console.error("Footer load failed:", err));
}

window.addEventListener("DOMContentLoaded", () => {
  loadFooter();
});


function changeSubject(subject) {
  const allLists = document.querySelectorAll('.subject-list');
  allLists.forEach(list => list.style.display = 'none');
  const selectedList = document.getElementById(subject);
  if (selectedList) selectedList.style.display = 'block';
}













/**
 * Easy selector helper
 */
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

// ✅ Mobile navbar toggle
on('click', '.mobile-nav-toggle', function (e) {
  select('#navbar').classList.toggle('navbar-mobile');
  this.classList.toggle('bi-list');
  this.classList.toggle('bi-x');
});

// ✅ Dropdown active in mobile nav
on('click', '.navbar .dropdown > a', function (e) {
  if (select('#navbar').classList.contains('navbar-mobile')) {
    e.preventDefault();
    this.nextElementSibling.classList.toggle('dropdown-active');
  }
}, true);

// ✅ AOS Init
AOS.init();

// ✅ Swiper Init
const swiper = new Swiper('.swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
});

// ✅ GLightbox Init
const glightbox = GLightbox({
  selector: '.glightbox'
});
































































/*


const topicOrder = ["intro", "headings", "paragraphs", "images", "links"];
let currentIndex = 0;

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

function closeSidebarOnMobile() {
  const sidebar = document.getElementById("sidebar");
  if (window.innerWidth <= 768 && sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
  }
}

function loadContent(topicKey, el = null) {
  currentIndex = topicOrder.indexOf(topicKey);

  fetch(`content/${topicKey}.html`)
    .then(response => response.text())
    .then(html => {
      const contentArea = document.getElementById("content-area");
      contentArea.innerHTML = html;

      contentArea.innerHTML += `
        <div class="nav-buttons">
          <button onclick="goBack()" ${currentIndex === 0 ? "disabled" : ""}>⏮️ Back</button>
          <button onclick="goNext()" ${currentIndex === topicOrder.length - 1 ? "disabled" : ""}> Next ⏭️</button>
        </div>
      `;

      document.querySelectorAll("#sidebar li").forEach(li => li.classList.remove("active"));
      if (el) {
        el.classList.add("active");
      } else {
        document.querySelectorAll(`#sidebar li[data-key="${topicKey}"]`).forEach(li => li.classList.add("active"));
      }

      closeSidebarOnMobile();
    })
    .catch(() => {
      document.getElementById("content-area").innerHTML = "<p>Content not found.</p>";
    });
}

function goBack() {
  if (currentIndex > 0) {
    const prevKey = topicOrder[currentIndex - 1];
    window.location.hash = prevKey;
  }
}

function goNext() {
  if (currentIndex < topicOrder.length - 1) {
    const nextKey = topicOrder[currentIndex + 1];
    window.location.hash = nextKey;
  }
}

function navigateToHash(key, element) {
  window.location.hash = key;
  loadContent(key, element);
}

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1) || "intro";
  const el = document.querySelector(`#sidebar li[data-key="${hash}"]`);
  loadContent(hash, el);
});

function changeSubject(subject) {
  const allLists = document.querySelectorAll('.subject-list');
  allLists.forEach(list => list.style.display = 'none');
  const selectedList = document.getElementById(subject);
  if (selectedList) selectedList.style.display = 'block';
}

function loadFooter() {
  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(err => console.error("Footer load failed:", err));
}

// Final single DOMContentLoaded listener
window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.substring(1) || "intro";
  const el = document.querySelector(`#sidebar li[data-key="${hash}"]`);
  loadContent(hash, el);
  loadFooter();
});





function navigateToHash(key, element) {
  window.location.hash = key;
  loadContent(key, element);
}


*/











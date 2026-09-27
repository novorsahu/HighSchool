/**
* Template Name: Arsha - v4.9.1
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate  glightbox 
   */
  const glightbox = GLightbox({ selector: '.glightbox' });
  


  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()








/*=======  class A =======  */



document.querySelectorAll(".classa").forEach(section => {
  const toggleBtn = section.querySelector(".more-btn");
  const hiddenCards = section.querySelectorAll(".card.hidden");
  let expanded = false;

  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;

    hiddenCards.forEach(card => {
      if (expanded) {
        card.classList.remove("hidden", "fade-out");
        card.classList.add("fade-in");
      } else {
        card.classList.remove("fade-in");
        card.classList.add("fade-out");

        // animation ke baad hide karna
        card.addEventListener("animationend", () => {
          if (!expanded) card.classList.add("hidden");
        }, { once: true });
      }
    });

    toggleBtn.innerHTML = expanded
      ? '<i class="fas fa-chevron-up"></i> Show less'
      : '<i class="fas fa-th"></i> More Subjects';
  });
});



/*==== hero videos ====== */

const slidesContainer = document.querySelector(".slides");
const dotsContainer = document.querySelector(".dots");
const adBtn = document.querySelector(".ad-btn");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const slider = document.querySelector(".hero-slider");

const slidesData = [
  {
    type: "image",
    src: "assets/img/hero-img.png",
    duration: 4000,
    isAd: false
  },

   {
    type: "image",
    src: "assets/img/heroimages/High School-bro.png",
    duration: 4000,
    isAd: false
  },
  {
    type: "image",
    src: "assets/img/subjects/chemistry-1.jpg",
    duration: 6000,
    isAd: true,
    btnText: "Enroll Now",
    btnLink: ""
  },
   {
    type: "image",
    src: "assets/img/heroimages/Formula-bro.png",
    duration: 4000,
    isAd: false
  },
  {
    type: "video",
    src: "assets/videos/hero-vid-4.mp4",
    duration: "video",
    isAd: false
  },

  {
    type : "image",
    src: "assets/img/subjects/chemistry12.png",
    duration: 6000,
    isAd: true,
    btnText: "Enroll Now",
    btnLink: ""

  },
   {
    type: "image",
    src: "assets/img/heroimages/Mathematics-bro.png",
    duration: 4000,
    isAd: false
  }
];

let current = 0;
let timer;

/* Create Slides + Dots */
slidesData.forEach((slide, index) => {

  const div = document.createElement("div");
  div.classList.add("slide");
  if(index === 0) div.classList.add("active");

  if(slide.type === "image"){
    const img = document.createElement("img");
    img.src = slide.src;
    img.loading = "lazy";
    div.appendChild(img);
  }

  if(slide.type === "video"){
    const video = document.createElement("video");
    video.src = slide.src;
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    div.appendChild(video);
  }

  slidesContainer.appendChild(div);

  const dot = document.createElement("div");
  dot.classList.add("dot");
  if(index === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    goToSlide(index);
  });

  dotsContainer.appendChild(dot);
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

/* Slide Change */
function goToSlide(index){

  clearTimeout(timer);

  const prevVideo = slides[current].querySelector("video");
  if(prevVideo){
    prevVideo.pause();
    prevVideo.currentTime = 0;
  }

  slides[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = index;

  slides[current].classList.add("active");
  dots[current].classList.add("active");

  updateAdButton();
  handleSlideDuration();
}

/* Next / Prev */
function nextSlide(){
  goToSlide((current + 1) % slides.length);
}

function prevSlide(){
  goToSlide((current - 1 + slides.length) % slides.length);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

/* Ad Button */
function updateAdButton(){
  const slide = slidesData[current];

  if(slide.isAd){
    adBtn.style.display = "inline-block";
    adBtn.textContent = slide.btnText;
    adBtn.href = slide.btnLink;
  } else {
    adBtn.style.display = "none";
  }
}

/* Slide Duration Logic */
function handleSlideDuration(){

  const slideData = slidesData[current];
  const video = slides[current].querySelector("video");

  if(slideData.duration === "video" && video){

    video.currentTime = 0;
    video.play();

    video.onended = () => {
      nextSlide();
    };

  } else {

    const duration = slideData.duration || 4000;

    timer = setTimeout(() => {
      nextSlide();
    }, duration);

  }

}

/* Start */
updateAdButton();
handleSlideDuration();

/* ======================
   Swipe Support
====================== */

let startX = 0;

slider.addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", e=>{
  let endX = e.changedTouches[0].clientX;

  if(startX - endX > 50){
    nextSlide();
  }

  if(endX - startX > 50){
    prevSlide();
  }
});
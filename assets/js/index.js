let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('#header .nav-links a[href^="#"]');
let themeToggleButton = document.getElementById("theme-toggle-button");
let html = document.querySelector(".dark");
let scrollToTop = document.getElementById("scroll-to-top");
let settingsToggleBtn = document.getElementById("settings-toggle");
let settingsSidebar = document.getElementById("settings-sidebar");
let closeSettingsBtn = document.getElementById("close-settings");
let alex = document.getElementById("alex");
let defualt = document.getElementById("default");
let cairo = document.getElementById("cairo");
let btnColor = document.querySelectorAll(".btn-color");
let resetSettingsBtn = document.getElementById("reset-settings")
var navBtn = document.querySelectorAll('#navBtn');
var projectCards = document.querySelectorAll('.project-card');
var carousel = document.getElementById('testimonials-carousel');
var prevBtn = document.getElementById('prev-testimonial');
var nextBtn = document.getElementById('next-testimonial');
var indicators = document.querySelectorAll('.carousel-indicator');
var cards = document.querySelectorAll('.testimonial-card');

let currentIndex = 0;

function getVisibleCardsCount() {
  if (window.innerWidth >= 1024) {
    return 3;
  }
  if (window.innerWidth >= 640) {
    return 2;
  }
  return 1;
}

function getMaxIndex() {
  let visibleCards = getVisibleCardsCount();
  return Math.max(0, cards.length - visibleCards);
}

function updateCarousel() {
  let maxIndex = getMaxIndex();
  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  let cardWidth = cards[0].offsetWidth;
  let offset = currentIndex * cardWidth;
  
  carousel.style.transform = 'translateX(' + offset + 'px)';

  for (let i = 0; i < indicators.length; i++) {
    let indicator = indicators[i];
    let isActive = (i === currentIndex);
    
    indicator.setAttribute('aria-selected', isActive ? 'true' : 'false');
    
    if (isActive) {
      indicator.classList.add('bg-accent');
      indicator.classList.remove('bg-slate-400', 'dark:bg-slate-600');
    } else {
      indicator.classList.remove('bg-accent');
      indicator.classList.add('bg-slate-400', 'dark:bg-slate-600');
    }
  }
}

nextBtn.addEventListener('click', function() {
  let maxIndex = getMaxIndex();
  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateCarousel();
});

prevBtn.addEventListener('click', function() {
  let maxIndex = getMaxIndex();
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = maxIndex;
  }
  updateCarousel();
});

for (let j = 0; j < indicators.length; j++) {
  indicators[j].addEventListener('click', function(e) {
    let targetIndex = parseInt(e.currentTarget.getAttribute('data-index'), 10);
    let maxIndex = getMaxIndex();
    
    if (targetIndex > maxIndex) {
      currentIndex = maxIndex;
    } else {
      currentIndex = targetIndex;
    }
    
    updateCarousel();
  });
}

window.addEventListener('resize', function() {
  updateCarousel();
});

updateCarousel();

for (var i = 0; i < navBtn.length; i++) {
  navBtn[i].addEventListener('click', function () {
    for (var k = 0; k < navBtn.length; k++) {
      navBtn[k].classList.remove(
        'bg-linear-to-r',
        'from-primary',
        'to-secondary',
        'hover:shadow-lg',
        'hover:shadow-primary/50'
      );
      navBtn[k].classList.add(
        'dark:bg-slate-800',
        'dark:hover:bg-slate-700',
        'text-slate-600',
        'dark:text-slate-300'
      );
    }

    this.classList.remove(
      'dark:bg-slate-800',
      'dark:hover:bg-slate-700',
      'text-slate-600',
      'dark:text-slate-300'
    );
    this.classList.add(
      'bg-linear-to-r',
      'from-primary',
      'to-secondary',
      'hover:shadow-lg',
      'hover:shadow-primary/50'
    );

    var filterValue = this.getAttribute('data-filter');

    for (var j = 0; j < projectCards.length; j++) {
      var currentCard = projectCards[j];
      var cardCategory = currentCard.getAttribute('data-category');

      if (filterValue === 'all' || filterValue === cardCategory) {
        currentCard.classList.remove('hidden');
      } else {
        currentCard.classList.add('hidden');
      }
    }
  });
}


function loadSavedSettings() {
    let savedMode = localStorage.getItem("themeMode");
    if (savedMode && html) {
        if (savedMode === "light") {
            html.classList.remove("dark");
            html.classList.add("light");
        } else {
            html.classList.remove("light");
            html.classList.add("dark");
        }
    }

    let savedFont = localStorage.getItem("themeFont");
    if (savedFont === "alex") {
        defualt.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800");
        cairo.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800");
        alex.classList.add("active","border-primary","bg-slate-50","dark:bg-slate-800");
        document.body.classList.remove("font-tajawal");
        document.body.classList.remove("font-cairo");
        document.body.classList.add("font-alexandria");
    } else if (savedFont === "cairo") {
        defualt.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800");
        alex.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800");
        cairo.classList.add("active","border-primary","bg-slate-50","dark:bg-slate-800");
        document.body.classList.remove("font-tajawal");
        document.body.classList.remove("font-alexandria");
        document.body.classList.add("font-cairo");
    } else if (savedFont === "default") {
        defualt.classList.add("active","border-primary","bg-slate-50","dark:bg-slate-800");
        alex.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800");
        cairo.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800");
        document.body.classList.add("font-tajawal");
        document.body.classList.remove("font-alexandria");
        document.body.classList.remove("font-cairo");
    }

    let savedPrimary = localStorage.getItem("primaryColor");
    let savedSecondary = localStorage.getItem("secondaryColor");
    let savedAccent = localStorage.getItem("accentColor");

    if (savedPrimary && savedSecondary && savedAccent) {
        document.documentElement.style.setProperty("--color-primary", savedPrimary);
        document.documentElement.style.setProperty("--color-secondary", savedSecondary);
        document.documentElement.style.setProperty("--color-accent", savedAccent);

        for (let k = 0; k < btnColor.length; k++) {
            btnColor[k].classList.remove("ring-2","ring-primary", "ring-offset-2","ring-offset-white", "dark:ring-offset-slate-900");
            if (btnColor[k].getAttribute("data-primary") === savedPrimary) {
                btnColor[k].classList.add("ring-2","ring-primary", "ring-offset-2","ring-offset-white", "dark:ring-offset-slate-900");
            }
        }
    }
}

loadSavedSettings();

window.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;

    if (scrollPosition > 500) {
        scrollToTop.classList.remove("invisible");
        scrollToTop.classList.add("visible");
    } else {
        scrollToTop.classList.remove("visible");
        scrollToTop.classList.add("invisible");
    }

    sections.forEach(function (section) {
        let sectionTop = section.offsetTop - 150;
        let sectionHeight = section.offsetHeight;
        let sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(function (link) {
                link.classList.remove('active');
            });

            let activeLink = document.querySelector('#header .nav-links a[href*="' + sectionId + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

scrollToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

themeToggleButton.addEventListener("click",function(){
    if(html.getAttribute("class") == "dark"){
        html.classList.remove("dark")
        html.classList.add("light")
        localStorage.setItem("themeMode", "light");
    }else{
        html.classList.remove("light")
        html.classList.add("dark")
        localStorage.setItem("themeMode", "dark");
    }
})

settingsToggleBtn.addEventListener("click",function(){
    if(settingsSidebar.classList.contains("translate-x-full")){
        settingsSidebar.classList.remove("translate-x-full")
        settingsSidebar.classList.add("translate-x-0")
        settingsToggleBtn.style.cssText = `transform: translateX(-320px);`
    }
})

closeSettingsBtn.addEventListener("click",function(){
    settingsSidebar.classList.add("translate-x-full")
    settingsSidebar.classList.remove("translate-x-0")
    settingsToggleBtn.style.cssText = `transform: translateX(0px);`
})

alex.addEventListener("click",function(){
    defualt.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800")
    cairo.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800")
    alex.classList.add("active","border-primary","bg-slate-50","dark:bg-slate-800")
    document.body.classList.remove("font-tajawal")
    document.body.classList.remove("font-cairo")
    document.body.classList.add("font-alexandria")
    localStorage.setItem("themeFont", "alex");
}
)

cairo.addEventListener("click",function(){
    defualt.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800")
    alex.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800")
    cairo.classList.add("active","border-primary","bg-slate-50","dark:bg-slate-800")
    document.body.classList.remove("font-tajawal")
    document.body.classList.remove("font-alexandria")
    document.body.classList.add("font-cairo")
    localStorage.setItem("themeFont", "cairo");
})

defualt.addEventListener("click",function(){
    defualt.classList.add("active","border-primary","bg-slate-50","dark:bg-slate-800")
    alex.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800")
    cairo.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800")
    document.body.classList.add("font-tajawal")
    document.body.classList.remove("font-alexandria")
    document.body.classList.remove("font-cairo")
    localStorage.setItem("themeFont", "default");
})

for(let i =0;i<btnColor.length;i++){
    btnColor[i].addEventListener("click",function(){
        for(let j=0;j<btnColor.length;j++){
            btnColor[j].classList.remove("ring-2","ring-primary", "ring-offset-2","ring-offset-white", "dark:ring-offset-slate-900")
        }
        btnColor[i].classList.add( "ring-2","ring-primary", "ring-offset-2","ring-offset-white", "dark:ring-offset-slate-900")
            let primaryColor = this.getAttribute("data-primary")
            let secondaryColor = this.getAttribute("data-secondary")
            let accentColor = this.getAttribute("data-accent")
            document.documentElement.style.setProperty("--color-primary",primaryColor)
            document.documentElement.style.setProperty("--color-secondary",secondaryColor)
            document.documentElement.style.setProperty("--color-accent",accentColor)

            localStorage.setItem("primaryColor", primaryColor);
            localStorage.setItem("secondaryColor", secondaryColor);
            localStorage.setItem("accentColor", accentColor);
    })
}

resetSettingsBtn.addEventListener("click", function(){
    localStorage.clear();

    defualt.classList.add("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
    alex.classList.remove("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
    cairo.classList.remove("active", "border-primary", "bg-slate-50", "dark:bg-slate-800");
    document.body.classList.remove("font-alexandria", "font-cairo");
    document.body.classList.add("font-tajawal");

    document.documentElement.style.removeProperty("--color-primary");
    document.documentElement.style.removeProperty("--color-secondary");
    document.documentElement.style.removeProperty("--color-accent");

    for (let j = 0; j < btnColor.length; j++) {
        btnColor[j].classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
    }
    if (btnColor.length > 0) {
        btnColor[0].classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
    }
});
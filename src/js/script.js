  function navbar() {
    var t = this;
    t.n = document.querySelector("nav");
    t.bo = document.body.style.overflow;
    t.close = function () {
      t.bo = "auto";
      t.n.classList.remove("active");
    }
    t.open = function () {
      t.bo = "hidden";
      t.n.classList.add("active");
    }
    if (t.n) {
      document.querySelector("nav>button").addEventListener("click", function () {
        console.log("toggleNav");
        if (t.n.classList.contains("active"))
          t.close();
        else
          t.open();
      });
      document.querySelectorAll("nav ul > a").forEach(n => n.addEventListener("click", t.close()));
    }
  }
  
  function modal(id) {
    var t = this;
    t.m = document.querySelector((id) ? id : '.modal');
    if (t.m) {
      t.bdy = document.body.classList;
      t.targets = document.querySelectorAll('[data-toggle="' + t.m.id + '"]');
      t.closebtns = t.m.querySelectorAll('.close-modal');
    }
    t.show = function () {
      t.bdy.add('_overflowhidden');
      t.m.classList.add('_show-modal');
    }
    t.hide = function () {
      t.m.classList.remove('_show-modal');
      t.bdy.remove('_overflowhidden');
    }
    t.listeners = function () {
      t.targets.forEach(el => {
        el.addEventListener('click', function (e) {
          t.show();
        });
      });
      t.closebtns.forEach(function (item) {
        item.addEventListener('click', function (e) {
          t.hide();
        });
      });
    }
    if (t.m)
      t.listeners();
  }
  
  function themeManager() {
    const t = this;
    t.toggles = document.getElementsByClassName("theme-toggle");
    t.activeTheme= "light";
    t.setTheme =(theme)=>{
      t.activeTheme = theme;
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme);
    }
    t.dark = ()=>{
      t.setTheme("dark");
    }
    t.light = ()=>{
      t.setTheme("light");
    }
    if (window.CSS && CSS.supports("color", "var(--bg)") && t.toggles) {
      var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ?
        "dark" : "light");
      if (storedTheme)
        document.documentElement.setAttribute('data-theme', storedTheme)
      for (var i = 0; i < t.toggles.length; i++) {
        t.toggles[i].onclick = function () {
          if (document.documentElement.getAttribute("data-theme") === "light") t.dark();
          else t.light();
        };
      }
    }
  }
  
  function aos() {
    const t= this;
    t.items = document.querySelectorAll("[class*=_aos]");
    if (IntersectionObserver && t.items) {
      let callback = function (entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('_aos-done')) {
            entry.target.classList.add('_aos-done');
          } else {
            entry.target.classList.remove('_aos-done');
          }
        });
      }
      let observer = new IntersectionObserver(callback, {
        root: null,
        threshold: 0.1
      });
      t.items.forEach((item) => {
        observer.observe(item);
      });
    }
  }
  
  function gotop() {
    var t = this;
    t.gt = document.getElementById('gt-link');
    t.scrollToTop = function () {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    t.listeners = function () {
      window.addEventListener("scroll", () => {
        let y = window.scrollY;
        if (y > 0) {
          t.gt.classList.remove("hidden");
        } else {
          t.gt.classList.add("hidden");
        }
      });
      t.gt.onclick = function (e) {
        e.preventDefault();
        if (document.documentElement.scrollTop || document.body.scrollTop > 0) {
          t.scrollToTop();
        }
      }
    }
    if (t.gt) {
      t.listeners();
    }
  }
  
  function pagesRoute() {
    var t = this;
    const notFoundPage = document.querySelector("#notFound");
    t.links = Array.from(document.querySelectorAll('[topage]'));
    t.scrollTop = () => {
      document.querySelector('html').scrollTop = 0;
      document.querySelector('body').scrollTop = 0;
    }
    t.navigate = (id) => {
      //Hide current active page
      var activePage = document.querySelector("section.page-active");
      if (activePage) activePage.classList.remove("page-active");
      var activeLink = document.querySelector('[topage].active');
      if (activeLink) activeLink.classList.remove("active");
      //Show the next page
      var nextPage = document.querySelector(id);
      if (nextPage) nextPage.classList.add("page-active");
      var nextLink = document.querySelector("[topage='" + id + "']");
      if (nextLink) nextLink.classList.add("active");
      //Scroll to top
      t.scrollTop();
      //Set history state
      if (history.pushState)
        history.pushState(null, null, id);
      else
        location.hash = id;
    }
    t.listeners = () => {
      t.links.forEach((page) => {
        var id = page.getAttribute("topage");
        page.addEventListener('click', () => {
          t.navigate(id)
        });
      })
    }
    if (t.links) {
      if (window.location.hash)
        t.navigate(window.location.hash);
      t.listeners();
    }
  }
  
  // Call the function when the DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    new themeManager();
    new navbar();
    new gotop();
    new aos();
    new modal("#mdl1");
    pagesRoute();
    
  });



function appendData(data) {
    var ext_grid = document.getElementById("ext-grid");
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");
      div.innerHTML = 'Name: ' + data[i].name + ' ' + data[i].description;
      mainContainer.appendChild(div);
    }
  }
fetch('https://raw.githubusercontent.com/d3ward/awesome-extensions-for-kiwi/master/data.json')
.then(function (response) {
  return response.json();
})
.then(function (data) {
  appendData(data);
})
.catch(function (err) {
  console.log(err);
});

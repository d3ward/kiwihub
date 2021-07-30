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
      t.activeTheme = "light";
      t.setTheme = (theme) => {
          t.activeTheme = theme;
          document.documentElement.setAttribute('data-theme', theme)
          localStorage.setItem('theme', theme);
      }
      t.dark = () => {
          t.setTheme("dark");
      }
      t.light = () => {
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
      const t = this;
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
              threshold: 0
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

      new modal("#mdl1");
      pagesRoute();

  });

  function shuffle(array) {
      var currentIndex = array.length,
          temporaryValue, randomIndex;
      while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
      return array;
  }

  function appendData(data) {
      var ext_grid = document.getElementById("ext-grid");
      for (var i = 0; i < data.length; i++) {
          var div = document.createElement("div");
          var links = '<a href="' + data[i].githuburl + '" class="btn" target="_blank"><svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> &nbsp; GitHub</a>';
          if (data[i].cwsurl.length > 5)
              links += '<a href="' + data[i].cwsurl + '" class="btn" target="_blank"> <svg viewBox="0 0 164.971 165.371" xmlns="http://www.w3.org/2000/svg"><path d="M157.197 7.4l-149.61.188c0 66.712-1.023 94.137-.087 146.89.51 3.359 5.63 3.301 8.604 3.358-.956-20.117 3.1-38.456 19.609-56.557 10.198-9.994 28.106-18.394 44.691-18.265 22.169-.46 40.195 7.035 57.102 27.838 7.568 11.79 11.613 31.058 12.508 47.181 0 0 7.16-.072 7.166-3.603.814-48.153.457-93.448.017-147.03zM56.693 22.678h49.133c8.08.163 7.52 15.066 0 15.117H56.693c-7.656-.558-7.452-14.774 0-15.117zm27.202 67.906c-20.353-.262-36.141 7.998-48.737 22.61 1.865 3.197 18.023 34.633 18.424 28.1 1.986-7.876 7.408-13.744 14.336-17.696 5.785-2.854 5.538-2.831 32.57-3.09 9.966-.098 21.928-.154 33.893-.666-8.222-14.695-22.513-26.33-41.48-28.617a80.028 80.028 0 00-9.006-.641zm-53.49 30.537c-.305.075-1.094 1.256-1.891 2.842-4.741 9.43-6.238 16.733-5.748 28.05l.26 6.003 14.119-.223c7.765-.123 14.176-.274 14.248-.334-5.418-13.207-12.899-24.91-20.934-36.338a.101.101 0 00-.055 0zm72.331 6.934c5.66 6.106 10.503 15.55 9.153 29.591l3.367.122 26.812.275c1.097-10.242-1.314-18.527-3.54-29.795l-35.792-.193zm-19.847.279c-15.527-.047-22.855 14.682-21.494 29.32l42.24-.248c2.746-11.79-.693-24.577-13.592-28.103-2.551-.654-4.936-.962-7.154-.969z" paint-order="stroke markers fill"/></svg> &nbsp; Chrome Web Store</a>'
          else if (data[i].officialurl.length > 5)
              links += '<a href="' + data[i].officialurl + '" class="btn" target="_blank"> <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"></path></svg>&nbsp; Official Website</a>'

          div.className = "col-4";
          div.innerHTML = '<div class="card  _aos-bottom"><div class="badges"><div>' + data[i].category + '</div></div>' +
              '<div class="img-w"><img src="' + data[i].logo + '" alt=""></div>' +
              '<h3 class="_txt-center">' + data[i].name + '</h3><p>' + data[i].description + '</p><div class="links">' + links + '</div></div>';
          ext_grid.appendChild(div);
      }
  }
  fetch('https://raw.githubusercontent.com/d3ward/awesome-extensions-for-kiwi/master/data.json')
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          appendData(shuffle(data));
          new aos();
      })
      .catch(function (err) {
          console.log(err);
      });
/**
 * Template Name: Presento - v1.1.1
 * Template URL: https://bootstrapmade.com/presento-bootstrap-corporate-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

!(function ($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $("#header").outerHeight() - 1;
  $(document).on(
    "click",
    ".nav-menu a, .mobile-nav a, .scrollto",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        if (target.length) {
          e.preventDefault();

          var scrollto = target.offset().top - scrolltoOffset;

          if ($(this).attr("href") == "#header") {
            scrollto = 0;
          }

          $("html, body").animate(
            {
              scrollTop: scrollto,
            },
            1000,
            "easeInOutExpo"
          );

          if ($(this).parents(".nav-menu, .mobile-nav").length) {
            $(".nav-menu .active, .mobile-nav .active").removeClass("active");
            $(this).closest("li").addClass("active");
          }

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
              "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").fadeOut();
          }
          return false;
        }
      }
    }
  );

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  //emoji reviews
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, .mobile-nav");

  var emojis = ["😠", "😦", "😑", "😀", "😍"];

  $("input").mousemove(function () {
    var i = $(this).val();
    $(".emoji").html(emojis[i]);
  });

  // Navigation active state on scroll
  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(
          ".nav-menu ul:first li:first, .mobile-menu ul:first li:first"
        ).addClass("active");
      }
    });
  });

  // Mobile Navigation
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass(
        "icofont-navigation-menu icofont-close"
      );
      $(".mobile-nav-overly").toggle();
    });

    $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass("active");
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 4,
      },
      900: {
        items: 6,
      },
    },
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      900: {
        items: 2,
      },
      1400: {
        items: 3,
      },
    },
  });

  // Porfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({
        filter: $(this).data("filter"),
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $(".venobox").venobox();
    });
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
})(jQuery);

////RENDERING FROM  GIVEN API

async function getLoggedIn() {
  const dt = await axios.get("http://demo.tech2edge.co/samples/data-sg");
  const data = dt.data;

  const createchar = function (id) {
    const character = document.createElement("div");
    character.classList.add("tab-content");
    if (id == 0) {
      character.innerHTML = ` 
      <section id="pricing" class="pricing section-bg">
      <div class="container" data-aos="fade-up"><H1>Here Are The Characters!!<H1></div>
    </section>
      
      <div class="tab-pane active show" id="tab-${id}">
    <div class="row">
      <div
        class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <h1 id="charname${id}" style="padding-left: 50%">Sartaj Singh</h1>
      
        <br /><br /><br />
        <ul style="padding-left: 50%">
          <li>
            <i class="ri-check-double-line"
              ><span><h4>Age:</h4></span></i
            >
            <h2><span id="age${id}">32</span></h2>
            years
          </li>
          <li>
            <i class="ri-check-double-line"
              ><span><h4>Profession:</h4></span></i
            >
            <h2><span id="prof${id}"></span></h2>
          </li>
        </ul>
      </div>
      <div
        class="col-lg-6 order-1 order-lg-2 text-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <img
          id="pic${id}"
          src="assets/img/tabs-1.jpg"
          alt=""
          class="img-fluid"
        />
      </div>
    </div>
  </div>
  
  
  `;
    } else {
      character.innerHTML = ` 
    <section id="pricing" class="pricing section-bg">
    <div class="container" data-aos="fade-up"></div>
  </section>
    
    
    <div class="tab-pane active show" id="tab-${id}">
  <div class="row">
    <div
      class="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <h1 id="charname${id}" style="padding-left: 50%">Sartaj Singh</h1>
    
      <br /><br /><br />
      <ul style="padding-left: 50%">
        <li>
          <i class="ri-check-double-line"
            ><span><h4>Age:</h4></span></i
          >
          <h2><span id="age${id}">32</span></h2>
          years
        </li>
        <li>
          <i class="ri-check-double-line"
            ><span><h4>Profession:</h4></span></i
          >
          <h2><span id="prof${id}"></span></h2>
        </li>
      </ul>
    </div>
    <div
      class="col-lg-6 order-1 order-lg-2 text-center"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <img
        id="pic${id}"
        src="assets/img/tabs-1.jpg"
        alt=""
        class="img-fluid"
      />
    </div>
  </div>
</div>


`;
    }
    return character;
  };
  const main = document.querySelector("#main");
  const AllChar = data["characters"].length - 1;

  for (i = AllChar; i >= 0; i--) {
    main.prepend(createchar(i));
    const charname = document.querySelector(`#charname${i}`);
    const age = document.querySelector(`#age${i}`);
    const prof = document.querySelector(`#prof${i}`);
    const pic = document.querySelector(`#pic${i}`);

    charname.innerHTML = data["characters"][i]["name"];
    age.innerHTML = data["characters"][i]["age"];
    prof.innerHTML = data["characters"][i]["profession"];
    pic.setAttribute(
      "src",
      `http://demo.tech2edge.co/samples/` + data["characters"][i]["img"]
    );
  }
  const desc = document.querySelector("#desc");
  const ott = document.querySelector("#OTT");
  const ott1 = document.querySelector("#ott1");
  const ottpic = document.querySelector("#myImg");
  const hero = document.querySelector("#hero");
  const sn = document.querySelector("#SeriesName");
  desc.innerHTML = data["series"]["desc"];
  ott.innerHTML = data["series"]["ott"];
  ott1.innerHTML = data["series"]["ott"];
  sn.innerHTML=data["series"]["title"];
  ottpic.setAttribute(
    "src",
    `http://demo.tech2edge.co/samples/` + data["series"]["img"]
  );
  const ul = `http://demo.tech2edge.co/samples/` + data["series"]["img"];
  hero.style.background = ` url(${ul})`;

  /////
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var img = document.getElementById("myImg");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  img.onclick = function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
  };

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
}
getLoggedIn();

$(window).on("load", function () {
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });
});

/******************************************************************************************************************************
Learn More Page Scroll
*******************************************************************************************************************************/
$(function () {
    $('a.page-scroll').on('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

/******************************************************************************************************************************
Menu Toggle Fix
*******************************************************************************************************************************/

(function () {
    var bodyEl = document.body,
        openbtn = document.getElementById('open-button'),
        closebtn = document.createElement("button"), // Creating a close button dynamically
        isOpen = false;

    closebtn.id = "close-button"; // Set ID for new close button
    closebtn.innerHTML = "&times;"; // Close symbol
    closebtn.style.position = "absolute";
    closebtn.style.top = "15px";
    closebtn.style.right = "20px";
    closebtn.style.fontSize = "24px";
    closebtn.style.background = "none";
    closebtn.style.border = "none";
    closebtn.style.color = "#fff";
    closebtn.style.cursor = "pointer";

    document.querySelector(".menu-wrap").appendChild(closebtn); // Add close button to menu

    function init() {
        initEvents();
    }

    function initEvents() {
        openbtn.addEventListener('click', toggleMenu);
        closebtn.addEventListener('click', toggleMenu);
    }

    function toggleMenu() {
        if (isOpen) {
            bodyEl.classList.remove('show-menu');
            $(".menu-wrap").removeClass("menu-open"); // Fix visibility issue
        } else {
            bodyEl.classList.add('show-menu');
            $(".menu-wrap").addClass("menu-open"); // Show menu
        }
        isOpen = !isOpen;
    }

    init();
})();

/******************************************************************************************************************************
Projects Section Scroll Functionality
*******************************************************************************************************************************/

document.getElementById("scroll-left").addEventListener("click", function () {
    const container = document.getElementById("projects-container");
    container.scrollBy({
        left: -300,
        behavior: "smooth",
    });
});

document.getElementById("scroll-right").addEventListener("click", function () {
    const container = document.getElementById("projects-container");
    container.scrollBy({
        left: 300,
        behavior: "smooth",
    });
});

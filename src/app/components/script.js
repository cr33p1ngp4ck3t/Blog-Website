document.addEventListener("DOMContentLoaded", () => {
    const interBubble = document.querySelector(".interactive");
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(
            curX
        )}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener("mousemove", (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});





const toggleSwitch = 
    document.querySelector('.theme-slider input[type="checkbox"]'); 
  
function switchTheme(e) { 
  
    if (e.target.checked) { 
        document.documentElement.setAttribute('theme', 'dark'); 
    } 
  
    else { 
        document.documentElement.setAttribute('theme', 'light'); 
    } 
} 
  
toggleSwitch.addEventListener('change', switchTheme, false);

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) { 
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  });
  
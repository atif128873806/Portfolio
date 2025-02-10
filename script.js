function show(){
    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, 
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();}
    
    show()

// Cool navigation animation
gsap.from(".nav-item", {
    opacity: 0,
    y: -30,
    rotation: 15,
    duration: 1.2,
    stagger: {
        amount: 0.8, 
        from: "start" 
    },
    ease: "elastic.out(1, 0.3)",
    transformOrigin: "top"
});

// Optional hover effect for nav items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1.1,
            duration: 0.3,
            color: '#00bcd4',  
            ease: "power1.out"
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,
            duration: 0.3,
            color: 'white',  
            ease: "power1.out"
        });
    });
});



const titles = ["Frontend Developer", "Web Cloner", "Web Developer"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const typingElement = document.querySelector('.typing-text');
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeText, 700);
            return;
        }
        
        setTimeout(typeText, 100);
    } else {
        if (charIndex < currentTitle.length) {
            const newChar = currentTitle.charAt(charIndex);
            const currentText = currentTitle.substring(0, charIndex);
           
            typingElement.innerHTML = currentText + 
                `<span class="new-char" style="background: linear-gradient(45deg, #2196F3, #00BCD4); 
                -webkit-background-clip: text; 
                -webkit-text-fill-color: transparent;">${newChar}</span>`;

            
            
            gsap.fromTo(".new-char", 
                { opacity: 0, scale: 0.8 }, 
                { 
                    opacity: 1,
                    scale: 1, 
                    duration: 0.1,
                    ease: "power1.out"
                }
            );
        }
        
        charIndex++;
        
        if (charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeText, 1000);
            return;
        }
        
        setTimeout(typeText, 150);
    }
}

// Start the animation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    typeText();
});
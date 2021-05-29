class MobileNavB {
    constructor(mobileMenu) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navlist = document.querySelector(navlist);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.blid();
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation ?
                (link.style.animation = "") :
                (link.style.animation = `navlinkfade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }
    addClickEvent() {
        this.mobileMenu.addEventListner("click", this.handleClick);
    }
    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavB = new MobileNavB(".menu", ".navlist", ".navlist li");
mobileNavB.init();
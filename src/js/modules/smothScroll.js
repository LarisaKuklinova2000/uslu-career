const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let href = this.getAttribute('href').substring(1);
            const scrollTarget = document.getElementById(href);
            const topOffset = document.querySelector('.scrollto').offsetHeight;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    const btnUp = {
        el: document.querySelector('.btn-up'),
        show() {
          this.el.classList.remove('btn-up_hide');
        },
        hide() {
          this.el.classList.add('btn-up_hide');
        },
        addEventListener() {
          window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            scrollY > 400 ? this.show() : this.hide();
          });
          document.querySelector('.btn-up').onclick = () => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          }
        }
    }
    btnUp.addEventListener();
}

export default smoothScroll;
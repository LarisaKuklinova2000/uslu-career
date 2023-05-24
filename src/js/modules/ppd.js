import ppdText from "./ppdText";

const ppd = () => {
    const overlay = document.querySelector('.ppd-overlay'),
          btn = document.querySelector('.ppd-btn');

    btn.addEventListener('click', () => {
        overlay.classList.replace('hidden', 'visible');
        
        const ppdWrapper = document.createElement('div');
        ppdWrapper.classList.add('ppd__wrapper');

        const ppdTextElem = document.createElement('div');
        ppdTextElem.classList.add('ppd-text');
        ppdTextElem.innerHTML = `
            ${ppdText()}
            <i class="fa-solid fa-square-xmark" id="ppd__close"></i>
        `;

        ppdWrapper.append(ppdTextElem)
        overlay.append(ppdWrapper);
        document.body.style.overflow = 'hidden';

        document.querySelector('#ppd__close').addEventListener('click', () => {
            overlay.classList.replace('visible', 'hidden');
            document.querySelector('.ppd__wrapper').remove();
            document.body.style.overflowY = 'visible';
        });
    });
}

export default ppd;
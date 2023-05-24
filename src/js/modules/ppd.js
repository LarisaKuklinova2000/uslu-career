const ppd = (trigger, text) => {
    const ppdCpOverlay = document.querySelector('.ppd-overlay'),
          btn = document.querySelector(trigger);

    btn.addEventListener('click', () => {
        ppdCpOverlay.classList.replace('hidden', 'visible');
        
        const ppdWrapper = document.createElement('div');
        ppdWrapper.classList.add('ppd__wrapper');

        const ppdTextElem = document.createElement('div');
        ppdTextElem.classList.add('ppd-text');
        ppdTextElem.innerHTML = `
            ${text}
            <i class="fa-solid fa-square-xmark" id="ppd__close"></i>
        `;

        ppdWrapper.append(ppdTextElem)
        ppdCpOverlay.append(ppdWrapper);
        document.body.style.overflow = 'hidden';

        document.querySelector('#ppd__close').addEventListener('click', () => {
            ppdCpOverlay.classList.replace('visible', 'hidden');
            document.querySelector('.ppd__wrapper').remove();
            document.body.style.overflowY = 'visible';
        });
    });
}

export default ppd;
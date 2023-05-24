import { postData } from "../services/requests";

const formForEmployers = () => {

    const jobOfferBtn = document.querySelector('.jobOffer'),
    overlay = document.querySelector('.main-overlay'),
    employersForm = document.querySelector('.employersForm');

    jobOfferBtn.addEventListener('click', () => {
        overlay.classList.replace('hidden', 'visible');
        employersForm.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    employersForm.addEventListener('click', (e) => {
        if (e.target.id == 'employersForm__close') {
            overlay.classList.replace('visible', 'hidden');
            employersForm.style.display = 'none';
            document.body.style.overflowY = 'visible';
        }
    });


    function showLoaderIdentity() {
        $("#loader-identityEmployrsForm").show() ;
    }

    function hideLoaderIdentity() {
        $("#loader-identityEmployrsForm").hide();  
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            showLoaderIdentity();

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries())); 

            postData('sendVacancyOffer.php', json)
            .then(data => {
                alert('Предложение вакансии успешно отправлено, с Вами свяжутся!');
            }).catch(() => {
                alert('При отправке произошла ошибка, попробуйте снова');
            }).finally(() => {
                form.reset();
                hideLoaderIdentity();
            });

        });
    }
    bindPostData(document.querySelector('#employersForm'));

};

export default formForEmployers;
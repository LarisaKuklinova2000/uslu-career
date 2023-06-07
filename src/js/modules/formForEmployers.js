import { postData } from "../services/requests";

const formForEmployers = () => {

    const createOverlayAndForm = () => {
        const EFOverlay = document.createElement('section');
        EFOverlay.classList.add('ef-overlay', 'overlay', 'hidden', 'animate__animated', 'animate__fadeIn');
        EFOverlay.innerHTML = `
        <div class="employersForm hidden animate__animated animate__fadeIn">
        <i class="fa-solid fa-square-xmark" id="employersForm__close"></i>
        <div class="employersForm__header"> Предложить вакансию/стажировку </div>
        <form class="employersForm__wrapper" enctype="multipart/form-data" method="post" id="employersForm">
            <input class="vacancyName employersTextInput employersRawElem" name="vacancyName" type="text" placeholder="Название вакансии" required>
            <input class="organizationName employersTextInput employersRawElem" name="organizationName" type="text" placeholder="Название организации" required>
            <input class="organizationAdress employersTextInput employersRawElem" name="organizationAdress" type="text" placeholder="Адрес организации" required>
            <div class="salary__inputs employersRawElem">
                <span class="salaryLabel">Заработная плата</span>
                <input class="salaryMin employersTextInput" name="salaryMin" type="number" placeholder="От" required>
                <span>-</span>
                <input class="salaryMax employersTextInput" name="salaryMax" type="number" placeholder="До" required>
            </div>
            <div class="responsibilities__wrapper">
                <textarea 
                class="responsibilities employersTextInput employersRawElem" 
                name="responsibilities" 
                placeholder="Краткий перечень обязанностей (не более 5 пунктов)"
                ></textarea>
            </div>
            <div class="watchStudents employersRawElem">
                <span>Рассматриваете студентов?</span>
                <div class="radioBlock">
                    <input
                        type="radio"
                        id="studentsYes"
                        name="students"
                        value="Yes"
                        checked />
                    <label for="studentsYes">Да</label>
                </div>
                
                <div class="radioBlock">
                    <input type="radio" id="studentsNo" name="students" value="No" />
                    <label for="studentsNo">Нет</label>
                </div>
            

            </div>

            <div class="workExp employersRawElem">
                <span>Нужен опыт работы?</span>

                <div class="radioBlock">
                    <input
                        type="radio"
                        id="workExpYes"
                        name="workExp"
                        value="Yes"
                        checked />
                    <label for="workExpYes">Да</label>
                </div>

                <div class="radioBlock">
                    <input type="radio" id="workExpNo" name="workExp" value="No" />
                    <label for="workExpNo">Нет</label>
                    
                </div>
            </div>
            <div class="formOfEmployment employersRawElem">
                <span>Форма занятости:</span>

                <div class="radioBlock">
                    <input
                        type="radio"
                        id="formOfEmployment-full"
                        name="formOfEmployment"
                        value="Full"
                        checked />
                    <label for="formOfEmployment-full">Полная</label>
                    
                </div>

                <div class="radioBlock">
                    <input type="radio" id="formOfEmployment-partial" name="formOfEmployment" value="Partial" />
                    <label for="formOfEmployment-partial">Частичная</label>
                    
                </div>
                
                <div class="radioBlock">
                    <input type="radio" id="formOfEmployment-remote" name="formOfEmployment" value="Remote" />
                    <label for="formOfEmployment-remote">Удаленная</label>
                    
                </div>
            </div>
            <input class="contactPerson employersTextInput employersRawElem" name="contactPerson" type="text" placeholder="Контактное лицо" required>
            <div class="connectInfo__inputs employersRawElem">
                <input class="employersEmail employersTextInput" name="employersEmail" type="email" placeholder="E-mail для связи" required>
                <input class="employersPhone employersTextInput" name="employersPhone" type="tel" placeholder="Телефон для связи" required>
            </div>
            <div class="employersForm__footer employersRawElem">
                <button type="submit" id="sendEmployersForm">Предложить</button>
                <div class="haveQuestions">
                    Возникли вопросы по заполнению? <a href="https://vk.com/write-216548247" target="_blank">Напишите нам!</a>
                </div>
            </div>
            <div id="loader-identityEmployrsForm" class='animate__animated animate__fadeIn'><div id="employrsFormSpinner"><img src="img/loading.png" alt="загрузка..."></div></div>
        </form>
        </div>
        `;
        document.body.append(EFOverlay);

        EFOverlay.addEventListener('click', (e) => {
            if (e.target.id == 'employersForm__close') {
                EFOverlay.classList.replace('visible', 'hidden');
                EFOverlay.remove();
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
                    localStorage.clear();
                }).catch(() => {
                    alert('При отправке произошла ошибка, попробуйте снова');
                }).finally(() => {
                    form.reset();
                    hideLoaderIdentity();
                });
    
            });
        }
        bindPostData(document.querySelector('#employersForm'));

        const inputs = document.querySelectorAll('.employersTextInput');

        for (const input of inputs) {
            input.value = localStorage[`input_${input.name}`] || '';
            input.addEventListener('change', function() {
                localStorage[`input_${this.name}`] = this.value;
            });
        }
        
        const textArea = document.querySelector('textarea');
        textArea.value = localStorage[`textarea_${textArea.name}`] || '';
        textArea.onchange = function() {
            localStorage[`textarea_${this.name}`] = this.value;
        };
    };

    const jobOfferBtn = document.querySelector('.jobOffer');

    jobOfferBtn.addEventListener('click', () => {
        createOverlayAndForm();

        const overlay = document.querySelector('.ef-overlay');
        overlay.classList.replace('hidden', 'visible');
        document.body.style.overflow = 'hidden';
    });

};

export default formForEmployers;
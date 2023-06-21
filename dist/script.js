/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/card.js":
/*!********************************!*\
  !*** ./src/js/modules/card.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EmployerCard; }
/* harmony export */ });
/* harmony import */ var _ppd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ppd */ "./src/js/modules/ppd.js");
/* harmony import */ var _ppdText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ppdText */ "./src/js/modules/ppdText.js");


class EmployerCard {
  constructor(id, category, jobTitle, employer, salary, tags, link, feed, vacancyArr) {
    this.id = id;
    this.category = category;
    this.jobTitle = jobTitle;
    this.employer = employer;
    this.salary = salary;
    this.tags = [...tags];
    this.link = link;
    this.feed = feed;
    this.vacancyArr = [...vacancyArr];
  }
  renderCards() {
    const element = document.createElement('div');
    element.classList.add('card', `card${this.id}`);
    element.style.background = `white`;
    element.innerHTML = `
            <div class="card__title">${this.employer}</div>
            <div class="card__employer">${this.jobTitle}</div>
            <div class="card__salary">${this.salary}</div>
            <div class="card__tags">${this.tags.join('<br>')}</div>
            <div class="card__buttons">
                <button class="moreInfoBtn">Подробнее</button>
                <button class="feed" data-id=${this.id}>Связаться</button>
            </div>
        `;
    document.querySelector(`#${this.category}Cards`).append(element);
  }
  openModal(id) {
    let vacancyInfo = this.vacancyArr.filter(item => item.id == id)[0];
    const element = document.createElement('div');
    element.classList.add('form', 'animate__animated', 'animate__fadeIn');
    element.innerHTML = `
            <i class="fa-solid fa-square-xmark" id="modal__close"></i>

            <div class="form__img">
                <img src="./img/formImgGroup.svg" alt="">
            </div>
            <form class="form__items" enctype="multipart/form-data" method="post" id="form">
                <div class="titles">
                    <h2>Откликнуться на вакансию</h2>
                    <h3>${vacancyInfo.employer.replace(/['"«»]/g, '')}, ${vacancyInfo.jobTitle}</h3>
                </div>
                <input class="hiddenInputs" name="jobTitle" type="text" value='${vacancyInfo.jobTitle}' required>
                <input class="hiddenInputs" name="employer" type="text" value='${vacancyInfo.employer.replace(/['"«»]/g, ' ')}' required>
                <input class="FIOInput" name="surnameName" type="text" placeholder="Укажите Ваше ФИО" required>
                <div class="addFile__wrapper">
                    <label for="resumeFile"><i class="fa-solid fa-arrow-up-from-bracket"></i></label>
                    <div class="addFile__text">Прикрепите файл с Вашим резюме <span style="font-weight: bold">в формате .PDF</span>
                        <div class="uploadFileName">выберите файл</div>
                        <div class="invalidFileSize">Размер прикрепленного файла не должен быть больше 15mb</div>
                        <div class="invalidFileType">Прикреплен файл не в формате PDF</div>
                    </div>
                    <input class="resume" name="resumeFile[]" type="file" id="resumeFile" required accept="application/pdf"/>
                </div>
                <div class='ppdCp__wrapper'>
                    <i class="fa-regular fa-square ppdCpCheck"></i>
                    <span class='ppdCp-agree'>Согласен с <span class='ppd-span'>правилами обработки персональных данных</span></span>
                </div>
                <button type="submit" id="sendForm">Отправить</button>
                <div class="noResume">
                    Еще не составил резюме? 
                    <a class="moreInfoBtn" href='https://vk.com/market-216548247_7541645' target="_blank"><span style="font-weight: bold">Записывайся к нам на консультацию</span></a>
                    <br>
                    и мы поможем тебе круто презентовать себя!
                </div>
                <div id="loader-identity" class='animate__animated animate__fadeIn'><div id="spinner"><img src="img/loading.png" alt="загрузка..."></div></div>
            </form>
        `;
    document.querySelector('.main-overlay').append(element);
    document.querySelector('.form').style.left = '50%';
    const resume = document.querySelector('#resumeFile'),
      uploadFileName = document.querySelector('.uploadFileName'),
      invalidFileSizeMessage = document.querySelector('.invalidFileSize'),
      invalidFileTypeMessage = document.querySelector('.invalidFileType'),
      ppdCpCheck = document.querySelector('.ppdCpCheck');
    let ppdAgree = false,
      resumeSize = false;
    document.querySelector('#sendForm').disabled = true;
    function validateCheck() {
      if (ppdAgree === true && resumeSize === true) {
        document.querySelector('#sendForm').disabled = false;
      } else {
        document.querySelector('#sendForm').disabled = true;
      }
    }
    ppdCpCheck.addEventListener('click', () => {
      if (ppdCpCheck.classList.contains('fa-square')) {
        ppdCpCheck.classList.replace('fa-square', 'fa-square-check');
        ppdAgree = true;
      } else if (ppdCpCheck.classList.contains('fa-square-check')) {
        ppdCpCheck.classList.replace('fa-square-check', 'fa-square');
        ppdAgree = false;
      }
      validateCheck();
    });
    function validateSize(input) {
      const fileSize = input.files[0].size / 1024 / 1024,
        fileType = input.files[0].type.split('/')[1].toLowerCase();
      if (fileSize > 15 && fileType !== 'pdf') {
        resumeSize = false;
        invalidFileTypeMessage.style.display = 'block';
        invalidFileSizeMessage.style.display = 'block';
      } else if (fileSize > 15 && fileType === 'pdf') {
        resumeSize = false;
        invalidFileTypeMessage.style.display = 'none';
        invalidFileSizeMessage.style.display = 'block';
      } else if (fileSize <= 15 && fileType !== 'pdf') {
        resumeSize = false;
        invalidFileSizeMessage.style.display = 'none';
        invalidFileTypeMessage.style.display = 'block';
      } else {
        resumeSize = true;
        invalidFileSizeMessage.style.display = 'none';
        invalidFileTypeMessage.style.display = 'none';
      }
      validateCheck();
    }
    resume.addEventListener('change', () => {
      uploadFileName.textContent = resume.files[0].name;
      console.log(resume.files[0]);
      validateSize(resume);
    });
    document.querySelector('.ppd-span').addEventListener('click', (0,_ppd__WEBPACK_IMPORTED_MODULE_0__["default"])('.ppd-span', _ppdText__WEBPACK_IMPORTED_MODULE_1__["default"]));
    function showLoaderIdentity() {
      $("#loader-identity").show();
    }
    function hideLoaderIdentity() {
      $("#loader-identity").hide();
    }
    $('.form__items').on('submit', function (e) {
      showLoaderIdentity();
      e.preventDefault();
      var form = $(this);
      var data = new FormData();
      form.find(':input[name]').not('[type="file"]').each(function () {
        var field = $(this);
        data.append(field.attr('name'), field.val());
      });
      var filesField = form.find('input[type="file"]');
      var fileName = filesField.attr('name');
      var file = filesField.prop('files')[0];
      data.append(fileName, file);
      console.log(data);
      var url = 'send.php';
      $.ajax({
        url: url,
        type: 'POST',
        data: data,
        contentType: false,
        cache: false,
        processData: false
      }).done(function () {
        const overlay = document.querySelector('.main-overlay');
        alert('Резюме успешно отправлено, с Вами свяжуться');
        overlay.classList.replace('visible', 'hidden');
        document.body.style.overflowY = 'visible';
        document.querySelector('.form').remove();
        hideLoaderIdentity();
      }).fail(function () {
        hideLoaderIdentity();
        alert('Отправка не удалась, попробуйте еще раз');
      });
    });
  }
  setListeners() {
    const card = document.querySelector(`.card${this.id}`),
      overlay = document.querySelector('.main-overlay');
    overlay.addEventListener('click', e => {
      if (e.target.id === 'modal__close') {
        overlay.classList.replace('visible', 'hidden');
        document.body.style.overflowY = 'visible';
        e.target.parentNode.remove();
      }
    });
    card.addEventListener('click', e => {
      if (e.target.classList.contains('feed')) {
        this.openModal(e.target.dataset.id);
        overlay.classList.replace('hidden', 'visible');
        document.body.style.overflow = 'hidden';
      }
      if (e.target.classList.contains('moreInfoBtn')) {
        window.open(this.link, '_blank').focus();
      }
    });
  }
  init() {
    this.renderCards();
    this.setListeners();
  }
}

/***/ }),

/***/ "./src/js/modules/formForEmployers.js":
/*!********************************************!*\
  !*** ./src/js/modules/formForEmployers.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");

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
    EFOverlay.addEventListener('click', e => {
      if (e.target.id == 'employersForm__close') {
        EFOverlay.classList.replace('visible', 'hidden');
        EFOverlay.remove();
        document.body.style.overflowY = 'visible';
      }
    });
    function showLoaderIdentity() {
      $("#loader-identityEmployrsForm").show();
    }
    function hideLoaderIdentity() {
      $("#loader-identityEmployrsForm").hide();
    }
    function bindPostData(form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        showLoaderIdentity();
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.postData)('sendVacancyOffer.php', json).then(data => {
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
      input.addEventListener('change', function () {
        localStorage[`input_${this.name}`] = this.value;
      });
    }
    const textArea = document.querySelector('textarea');
    textArea.value = localStorage[`textarea_${textArea.name}`] || '';
    textArea.onchange = function () {
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
/* harmony default export */ __webpack_exports__["default"] = (formForEmployers);

/***/ }),

/***/ "./src/js/modules/partnershipTable.js":
/*!********************************************!*\
  !*** ./src/js/modules/partnershipTable.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const partnership = () => {
  document.querySelector('.partnership__table').querySelectorAll('td').forEach(item => {
    if (item.classList.contains('included')) {
      item.innerHTML = `
                <svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4893 25.0045C12.8283 24.9112 12.3038 24.6483 11.8395 24.177C10.7106 23.0319 9.5623 21.8693 8.45169 20.7451C6.08248 18.3468 3.63271 15.8668 1.23727 13.4183C0.391871 12.5539 0.186341 11.7058 0.550033 10.5808C0.73228 10.0184 0.993474 9.59919 1.34405 9.30022C1.69463 9.00124 2.17099 8.80509 2.7576 8.71339C2.91554 8.68814 3.07515 8.67517 3.23503 8.6746C3.91853 8.6746 4.49283 8.93233 5.04386 9.48524C6.49166 10.9391 7.95847 12.4286 9.37684 13.8692C9.99914 14.5012 10.6216 15.1329 11.2443 15.7645C11.5376 16.061 12.4263 16.9623 13.7909 16.9623C15.1555 16.9623 16.0239 16.0846 16.3499 15.7542L19.5246 12.5363C23.252 8.75788 27.1065 4.85115 30.8959 1.00599C31.6295 0.261814 32.1775 0.116125 32.5733 0.0727168L32.7007 0.0586092L32.8265 0.031479C32.9285 0.010212 33.0323 -0.000334104 33.1364 8.06524e-06C33.4013 8.06524e-06 33.6984 0.0721742 34.0155 0.214336C35.0127 0.659813 35.5163 1.30768 35.6991 2.38041C35.7077 2.42978 35.7171 2.4778 35.7275 2.52447V3.1452C35.6804 3.31477 35.6539 3.45666 35.6359 3.55514C35.4917 4.02286 35.2918 4.38207 35.026 4.65201L34.1726 5.518C28.1065 11.6746 21.8339 18.0415 15.6527 24.288C15.1517 24.7945 14.5582 25.0276 13.7355 25.0392L13.4893 25.0045Z" fill="#003CA5"/>
                </svg>
            `;
    } else if (!item.classList.contains('parnershipPrice') && !item.classList.contains('partnerType')) {
      item.innerHTML = `
                <div class="notIncluded"></div>
            `;
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (partnership);

/***/ }),

/***/ "./src/js/modules/ppd.js":
/*!*******************************!*\
  !*** ./src/js/modules/ppd.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
    ppdWrapper.append(ppdTextElem);
    ppdCpOverlay.append(ppdWrapper);
    document.body.style.overflow = 'hidden';
    document.querySelector('#ppd__close').addEventListener('click', () => {
      ppdCpOverlay.classList.replace('visible', 'hidden');
      document.querySelector('.ppd__wrapper').remove();
      document.body.style.overflowY = 'visible';
    });
  });
};
/* harmony default export */ __webpack_exports__["default"] = (ppd);

/***/ }),

/***/ "./src/js/modules/ppdText.js":
/*!***********************************!*\
  !*** ./src/js/modules/ppdText.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const ppdText = `
    ПОЛИТИКА ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ 
    <br/><br/>
    Центра карьеры и трудоустройства УрГЮУ им. В.Ф. Яковлева
    <br/><br/>
    г. Екатеринбург «24» мая 2023 года
    <br/><br/>
    
    1. Общие положения
    <br/>1.1. Настоящая Политика обработки персональных данных Центра карьеры и трудоустройства Уральского государственного юридического университета им. В.Ф. Яковлева (далее - Политика) разработана во исполнение требований п. 2 ч. 1 ст. 18.1 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» (далее – Закон о персональных данных) в целях обеспечения защиты прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
    <br/>1.2. Политика действует в отношении всех персональных данных, которые обрабатывает Центр карьеры и трудоустройства Уральского государственного юридического университета им. В.Ф. Яковлева.
    <br/>1.3. Политика распространяется на отношения в области обработки персональных данных, возникшие как до, так и после утверждения настоящей Политики.
    <br/>1.4. Во исполнение требований ч. 2 ст. 18.1 Закона о персональных данных настоящая Политика публикуется в свободном доступе в информационно-телекоммуникационной сети Интернет на сайте Оператора.
    <br/><br/>
    2. Термины и принятые сокращения
    <br/>2.1. Персональные данные (ПД) – любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу (субъекту персональных данных).
    <br/>2.2. Персональные данные, разрешенные субъектом персональных данных для распространения – это персональные данные, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных путем дачи согласия на обработку персональных данных, разрешенных субъектом персональных данных для распространения.
    <br/>2.3. Оператор персональных данных (оператор) – государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и (или) осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.
    <br/>2.4. Обработка персональных данных – любое действие (операция) или совокупность действий (операций) с персональными данными, совершаемых с использованием средств автоматизации или без их использования. Обработка персональных данных включает в себя в том числе сбор; запись; систематизацию; накопление; хранение; уточнение (обновление, изменение); извлечение; использование; передачу (предоставление, доступ); распространение; обезличивание; блокирование; удаление; уничтожение.
    <br/>2.5. Автоматизированная обработка персональных данных – обработка персональных данных с помощью средств вычислительной техники.
    <br/>2.6. Предоставление персональных данных – действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.
    <br/>2.7. Распространение персональных данных – действия, направленные на раскрытие персональных данных неопределенному кругу лиц.
    <br/>2.8. Блокирование персональных данных – временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).
    <br/>2.9. Уничтожение персональных данных – действия, в результате которых становится невозможным восстановить содержание персональных данных в информационной системе персональных данных и (или) в результате которых уничтожаются материальные носители персональных данных.
    <br/>2.10. Обезличивание персональных данных – действия, в результате которых становится
    невозможным без использования дополнительной информации определить принадлежность персональных данных конкретному субъекту персональных данных.
    <br/>2.11. Информационная система персональных данных – совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку, информационных технологий и технических средств.
    <br/>2.12. Трансграничная передача персональных данных – передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому лицу или иностранному юридическому лицу.
    <br/>2.13. Защита персональных данных – деятельность, направленная на предотвращение утечки защищаемых персональных данных, несанкционированных и непреднамеренных воздействий на защищаемые персональные данные.
    <br/><br/>
    3. Порядок и условия обработки и хранение персональных данных
    <br/>3.1. Обработка персональных данных осуществляется Оператором в соответствии с требованиями законодательства Российской Федерации.
    <br/>3.2. Обработка персональных данных осуществляется с согласия субъектов персональных данных на обработку их персональных данных, а также без такового в случаях, предусмотренных законодательством Российской Федерации.
    <br/>3.3. Согласие на обработку персональных данных, разрешенных субъектом персональных данных для распространения, оформляется отдельно от иных согласий субъекта персональных данных на обработку его персональных данных.
    <br/>3.4. Согласие на обработку персональных данных, разрешенных субъектом персональных данных для распространения, может быть предоставлено оператору:
    непосредственно;
    с использованием информационной системы уполномоченного органа по защите прав субъектов персональных данных.
    <br/>3.5. Оператор осуществляет как автоматизированную, так и неавтоматизированную обработку персональных данных.
    <br/>3.6. К обработке персональных данных допускаются работники Оператора, в должностные обязанности которых входит обработка персональных данных.
    <br/>3.7. Обработка персональных данных осуществляется путем:
    получения персональных данных в устной и письменной форме непосредственно с согласия субъекта персональных данных на обработку или распространение его персональных данных;
    внесения персональных данных в журналы, реестры и информационные системы Оператора;
    использования иных способов обработки персональных данных.
    <br/>3.8. Не допускается раскрытие третьим лицам и распространение персональных данных без согласия субъекта персональных данных, если иное не предусмотрено федеральным законом.
    <br/>3.9. Передача персональных данных органам дознания и следствия, в Федеральную налоговую службу, Пенсионный фонд, Фонд социального страхования и другие уполномоченные органы исполнительной власти и организации осуществляется в соответствии с требованиями законодательства Российской Федерации.
    <br/>3.10. Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, распространения и других несанкционированных действий, в том числе:
    определяет угрозы безопасности персональных данных при их обработке;
    принимает локальные нормативные акты и иные документы, регулирующие отношения в сфере обработки и защиты персональных данных;
    назначает лиц, ответственных за обеспечение безопасности персональных данных в структурных подразделениях и информационных системах Оператора;
    создает необходимые условия для работы с персональными данными;
    организует учет документов, содержащих персональные данные;
    организует работу с информационными системами, в которых обрабатываются персональные данные;
    хранит персональные данные в условиях, при которых обеспечивается их сохранность и исключается неправомерный доступ к ним;
    организует обучение работников Оператора, осуществляющих обработку персональных данных.
    <br/>3.11. Оператор осуществляет хранение персональных данных в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором или соглашением.
    <br/>3.12. При сборе персональных данных, в том числе посредством информационно телекоммуникационной сети интернет, Оператор обеспечивает запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение персональных данных граждан Российской Федерации с использованием баз данных, находящихся на территории Российской Федерации, за исключением случаев, указанных в Законе о персональных данных.
    <br/>3.13. Цели обработки персональных данных:
    <br/>3.13.1. Обработке подлежат только персональные данные, которые отвечают целям их обработки.
    <br/>3.13.2. Обработка Оператором персональных данных осуществляется в следующих целях:
    обеспечение соблюдения Конституции, федеральных законов и иных нормативных правовых актов Российской Федерации;
    осуществление своей деятельности в соответствии с Положением о Центре карьеры и трудоустройства УрГЮУ им. В.Ф. Яковлева;
    ведение кадрового делопроизводства;
    содействие работникам в трудоустройстве, получении образования и продвижении по службе, обеспечение личной безопасности работников, контроль количества и качества выполняемой работы, обеспечение сохранности имущества;
    привлечение и отбор кандидатов на работу у Оператора;
    организация постановки на индивидуальный (персонифицированный) учет работников в системе обязательного пенсионного страхования;
    заполнение и передача в органы исполнительной власти и иные уполномоченные организации требуемых форм отчетности;
    осуществление гражданско-правовых отношений;
    ведение бухгалтерского учета;
    осуществление пропускного режима.
    <br/>3.14.3. Обработка персональных данных работников может осуществляться исключительно в целях обеспечения соблюдения законов и иных нормативных правовых актов.
    <br/>3.15. Категории субъектов персональных данных.
    Обрабатываются ПД следующих субъектов ПД:
    физические лица, состоящие с Уральским государственным юридическим университетом в трудовых отношениях;
    физические лица, использующие электронный ресурс https://uslu-career.ru/ в любом качестве.
    <br/>3.16. ПД, обрабатываемые Оператором:
    данные, полученные при осуществлении трудовых отношений;
    данные, полученные при использовании электронного ресурса https://uslu-career.ru/.
    <br/>3.17. Хранение ПД.
    <br/>3.17.1. ПД субъектов могут быть получены, проходить дальнейшую обработку и передаваться на хранение как на бумажных носителях, так и в электронном виде.
    <br/>3.17.2. ПД, зафиксированные на бумажных носителях, хранятся в запираемых шкафах либо в запираемых помещениях с ограниченным правом доступа.
    <br/>3.17.3. ПД субъектов, обрабатываемые с использованием средств автоматизации в разных целях, хранятся в разных папках.
    <br/>3.17.4. Не допускается хранение и размещение документов, содержащих ПД, в открытых электронных каталогах (файлообменниках) в ИСПД.
    <br/>3.17.5. Хранение ПД в форме, позволяющей определить субъекта ПД, осуществляется не дольше, чем этого требуют цели их обработки, и они подлежат уничтожению по достижении целей обработки или в случае утраты необходимости в их достижении.
    <br/>3.17. Уничтожение ПД.
    <br/>3.17.1. Уничтожение документов (носителей), содержащих ПД, производится путем сожжения, дробления (измельчения), химического разложения, превращения в бесформенную массу или порошок. Для уничтожения бумажных документов допускается применение шредера.
    <br/>3.17.2. ПД на электронных носителях уничтожаются путем стирания или форматирования носителя.
    <br/>3.17.3. Факт уничтожения ПД подтверждается документально актом об уничтожении носителей.
    <br/><br/>
    4. Защита персональных данных
    <br/>4.1. В соответствии с требованиями нормативных документов Оператором создана система защиты персональных данных (СЗПД), состоящая из подсистем правовой, организационной и технической защиты.
    <br/>4.2. Подсистема правовой защиты представляет собой комплекс правовых, организационно-распорядительных и нормативных документов, обеспечивающих создание, функционирование и совершенствование СЗПД.
    <br/>4.3. Подсистема организационной защиты включает в себя организацию структуры управления СЗПД, разрешительной системы, защиты информации при работе с сотрудниками, партнерами и сторонними лицами.
    <br/>4.4. Подсистема технической защиты включает в себя комплекс технических, программных, программно-аппаратных средств, обеспечивающих защиту ПД.
    <br/>4.4. Основными мерами защиты ПД, используемыми Оператором, являются:
    <br/>4.5.1. Назначение лица, ответственного за обработку ПД, которое осуществляет организацию обработки ПД, обучение и инструктаж, внутренний контроль за соблюдением учреждением и его работниками требований к защите ПД.
    <br/>4.5.2. Определение актуальных угроз безопасности ПД при их обработке в ИСПД и разработка мер и мероприятий по защите ПД.
    <br/>4.5.3. Разработка политики в отношении обработки персональных данных.
    <br/>4.5.4. Установление правил доступа к ПД, обрабатываемым в ИСПД, а также обеспечение регистрации и учета всех действий, совершаемых с ПД в ИСПД.
    <br/>4.5.5. Установление индивидуальных паролей доступа сотрудников в информационную систему в соответствии с их производственными обязанностями.
    <br/>4.5.6. Применение прошедших в установленном порядке процедуру оценки соответствия средств защиты информации.
    <br/>4.5.7. Сертифицированное антивирусное программное обеспечение с регулярно обновляемыми базами.
    <br/>4.5.8. Соблюдение условий, обеспечивающих сохранность ПД и исключающих
    несанкционированный к ним доступ.
    <br/>4.5.9. Обнаружение фактов несанкционированного доступа к персональным данным и принятие мер.
    <br/>4.5.10. Восстановление ПД, модифицированных или уничтоженных вследствие
    несанкционированного доступа к ним.
    <br/>4.5.11. Обучение работников Оператора, непосредственно осуществляющих обработку персональных данных, положениям законодательства РФ о персональных данных, в том числе требованиям к защите персональных данных, документам, определяющим политику Оператора в отношении обработки персональных данных, локальным актам по вопросам обработки персональных данных.
    <br/>4.5.12. Осуществление внутреннего контроля и аудита.
    <br/><br/>
    5. Основные права субъекта персональных данных и обязанности Оператора
    <br/>5.1. Основные права субъекта персональных данных.
    Субъект имеет право на доступ к его персональным данным и следующим сведениям:
    подтверждение факта обработки персональных данных Оператором;
    правовые основания и цели обработки персональных данных;
    цели и применяемые Оператором способы обработки персональных данных;
    наименование и место нахождения Оператора, сведения о лицах (за исключением работников Оператора), которые имеют доступ к персональным данным или которым могут быть раскрыты персональные данные на основании договора с Оператором или на основании федерального закона;
    сроки обработки персональных данных, в том числе сроки их хранения;
    порядок осуществления субъектом персональных данных прав, предусмотренных настоящим Федеральным законом;
    наименование или фамилия, имя, отчество и адрес лица, осуществляющего обработку персональных данных по поручению Оператора, если обработка поручена или будет поручена такому лицу;
    обращение к Оператору и направление ему запросов;
    обжалование действий или бездействия Оператора.
    <br/>5.2. Обязанности Оператора.
    Оператор обязан:
    при сборе персональных данных предоставить информацию об обработке персональных данных;
    в случаях если персональные данные были получены не от субъекта персональных данных, уведомить субъекта;
    при отказе в предоставлении персональных данных субъекту разъясняются последствия такого отказа;
    опубликовать или иным образом обеспечить неограниченный доступ к документу, определяющему его политику в отношении обработки персональных данных, к сведениям о реализуемых требованиях к защите персональных данных;
    принимать необходимые правовые, организационные и технические меры или обеспечивать их принятие для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных;
    давать ответы на запросы и обращения субъектов персональных данных, их представителей и уполномоченного органа по защите прав субъектов персональных данных.
    <br/><br/>
    6. Актуализация, исправление, удаление и уничтожение персональных данных, ответы на запросы субъектов на доступ к персональным данным
    <br/>6.1. Подтверждение факта обработки персональных данных Оператором, правовые основания и цели обработки персональных данных, а также иные сведения, указанные в ч. 7 ст. 14 Закона о персональных данных, предоставляются Оператором субъекту персональных данных или его представителю при обращении либо при получении запроса субъекта персональных данных или его представителя.
    В предоставляемые сведения не включаются персональные данные, относящиеся к другим субъектам персональных данных, за исключением случаев, когда имеются законные основания для раскрытия таких персональных данных.
    Запрос должен содержать:
    номер основного документа, удостоверяющего личность субъекта персональных данных или его представителя, сведения о дате выдачи указанного документа и выдавшем его органе;
    сведения, подтверждающие участие субъекта персональных данных в отношениях с Оператором (номер договора, дата заключения договора, условное словесное обозначение и (или) иные сведения), либо сведения, иным образом подтверждающие факт обработки персональных данных Оператором;
    подпись субъекта персональных данных или его представителя.
    Запрос может быть направлен в форме электронного документа и подписан электронной подписью в соответствии с законодательством Российской Федерации.
    Если в обращении (запросе) субъекта персональных данных не отражены в соответствии с требованиями Закона о персональных данных все необходимые сведения или субъект не обладает правами доступа к запрашиваемой информации, то ему направляется мотивированный отказ.
    Право субъекта персональных данных на доступ к его персональным данным может быть ограничено в соответствии с ч. 8 ст. 14 Закона о персональных данных, в том числе если доступ субъекта персональных данных к его персональным данным нарушает права и законные интересы третьих лиц.
    <br/>6.2. В случае выявления неточных персональных данных при обращении субъекта персональных данных или его представителя либо по их запросу или по запросу Роскомнадзора Оператор осуществляет блокирование персональных данных, относящихся к этому субъекту персональных данных, с момента такого обращения или получения указанного запроса на период проверки, если блокирование персональных данных не нарушает права и законные интересы субъекта персональных данных или третьих лиц.
    В случае подтверждения факта неточности персональных данных Оператор на основании сведений, представленных субъектом персональных данных или его представителем либо Роскомнадзором, или иных необходимых документов уточняет персональные данные в течение семи рабочих дней со дня представления таких сведений и снимает блокирование персональных данных.
    <br/>6.3. В случае выявления неправомерной обработки персональных данных при обращении (запросе) субъекта персональных данных или его представителя либо Роскомнадзора Оператор осуществляет блокирование неправомерно обрабатываемых персональных данных, относящихся к этому субъекту персональных данных, с момента такого обращения или получения запроса.
    <br/>6.4. При достижении целей обработки персональных данных, а также в случае отзыва субъектом персональных данных согласия на их обработку персональные данные подлежат уничтожению, если:
    иное не предусмотрено договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных;
    оператор не вправе осуществлять обработку без согласия субъекта персональных данных на основаниях, предусмотренных Законом о персональных данных или иными федеральными законами;
    иное не предусмотрено другим соглашением между Оператором и субъектом персональных данных.
    <br/><br/>
    7. Заключительные положения
    <br/>7.1. Ответственность за нарушение требований законодательства Российской Федерации и нормативных документов Центром карьеры и трудоустройства Уральского государственного юридического университета им. В.Ф. Яковлева в области персональных данных определяется в соответствии с законодательством Российской Федерации.
    <br/>7.2. Настоящая Политика вступает в силу с момента утверждения и действует бессрочно до принятия новой Политики.
    <br/>7.3. Все изменения и дополнения к настоящей Политике должны быть утверждены директором Центра карьеры и трудоустройства Уральского государственного юридического университета им. В.Ф. Яковлева.
    `;
/* harmony default export */ __webpack_exports__["default"] = (ppdText);

/***/ }),

/***/ "./src/js/modules/smothScroll.js":
/*!***************************************!*\
  !*** ./src/js/modules/smothScroll.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"').forEach(link => {
    link.addEventListener('click', function (e) {
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
      };
    }
  };
  btnUp.addEventListener();
};
/* harmony default export */ __webpack_exports__["default"] = (smoothScroll);

/***/ }),

/***/ "./src/js/modules/vacancy.js":
/*!***********************************!*\
  !*** ./src/js/modules/vacancy.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_requests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/requests */ "./src/js/services/requests.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card */ "./src/js/modules/card.js");


const vacancy = () => {
  (0,_services_requests__WEBPACK_IMPORTED_MODULE_0__.getResource)('./vacancy.json').then(res => {
    res.vacancy.map(_ref => {
      let {
        id,
        category,
        employer,
        jobTitle,
        salary,
        tags,
        link,
        feed
      } = _ref;
      new _card__WEBPACK_IMPORTED_MODULE_1__["default"](id, category, employer, jobTitle, salary, tags, link, feed, res.vacancy).init();
    });
  }).then(() => {
    document.querySelectorAll('.vacancy__cards').forEach(item => {
      if (item.children.length === 0) {
        const noCards = document.createElement('div');
        noCards.classList.add('noCards');
        noCards.innerHTML = `<div class='noCards'>В настоящее время вакансии в данной категории отсутствуют</div>`;
        item.append(noCards);
      }
    });
  }).catch(() => {
    document.querySelectorAll('.vacancy__cards').forEach(item => {
      if (item.children.length === 0) {
        const noCards = document.createElement('div');
        noCards.classList.add('noCards');
        noCards.innerHTML = `<div class='noCards'>Загрузить инормацию об имеющихся вакансиях не удалось, попробуйте перезагрузить страницу</div>`;
        item.append(noCards);
      }
    });
  });
};
/* harmony default export */ __webpack_exports__["default"] = (vacancy);

/***/ }),

/***/ "./src/js/services/requests.js":
/*!*************************************!*\
  !*** ./src/js/services/requests.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
const getResource = async url => {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(`could not fetch ${url}, status: ${result.status}`);
  }
  return await result.json();
};
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await res.json();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_smothScroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/smothScroll */ "./src/js/modules/smothScroll.js");
/* harmony import */ var _modules_partnershipTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/partnershipTable */ "./src/js/modules/partnershipTable.js");
/* harmony import */ var _modules_vacancy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/vacancy */ "./src/js/modules/vacancy.js");
/* harmony import */ var _modules_formForEmployers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/formForEmployers */ "./src/js/modules/formForEmployers.js");
/* harmony import */ var _modules_ppd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/ppd */ "./src/js/modules/ppd.js");
/* harmony import */ var _modules_ppdText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/ppdText */ "./src/js/modules/ppdText.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules/filterCards'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());







document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  (0,_modules_smothScroll__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_partnershipTable__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_vacancy__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_formForEmployers__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_ppd__WEBPACK_IMPORTED_MODULE_4__["default"])('.ppd-btn', _modules_ppdText__WEBPACK_IMPORTED_MODULE_5__["default"]);
  Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules/filterCards'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
});
}();
/******/ })()
;
//# sourceMappingURL=script.js.map
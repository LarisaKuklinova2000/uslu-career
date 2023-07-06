import ppd from "./ppd";
import ppdText from "./ppdText";

const renderSingleCard = (id, category, jobTitle, employer, salary, tags, link) => {
    const element = document.createElement('div');
        element.classList.add('card', `card${id}`);
        element.style.background = `white`;
        element.innerHTML = `
            <div class="card__title">${employer}</div>
            <div class="card__employer">${jobTitle}</div>
            <div class="card__salary">${salary}</div>
            <div class="card__tags">${tags.join('<br>')}</div>
            <div class="card__buttons">
                <a target="_blank" href=${link} class="moreInfoBtn">Подробнее</a>
                <button class="feed" data-id=${id}>Связаться</button>
            </div>
        `;
    
        document.querySelector(`#${category}Cards`).append(element);
        // return element;
}

export default renderSingleCard;

// export default class EmployerCard {
//     constructor(id, category, jobTitle, employer, salary, tags, link, feed, vacancyArr) {
//         this.id = id;
//         this.category = category;
//         this.jobTitle = jobTitle;
//         this.employer = employer;
//         this.salary = salary;
//         this.tags = [...tags];
//         this.link = link;
//         this.feed = feed;
//         this.vacancyArr = [...vacancyArr];
//     }

//     renderCards() {
//         const element = document.createElement('div');
//         element.classList.add('card', `card${this.id}`);
//         element.style.background = `white`;
//         element.innerHTML = `
//             <div class="card__title">${this.employer}</div>
//             <div class="card__employer">${this.jobTitle}</div>
//             <div class="card__salary">${this.salary}</div>
//             <div class="card__tags">${this.tags.join('<br>')}</div>
//             <div class="card__buttons">
//                 <button class="moreInfoBtn">Подробнее</button>
//                 <button class="feed" data-id=${this.id}>Связаться</button>
//             </div>
//         `;
//         document.querySelector(`#${this.category}Cards`).append(element);
//     }

//     openModal(id) {
//         let vacancyInfo = this.vacancyArr.filter(item => item.id == id)[0];
//         const element = document.createElement('div');
//         element.classList.add('form', 'animate__animated', 'animate__fadeIn');
//         element.innerHTML = `
//             <i class="fa-solid fa-square-xmark" id="modal__close"></i>

//             <div class="form__img">
//                 <img src="./img/formImgGroup.svg" alt="">
//             </div>
//             <form class="form__items" enctype="multipart/form-data" method="post" id="form">
//                 <div class="titles">
//                     <h2>Откликнуться на вакансию</h2>
//                     <h3>${vacancyInfo.employer.replace(/['"«»]/g, '')}, ${vacancyInfo.jobTitle}</h3>
//                 </div>
//                 <input class="hiddenInputs" name="jobTitle" type="text" value='${vacancyInfo.jobTitle}' required>
//                 <input class="hiddenInputs" name="employer" type="text" value='${vacancyInfo.employer.replace(/['"«»]/g, ' ')}' required>
//                 <input class="FIOInput" name="surnameName" type="text" placeholder="Укажите Ваше ФИО" required>
//                 <div class="addFile__wrapper">
//                     <label for="resumeFile"><i class="fa-solid fa-arrow-up-from-bracket"></i></label>
//                     <div class="addFile__text">Прикрепите файл с Вашим резюме <span style="font-weight: bold">в формате .PDF</span>
//                         <div class="uploadFileName">выберите файл</div>
//                         <div class="invalidFileSize">Размер прикрепленного файла не должен быть больше 15mb</div>
//                         <div class="invalidFileType">Прикреплен файл не в формате PDF</div>
//                     </div>
//                     <input class="resume" name="resumeFile[]" type="file" id="resumeFile" required accept="application/pdf"/>
//                 </div>
//                 <div class='ppdCp__wrapper'>
//                     <i class="fa-regular fa-square ppdCpCheck"></i>
//                     <span class='ppdCp-agree'>Согласен с <span class='ppd-span'>правилами обработки персональных данных</span></span>
//                 </div>
//                 <button type="submit" id="sendForm">Отправить</button>
//                 <div class="noResume">
//                     Еще не составил резюме? 
//                     <a class="moreInfoBtn" href='https://vk.com/market-216548247_7541645' target="_blank"><span style="font-weight: bold">Записывайся к нам на консультацию</span></a>
//                     <br>
//                     и мы поможем тебе круто презентовать себя!
//                 </div>
//                 <div id="loader-identity" class='animate__animated animate__fadeIn'><div id="spinner"><img src="img/loading.png" alt="загрузка..."></div></div>
//             </form>
//         `;
//         document.querySelector('.main-overlay').append(element);
//         document.querySelector('.form').style.left = '50%';

//         const resume = document.querySelector('#resumeFile'),
//               uploadFileName = document.querySelector('.uploadFileName'),
//               invalidFileSizeMessage = document.querySelector('.invalidFileSize'),
//               invalidFileTypeMessage = document.querySelector('.invalidFileType'),
//               ppdCpCheck = document.querySelector('.ppdCpCheck');

//         let ppdAgree = false,
//             resumeSize = false;
        
//         document.querySelector('#sendForm').disabled = true;

//         function validateCheck() {
//             if (ppdAgree === true && resumeSize === true) {
//                 document.querySelector('#sendForm').disabled = false;
//             } else {
//                 document.querySelector('#sendForm').disabled = true;
//             }
//         }

//         ppdCpCheck.addEventListener('click', () => {
//             if (ppdCpCheck.classList.contains('fa-square')) {
//                 ppdCpCheck.classList.replace('fa-square', 'fa-square-check')
//                 ppdAgree = true;
//             } else if (ppdCpCheck.classList.contains('fa-square-check')) {
//                 ppdCpCheck.classList.replace('fa-square-check', 'fa-square')
//                 ppdAgree = false;
//             }
//             validateCheck();
//         })

//         function validateSize(input) {
//             const fileSize = input.files[0].size / 1024 / 1024,
//                 fileType = input.files[0].type.split('/')[1].toLowerCase();

//             if (fileSize > 15 && fileType !== 'pdf') {
//                 resumeSize = false;
//                 invalidFileTypeMessage.style.display = 'block';
//                 invalidFileSizeMessage.style.display = 'block';
//             } else if (fileSize > 15 && fileType === 'pdf') {
//                 resumeSize = false;
//                 invalidFileTypeMessage.style.display = 'none';
//                 invalidFileSizeMessage.style.display = 'block';
//             } else if (fileSize <= 15 && fileType !== 'pdf') {
//                 resumeSize = false;
//                 invalidFileSizeMessage.style.display = 'none';
//                 invalidFileTypeMessage.style.display = 'block';
//             } else {
//                 resumeSize = true;
//                 invalidFileSizeMessage.style.display = 'none';
//                 invalidFileTypeMessage.style.display = 'none';
//             }
//             validateCheck();
//         }

//         resume.addEventListener('change', () => {
//             uploadFileName.textContent = resume.files[0].name;
//             console.log(resume.files[0]);
//             validateSize(resume);
//         });

//         document.querySelector('.ppd-span').addEventListener('click', ppd('.ppd-span', ppdText));

//         function showLoaderIdentity() 
//         {
//             $("#loader-identity").show() ;
//         }
        
//         function hideLoaderIdentity() 
//         {
//         $("#loader-identity").hide();  
//         }

//         $('.form__items').on('submit', function(e){
//             showLoaderIdentity();
//             e.preventDefault();
//             var form = $(this);
//             var data = new FormData();

//             form.find(':input[name]').not('[type="file"]').each(function() { 
//                 var field = $(this);
//                 data.append(field.attr('name'), field.val());
//             })

//             var filesField = form.find('input[type="file"]');
//             var fileName = filesField.attr('name');
//             var file = filesField.prop('files')[0];
//             data.append(fileName, file) ;

//             console.log(data)

//             var url = 'send.php';

//             $.ajax({
//                 url: url,
//                 type: 'POST',
//                 data: data,
//                 contentType: false,
//                 cache: false, 
//                 processData:false
//             }).done(function() {
//                 const overlay = document.querySelector('.main-overlay');
//                 alert('Резюме успешно отправлено, с Вами свяжуться');
//                 overlay.classList.replace('visible', 'hidden');
//                 document.body.style.overflowY = 'visible';
//                 document.querySelector('.form').remove();
//                 hideLoaderIdentity();
//             }).fail(function() {
//                 hideLoaderIdentity();
//                 alert('Отправка не удалась, попробуйте еще раз');
//             });
//         });      
//     }

//     setListeners() {
//         const card = document.querySelector(`.card${this.id}`),
//               overlay = document.querySelector('.main-overlay');
//         overlay.addEventListener('click', (e) => {
//             if (e.target.id === 'modal__close') {
//                 overlay.classList.replace('visible', 'hidden');
//                 document.body.style.overflowY = 'visible';
//                 e.target.parentNode.remove();
//             }
//         });
//         card.addEventListener('click', (e) => {
//             if (e.target.classList.contains('feed')) {
//                 this.openModal(e.target.dataset.id);
//                 overlay.classList.replace('hidden', 'visible');
//                 document.body.style.overflow = 'hidden';
//             }

//             if (e.target.classList.contains('moreInfoBtn')) {
//                 window.open(this.link, '_blank').focus();
//             }
//         });
//     }

//     init() {
//         this.renderCards();
//         this.setListeners();
//     }
// }
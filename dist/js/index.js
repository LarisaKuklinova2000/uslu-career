'use strict';

document.addEventListener('DOMContentLoaded', function () {
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

    const getResource = async (url) => {
        const result = await fetch(url);
        if (!result.ok) {
            throw new Error(`could not fetch ${url}, status: ${result.status}`);
        }
        return await result.json();
    };

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await result;
    };

    let vacancyArr = [];

    class EmployerCard {
        constructor(id, category, jobTitle, employer, salary, tags, link, feed) {
            this.id = id;
            this.category = category;
            this.jobTitle = jobTitle;
            this.employer = employer;
            this.salary = salary;
            this.tags = [...tags];
            this.link = link;
            this.feed = feed;
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
            let vacancyInfo = vacancyArr.filter(item => item.id == id)[0]
            console.log(vacancyInfo.employer)
            const element = document.createElement('div');
            element.classList.add('form');
            element.innerHTML = `
                <i class="fa-solid fa-square-xmark" id="modal__close"></i>

                <div class="form__img">
                    <img src="./img/formImgGroup.svg" alt="">
                </div>
                <form class="form__items" enctype="multipart/form-data" method="post" id="form">
                    <div class="titles">
                        <h2>Откликнуться на вакансию</h2>
                        <h3>название вакансии тут будет</h3>
                    </div>
                    <input class="hiddenInputs" name="jobTitle" type="text" value='${vacancyInfo.jobTitle}' required>
                    <input class="hiddenInputs" name="employer" type="text" value='${vacancyInfo.employer.replace(/['"«»]/g, ' ')}' required>
                    <input class="FIOInput" name="surnameName" type="text" placeholder="Укажите Ваше ФИО" required>
                    <div class="addFile__wrapper">
                        <label for="resumeFile"><i class="fa-solid fa-arrow-up-from-bracket"></i></label>
                        <div class="addFile__text">Прикрепите файл с Вашим резюме <span style="font-weight: bold">в формате .PDF</span>
                            <div class="uploadFileName">выберите файл</div>
                        </div>
                        <input class="resume" name="resumeFile[]" type="file" id="resumeFile" required/>
                    </div>
                    <button type="submit" id="sendForm">Отправить</button>
                    <div class="noResume">
                        Еще не составил резюме? <span style="font-weight: bold">Записывайся к нам на консультацию</span>
                        <br>
                        и мы поможем тебе круто презентовать себя!
                    </div>
                </form>
            `
            document.querySelector('.main-overlay').append(element);
            document.querySelector('.form').style.left = '50%'

            document.querySelector('#resumeFile').addEventListener('change', () => {
                document.querySelector('.uploadFileName').textContent = document.querySelector('#resumeFile').files[0].name
            })

            $('.form__items').on('submit', function(e){
                e.preventDefault()
                var form = $(this); // Предположу, что этот код выполняется в обработчике события 'submit' формы
                var data = new FormData();  // Для отправки файлов понадобится объект FormData. Подробнее про него можно прочитать в документации - https://developer.mozilla.org/en-US/docs/Web/API/FormData

                // Сбор данных из обычных полей
                form.find(':input[name]').not('[type="file"]').each(function() { 
                    var field = $(this);
                    data.append(field.attr('name'), field.val());
                });

                // Сбор данных о файле (будет немного отличаться для нескольких файлов)
                var filesField = form.find('input[type="file"]');
                var fileName = filesField.attr('name');
                var file = filesField.prop('files')[0];
                data.append(fileName, file) ;

                // Отправка данных
                var url = 'send.php';

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    contentType: false,
                    cache: false, 
                    processData:false, 
                    success: function(response) {
                        console.log(response)
                    }           
                });  
            })          



            // function send(event, php){
            //     console.log("Отправка запроса");
            //     event.preventDefault ? event.preventDefault() : event.returnValue = false;
            //     var req = new XMLHttpRequest();
            //     req.open('POST', php, true);
            //     req.onload = function() {
            //         if (req.status >= 200 && req.status < 400) {
            //             let json = JSON.parse(this.response); // Ебанный internet explorer 11
                        
            //             // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
            //             if (json.result == "success") {
            //                 // Если сообщение отправлено
            //                 alert("Сообщение отправлено");
            //             } else {
            //                 // Если произошла ошибка
            //                 alert("Ошибка. Сообщение не отправлено");
            //             }
            //         // Если не удалось связаться с php файлом
            //         } else {alert("Ошибка сервера. Номер: "+req.status);}}; 
    
            //     // Если не удалось отправить запрос. Стоит блок на хостинге
            //     req.onerror = function() {alert("Ошибка отправки запроса");};
            //     req.send(new FormData(event.target));
            // }
        }

        setListeners() {
            const card = document.querySelector(`.card${this.id}`),
                  overlay = document.querySelector('.main-overlay');
            overlay.addEventListener('click', (e) => {
                if (e.target.id === 'modal__close') {
                    document.querySelector('.main-overlay').style.transform = 'scale(0)';
                    document.body.style.overflow = '';
                    e.target.parentNode.remove()
                }
            });
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('feed')) {
                    this.openModal(e.target.dataset.id)
                    document.querySelector('.main-overlay').style.transform = 'scale(1)'
                    document.body.style.overflow = 'hidden'
                }
            });
        }

        init() {
            this.renderCards();
            this.setListeners();
        }
    }

    getResource('https://api.npoint.io/b2d5cb84803d5d39b240')
        .then(res => {
            res.vacancy.map(({id, category, employer, jobTitle, salary, tags, link, feed}) => {
            new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed).init()})
            vacancyArr = [...res.vacancy]
        });

});
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
            const element = document.createElement('div')
            element.classList.add('card', `card${this.id}`)
            element.style.background = `white`
            element.innerHTML = `
                <div class="card__title">${this.employer}</div>
                <div class="card__employer">${this.jobTitle}</div>
                <div class="card__salary">${this.salary}</div>
                <div class="card__tags">${this.tags.join('<br>')}</div>
                <div class="card__buttons">
                    <button class="moreInfoBtn">Подробнее</button>
                    <button class="feed" data-id=${this.id}>Связаться</button>
                </div>
            `
            document.querySelector(`#${this.category}Cards`).append(element)
        }

        openModal(id) {
            let vacancyInfo = vacancyArr.filter(item => item.id == id)[0]
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
                        <h3>${vacancyInfo.employer.replace(/['"«»]/g, ' ')}, ${vacancyInfo.jobTitle}</h3>
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
                    <button type="submit" id="sendForm">Отправить</button>
                    <div class="noResume">
                        Еще не составил резюме? 
                        <a class="moreInfoBtn" href='https://vk.com/market-216548247_7541645' target="_blank"><span style="font-weight: bold">Записывайся к нам на консультацию</span></a>
                        <br>
                        и мы поможем тебе круто презентовать себя!
                    </div>
                    <div id="loader-identity" class='animate__animated animate__fadeIn'><div id="spinner"><img src="img/loading.png" alt="загрузка..."></div></div>
                </form>
            `
            document.querySelector('.main-overlay').append(element);
            document.querySelector('.form').style.left = '50%'

            const resume = document.querySelector('#resumeFile'),
                  uploadFileName = document.querySelector('.uploadFileName'),
                  invalidFileSizeMessage = document.querySelector('.invalidFileSize'),
                  invalidFileTypeMessage = document.querySelector('.invalidFileType');

            function validateSize(input) {
                const fileSize = input.files[0].size / 1024 / 1024,
                    fileType = input.files[0].type.split('/')[1].toLowerCase();

                if (fileSize > 15 && fileType !== 'pdf') {
                    document.querySelector('#sendForm').disabled = true;
                    invalidFileTypeMessage.style.display = 'block'
                    invalidFileSizeMessage.style.display = 'block'
                } else if (fileSize > 15 && fileType === 'pdf') {
                    document.querySelector('#sendForm').disabled = true;
                    invalidFileTypeMessage.style.display = 'none'
                    invalidFileSizeMessage.style.display = 'block'
                } else if (fileSize <= 15 && fileType !== 'pdf') {
                    document.querySelector('#sendForm').disabled = true;
                    invalidFileSizeMessage.style.display = 'none'
                    invalidFileTypeMessage.style.display = 'block'
                } else {
                    document.querySelector('#sendForm').disabled = false;
                    invalidFileSizeMessage.style.display = 'none'
                    invalidFileTypeMessage.style.display = 'none'
                }
            }

            resume.addEventListener('change', () => {
                uploadFileName.textContent = resume.files[0].name
                console.log(resume.files[0])
                validateSize(resume)
            })

            function showLoaderIdentity() 
            {
                $("#loader-identity").show() 
            }
            
            function hideLoaderIdentity() 
            {
            $("#loader-identity").hide();  
            }

            $('.form__items').on('submit', function(e){
                showLoaderIdentity()
                e.preventDefault()
                var form = $(this);
                var data = new FormData();

                form.find(':input[name]').not('[type="file"]').each(function() { 
                    var field = $(this);
                    data.append(field.attr('name'), field.val());
                })

                var filesField = form.find('input[type="file"]');
                var fileName = filesField.attr('name');
                var file = filesField.prop('files')[0];
                data.append(fileName, file) ;

                var url = 'send.php';

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    contentType: false,
                    cache: false, 
                    processData:false
                }).done(function() {
                    const overlay = document.querySelector('.main-overlay')
                    alert('Резюме успешно отправлено, с Вами свяжуться')
                    overlay.classList.replace('visible', 'hidden')
                    document.body.style.overflow = '';
                    document.querySelector('.form').remove()
                    hideLoaderIdentity()
                }).fail(function() {
                    hideLoaderIdentity()
                    alert('Отправка не удалась, попробуйте еще раз')
                })
            })          
        }

        setListeners() {
            const card = document.querySelector(`.card${this.id}`),
                  overlay = document.querySelector('.main-overlay');
            overlay.addEventListener('click', (e) => {
                if (e.target.id === 'modal__close') {
                    overlay.classList.replace('visible', 'hidden')
                    document.body.style.overflow = '';
                    e.target.parentNode.remove()
                }
            });
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('feed')) {
                    this.openModal(e.target.dataset.id)
                    overlay.classList.replace('hidden', 'visible')
                    document.body.style.overflow = 'hidden'
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

    getResource('./vacancy.json')
        .then(res => {
            res.vacancy.map(({id, category, employer, jobTitle, salary, tags, link, feed}) => {
            new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed).init()})
            vacancyArr = [...res.vacancy]
        })
        .then(() => {
            document.querySelectorAll('.vacancy__cards').forEach(item => {
                if (item.children.length === 0) {
                    const noCards = document.createElement('div');
                    noCards.classList.add('noCards');
                    noCards.innerHTML = `<div class='noCards'>В настоящее время вакансии в данной категории отсутсвуют</div>`
                    item.append(noCards)
                }
            })
        })
        .catch(() => {
            document.querySelectorAll('.vacancy__cards').forEach(item => {
                if (item.children.length === 0) {
                    const noCards = document.createElement('div');
                    noCards.classList.add('noCards');
                    noCards.innerHTML = `<div class='noCards'>В настоящее время вакансии в данной категории отсутсвуют</div>`
                    item.append(noCards)
                }
            })
        });


    // partnership table

    document.querySelector('.partnership__table').querySelectorAll('td').forEach(item => {
        if (item.classList.contains('included')) {
            item.innerHTML = `
            <svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4893 25.0045C12.8283 24.9112 12.3038 24.6483 11.8395 24.177C10.7106 23.0319 9.5623 21.8693 8.45169 20.7451C6.08248 18.3468 3.63271 15.8668 1.23727 13.4183C0.391871 12.5539 0.186341 11.7058 0.550033 10.5808C0.73228 10.0184 0.993474 9.59919 1.34405 9.30022C1.69463 9.00124 2.17099 8.80509 2.7576 8.71339C2.91554 8.68814 3.07515 8.67517 3.23503 8.6746C3.91853 8.6746 4.49283 8.93233 5.04386 9.48524C6.49166 10.9391 7.95847 12.4286 9.37684 13.8692C9.99914 14.5012 10.6216 15.1329 11.2443 15.7645C11.5376 16.061 12.4263 16.9623 13.7909 16.9623C15.1555 16.9623 16.0239 16.0846 16.3499 15.7542L19.5246 12.5363C23.252 8.75788 27.1065 4.85115 30.8959 1.00599C31.6295 0.261814 32.1775 0.116125 32.5733 0.0727168L32.7007 0.0586092L32.8265 0.031479C32.9285 0.010212 33.0323 -0.000334104 33.1364 8.06524e-06C33.4013 8.06524e-06 33.6984 0.0721742 34.0155 0.214336C35.0127 0.659813 35.5163 1.30768 35.6991 2.38041C35.7077 2.42978 35.7171 2.4778 35.7275 2.52447V3.1452C35.6804 3.31477 35.6539 3.45666 35.6359 3.55514C35.4917 4.02286 35.2918 4.38207 35.026 4.65201L34.1726 5.518C28.1065 11.6746 21.8339 18.0415 15.6527 24.288C15.1517 24.7945 14.5582 25.0276 13.7355 25.0392L13.4893 25.0045Z" fill="#003CA5"/>
            </svg>
            `
        } else if(!item.classList.contains('parnershipPrice') && !item.classList.contains('partnerType')) {
            item.innerHTML = `
                <div class="notIncluded"></div>
            `
        }
    })
});
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
            const element = document.createElement('div');
            element.classList.add('form');
            element.innerHTML = `
                <i class="fa-solid fa-square-xmark" id="modal__close"></i>

                <div class="form__img">
                    <img src="./img/formImgGroup.svg" alt="">
                </div>
                <form class="form__items" action="https://formspree.io/f/xknajzoz" method="POST" enctype="multipart/form-data">
                    <div class="titles">
                        <h2>Откликнуться на вакансию</h2>
                        <h3>название вакансии тут будет</h3>
                    </div>
                    <input class="hiddenInputs" name="jobTitle" type="text" value='${vacancyInfo.jobTitle}' required>
                    <input class="hiddenInputs" name="employer" type="text" value='${vacancyInfo.employer}' required>
                    <input class="FIOInput" name="FIO" type="text" placeholder="Укажите Ваше ФИО" required>
                    <div class="addFile__wrapper">
                        <label for="resumeFile"><i class="fa-solid fa-arrow-up-from-bracket"></i></label>
                        <div class="addFile__text">Прикрепите файл с Вашим резюме <span style="font-weight: bold">в формате .PDF</span>
                            <div class="uploadFileName">выберите файл</div>
                        </div>
                        <input class="resume" name="resumeFile" type="file" id="resumeFile" required/>
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

            const myForm = document.querySelector('.form__items');
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
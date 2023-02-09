'use strict';

document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('a[href^="#"').forEach(link => {

        link.addEventListener('click', function(e) {
            e.preventDefault();
    
            let href = this.getAttribute('href').substring(1);
    
            const scrollTarget = document.getElementById(href);
    
            const topOffset = document.querySelector('.scrollto').offsetHeight;
            // const topOffset = 0; // если не нужен отступ сверху 
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
          // удалим у кнопки класс btn-up_hide
          this.el.classList.remove('btn-up_hide');
        },
        hide() {
          // добавим к кнопке класс btn-up_hide
          this.el.classList.add('btn-up_hide');
        },
        addEventListener() {
          // при прокрутке содержимого страницы
          window.addEventListener('scroll', () => {
            // определяем величину прокрутки
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
            scrollY > 400 ? this.show() : this.hide();
          });
          // при нажатии на кнопку .btn-up
          document.querySelector('.btn-up').onclick = () => {
            // переместим в начало страницы
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
            element.classList.add('card');
            element.style.background = `white`;
            element.innerHTML = `
                <div class="card__title">${this.employer}</div>
                <div class="card__employer">${this.jobTitle}</div>
                <div class="card__salary">${this.salary} руб.</div>
                <div class="card__tags">${this.tags.join('<br>')}</div>
                <div class="card__buttons">
                    <button class="moreInfoBtn">Подробнее</button>
                    <button class="feed" data-id=${this.id}>Связаться</button>
                </div>
            `;
            document.querySelector(`#${this.category}Cards`).append(element);
        }

        init() {
            this.renderCards();
        }
    }

    getResource('https://raw.githubusercontent.com/LarisaKuklinova2000/uslu-career/main/vacancy.json')
        .then(res => res.vacancy.map(({id, category, employer, jobTitle, salary, tags, link, feed}) => {
            new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed).init()
        }));

});
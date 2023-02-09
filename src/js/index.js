'use strict';

document.addEventListener('DOMContentLoaded', function () {

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
                <div class="card__tags">
                    <div class="card__tags-item">#Cтудент старших курсов</div>
                    <div class="card__tags-item">#Полная занятость</div>
                    <div class="card__tags-item">#Опыт не требуется</div>
                </div>
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
        .then(res => res.vacancy.map(({id, category, employer, jobTitle, salary, link, feed}) => {
            new EmployerCard(id, category, employer, jobTitle, salary, link, feed).init()
        }));

});
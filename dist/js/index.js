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

        
        closeAllModal() {
            document.querySelectorAll('.modal__wrapper').forEach(item => {
                item.style.left = '-100%';
            });
        }

        renderCards() {
            const element = document.createElement('div');
            element.classList.add('card', 'cat-card');
            element.style.background = `url(${this.img_link}) center center/cover no-repeat`;
            element.innerHTML = `
                <div class="title-content">
                    <h3>${this.name}</h3>
                    <hr/>
                    <div class="intro">хороший котя</div>
                </div>
                <div class="card-info">${this.description}</div>
                <div class="gradient-overlay"></div>
                <div class="color-overlay"></div>
                <i class="fa-solid fa-arrow-up-right-from-square" id="openModal"></i>
                <div class="edit-or-delete">
                    <i class="fa-solid fa-trash fa-trash-card" data-id=${this.id}></i>
                    <i class="fa-solid fa-pen-to-square" data-id=${this.id}></i>
                </div>
            `;
            document.querySelector('.cards__wrapper').append(element);

        }

        renderModal() {
            const element = document.createElement('div');
            element.classList.add('modal__window');
            element.innerHTML = `
                <div class="modal__wrapper">
                    <i class="fa-solid fa-trash fa-trash-modal" data-id=${this.id}></i>
                    <i class="fa-solid fa-pen-to-square" data-id=${this.id}></i>
                    <i class="fa-regular fa-circle-xmark" id="modal__close"></i>
                    <div class="modal__photo">
                        <img class="modalCatImg" src="${this.img_link}" alt="catimg">
                    </div>
                    <div class="modal__info">
                        <h3 class="modal__name">${this.name}</h3>
                        <div class="modal__intro">хороший котя</div>
                        <div class="modal__descr">${this.description}</div>
                        <div class="utility-info">
                            <ul class="utility-list">
                                <li class="raiting">${'<i class="fa-solid fa-star"></i>'.repeat(this.rate) + '<i class="fa-regular fa-star"></i>'.repeat(10-this.rate)}</li>
                                <li class="birth-date">${this.age}</li>
                                <li class="favourite">${this.favor()}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            document.querySelector('.main-overlay').append(element);
            document.querySelectorAll('.modal__wrapper').forEach(item => {
                item.style.left = '-50%';
            });
        }

        setListeners() {

            const cards = document.querySelectorAll('.card'),
                  overlay = document.querySelector('.main-overlay');

            cards.forEach((card, i) => {
                card.addEventListener('click', (e) => {
                    if (e.target.classList.contains('likes')) {
                        e.target.classList.toggle('fa-solid');
                        e.target.classList.toggle('fa-regular');
                    }
                    if (e.target.id == 'openModal') {
                        document.querySelector('.main-overlay').style.visibility = 'visible';
                        document.querySelectorAll('.modal__wrapper')[i].style.left = '50%';
                        document.body.style.overflow = 'hidden';
                    }
                });
            });

            overlay.addEventListener('click', (e) => {
                if (e.target.id == 'modal__close') {
                    document.querySelector('.main-overlay').style.visibility = 'hidden';
                    document.body.style.overflow = '';
                    this.closeAllModal();
                    document.querySelector('.form').style.left = '-50%';
                }
            });

            document.querySelector('#openForm').addEventListener('click', () => {
                document.querySelector('.form').style.left = '50%';
                document.querySelector('.main-overlay').style.visibility = 'visible';
                document.body.style.overflow = 'hidden';
            });

            document.querySelectorAll('.fa-pen-to-square').forEach((item) => {
                item.addEventListener('click', this.rewriteCard);
            });

            document.querySelectorAll('.fa-trash-card').forEach((item, i) => {
                item.addEventListener('click', this.delCard);
                item.addEventListener('click', () => {
                    const arrCards = document.querySelectorAll('.card');
                    arrCards[i].style.display = 'none';
                });
            });

            document.querySelectorAll('.fa-trash-modal').forEach((item, i) => {
                item.addEventListener('click', this.delCard);
                item.addEventListener('click', () => {
                    const arrCards = document.querySelectorAll('.card');
                    arrCards[i].style.display = 'none';
                    this.closeAllModal();
                    document.querySelector('.main-overlay').style.visibility = 'hidden';
                    document.body.style.overflow = '';
                });
            });
        }

        init() {
            this.renderCards();
            this.renderModal();
            this.setListeners();
        }
    }

    getResource('https://sb-cats.herokuapp.com/api/2/LarisaKuklinova2000/show')
        .then(data => {
            data.data.forEach((
                {id,
                name,
                favourite,
                rate,
                age,
                description,
                img_link}
                ) => {
            new CatCard(id,
                name,
                favourite,
                rate,
                age,
                description,
                img_link).init();
        });
    });

});
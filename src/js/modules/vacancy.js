import { getResource } from "../services/requests";
import renderSingleCard from "./card";

const vacancy = () => {

    let consultingArr = [],
        govServeArr = [],
        inhouseArr = [],
        apprentice1Arr = [],
        apprentice2Arr = [];

    getResource('./vacancy.json')
        .then(res => {
            res.vacancy.map(item => {
                if (item.category === 'govServe') {
                    govServeArr.push(item);
                } else if (item.category === 'consulting') {
                    consultingArr.push(item);
                } else if (item.category === 'in-house') {
                    inhouseArr.push(item);
                } else if (item.category === 'apprentice1') {
                    apprentice1Arr.push(item);
                } else if (item.category === 'apprentice2') {
                    apprentice2Arr.push(item);
                }
            });

            consultingArr.map(({id, category, employer, jobTitle, salary, tags, link, feed}) => {
                document.querySelector(`#${category}Cards`).append(renderSingleCard(id, category, employer, jobTitle, salary, tags, link, feed, res.vacancy))
            });
            govServeArr.map(({id, category, employer, jobTitle, salary, tags, link, feed}) => {
                document.querySelector(`#${category}Cards`).append(renderSingleCard(id, category, employer, jobTitle, salary, tags, link, feed, res.vacancy))
            });
            inhouseArr.map(({id, category, employer, jobTitle, salary, tags, link, feed}) => {
                document.querySelector(`#${category}Cards`).append(renderSingleCard(id, category, employer, jobTitle, salary, tags, link, feed, res.vacancy))
            });
            apprentice1Arr.map(({id, category, employer, jobTitle, salary, tags, link, feed}) => {
                document.querySelector(`#${category}Cards`).append(renderSingleCard(id, category, employer, jobTitle, salary, tags, link, feed, res.vacancy))
            });
            apprentice2Arr.map(({id, category, employer, jobTitle, salary, tags, link, feed}) => {
                document.querySelector(`#${category}Cards`).append(renderSingleCard(id, category, employer, jobTitle, salary, tags, link, feed, res.vacancy))
            });

            const salaryNum = (str) => parseInt(str.split('-')[0].replace(/ /g,''))

            const salaryFilterBtns = document.querySelectorAll('.salaryFilter');

            const salarySortArr = (categoryName, arr) => {
                document.querySelector(`#${categoryName}Cards`).innerHTML = '';
                arr.sort((a, b) => salaryNum(b.salary) - salaryNum(a.salary)).map(({id, category, employer, jobTitle, salary, tags, link, feed}) => {
                    document.querySelector(`#${category}Cards`).append(renderSingleCard(id, category, employer, jobTitle, salary, tags, link, feed, res.vacancy))
                });
            }

            salaryFilterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('consulting')) {
                        salarySortArr('consulting', consultingArr);
                    }
                    
                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('in-house')) {
                        salarySortArr('in-house', inhouseArr);
                    }

                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('govServe')) {
                        salarySortArr('govServe', govServeArr);
                    }
                })
            })


        })
        .then(() => {
            document.querySelectorAll('.vacancy__cards').forEach(item => {
                if (item.children.length === 0) {
                    const noCards = document.createElement('div');
                    noCards.classList.add('noCards');
                    noCards.innerHTML = `<div class='noCards'>В настоящее время вакансии в данной категории отсутствуют</div>`
                    item.append(noCards)
                }
            });
        })
        .catch(() => {
            document.querySelectorAll('.vacancy__cards').forEach(item => {
                if (item.children.length === 0) {
                    const noCards = document.createElement('div');
                    noCards.classList.add('noCards');
                    noCards.innerHTML = `<div class='noCards'>Загрузить инормацию об имеющихся вакансиях не удалось, попробуйте перезагрузить страницу</div>`
                    item.append(noCards)
                }
            });
        });
}

export default vacancy;
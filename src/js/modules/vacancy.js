import moment from "moment/moment";
import { getResource } from "../services/requests";
import EmployerCard from "./card";

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

            const salaryNum = (str) => parseInt(str.split('-')[0].replace(/ /g,''))

            consultingArr.map(({id, category, employer, jobTitle, salary, tags, link, feed, date}) => {
                new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed, date, res.vacancy).init()
            });
            govServeArr.map(({id, category, employer, jobTitle, salary, tags, link, feed, date}) => {
                new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed, date, res.vacancy).init()
            });
            inhouseArr.map(({id, category, employer, jobTitle, salary, tags, link, feed, date}) => {
                new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed, date, res.vacancy).init()
            });
            apprentice1Arr.map(({id, category, employer, jobTitle, salary, tags, link, feed, date}) => {
                new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed, date, res.vacancy).init()
            });
            apprentice2Arr.map(({id, category, employer, jobTitle, salary, tags, link, feed, date}) => {
                new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed, date, res.vacancy).init()
            });

            document.querySelectorAll('.vacancy__cards').forEach(item => {
                const filtersElem = document.createElement('div')
                filtersElem.classList.add('filters__wrapper')
                filtersElem.innerHTML = `
                    <div class="filters__item filters__text">Сортировать по:</div>
                    <div class="filters__item filters__button-wrapper"><button class="filter-button salaryFilter">Зарплате</button></div>
                    <div class="filters__item filters__button-wrapper"><button class="filter-button dateFilter">Новизне</button></div>
                    <div class="filters__item filters__button-wrapper"><button class="filter-button employerFilter">Работодателю</button></div>
                `
                if (item.children.length !== 0) {
                    item.closest('.vacancy__wrapper').insertBefore(filtersElem, item)
                }
            })

            const salaryFilterBtns = document.querySelectorAll('.salaryFilter'),
                  dateFilterBtns = document.querySelectorAll('.dateFilter'),
                  employerFilterBtns = document.querySelectorAll('.employerFilter');

            const salarySortArr = (categoryName, arr) => {
                document.querySelector(`#${categoryName}Cards`).innerHTML = '';
                arr.sort((a, b) => salaryNum(b.salary) - salaryNum(a.salary)).map(({id, category, employer, jobTitle, salary, tags, link, feed, date}) => {
                    new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed, date, res.vacancy).init()
                });
            }

            const dateSortArr = (categoryName, arr) => {
                document.querySelector(`#${categoryName}Cards`).innerHTML = '';
                arr.sort((a, b) => moment(b.date) - moment(a.date)).map(({id, category, employer, jobTitle, salary, tags, link, feed, date}) => {
                    new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed, date, res.vacancy).init()
                });
            }

            const employerSortArr = (categoryName, arr) => {
                document.querySelector(`#${categoryName}Cards`).innerHTML = '';
                arr.sort((a, b) => a.employer.localeCompare(b.employer)).map(({id, category, employer, jobTitle, salary, tags, link, feed, date}) => {
                    new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed, date, res.vacancy).init()
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

                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('apprentice1')) {
                        salarySortArr('apprentice1', apprentice1Arr);
                    }

                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('apprentice2')) {
                        salarySortArr('apprentice2', apprentice2Arr);
                    }
                })
            })

            dateFilterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('consulting')) {
                        dateSortArr('consulting', consultingArr);
                    }
                    
                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('in-house')) {
                        dateSortArr('in-house', inhouseArr);
                    }

                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('govServe')) {
                        dateSortArr('govServe', govServeArr);
                    }

                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('apprentice1')) {
                        dateSortArr('apprentice1', apprentice1Arr);
                    }

                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('apprentice2')) {
                        dateSortArr('apprentice2', apprentice2Arr);
                    }
                })
            })

            employerFilterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('consulting')) {
                        employerSortArr('consulting', consultingArr);
                    }
                    
                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('in-house')) {
                        employerSortArr('in-house', inhouseArr);
                    }

                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('govServe')) {
                        employerSortArr('govServe', govServeArr);
                    }

                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('apprentice1')) {
                        employerSortArr('apprentice1', apprentice1Arr);
                    }

                    if (btn.closest('.filters__wrapper').nextElementSibling.id.includes('apprentice2')) {
                        employerSortArr('apprentice2', apprentice2Arr);
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
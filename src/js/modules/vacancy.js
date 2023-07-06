import { getResource } from "../services/requests";
import renderSingleCard from "./card";

const vacancy = () => {

    getResource('./vacancy.json')
        .then(res => {
            res.vacancy.map(({id, category, employer, jobTitle, salary, tags, link, feed}) => {
                renderSingleCard(id, category, employer, jobTitle, salary, tags, link, feed, res.vacancy)
            });
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
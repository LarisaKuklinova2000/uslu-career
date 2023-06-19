import { getResource } from "../services/requests";
import EmployerCard from "./card";

const vacancy = () => {

    let consaitingsItems = [],
        inhouseItems = [],
        govServeItems = [],
        apprentice1 = [],
        apprentice2 = [];

    getResource('./vacancy.json')
        .then(res => {
                res.vacancy.map(item => {
                if (item.category == 'govServe') {
                    govServeItems.push(item);
                } else if (item.category == 'consulting') {
                    consaitingsItems.push(item);
                } else if (item.category == 'in-house') {
                    inhouseItems.push(item);
                } else if (item.category == 'apprentice1') {
                    apprentice1.push(item);
                } else if (item.category == 'apprentice2') {
                    apprentice2.push(item);
                }
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

        return {consaitingsItems,
                inhouseItems,
                govServeItems,
                apprentice1,
                apprentice2}
}

export default vacancy;
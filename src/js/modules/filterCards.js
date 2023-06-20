import vacancy from './vacancy.js';
import EmployerCard from "./card";

const filterCards = () => {
    
    const {consaitingsItems, inhouseItems, govServeItems, apprentice1, apprentice2} = vacancy();

    console.log(consaitingsItems)

    document.querySelectorAll('.vacancy__cards').forEach(cardWrapper => {
        if (cardWrapper.id == 'consultingCards') {
            consaitingsItems.map(item => {
                console.log(item.id)
            })
        }
    })

}

export default filterCards;

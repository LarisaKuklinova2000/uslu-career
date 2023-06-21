import smoothScroll from "./modules/smothScroll";
import partnership from "./modules/partnershipTable";
import vacancy from "./modules/vacancy";
import formForEmployers from "./modules/formForEmployers";
import ppd from "./modules/ppd";
import ppdText from "./modules/ppdText";
import filterCards from "./modules/filterCards";

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    smoothScroll();
    partnership();

    vacancy();

    formForEmployers();
    ppd('.ppd-btn', ppdText);

    filterCards();

});
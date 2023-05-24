import smoothScroll from "./modules/smothScroll";
import partnership from "./modules/partnershipTable";
import vacancy from "./modules/vacancy";
import formForEmployers from "./modules/formForEmployers";
import ppd from "./modules/ppd";

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    smoothScroll();
    partnership();

    vacancy();

    formForEmployers();
    ppd();

});
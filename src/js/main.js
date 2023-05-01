import smoothScroll from "./modules/smothScroll";
import partnership from "./modules/partnershipTable";
import vacancy from "./modules/vacancy";
import formForEmployers from "./modules/formForEmployers";

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    smoothScroll();
    partnership();

    vacancy();

    formForEmployers();

});
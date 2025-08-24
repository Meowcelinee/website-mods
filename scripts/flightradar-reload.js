// ==UserScript==
// @name         Flightradar reload
// @namespace    http://tampermonkey.net/
// @version      2025-07-05
// @description  evade the 30 minute limit by reloading the page after 29 minutes
// @author       Meowcy
// @match        https://www.flightradar24.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=flightradar24.com
// @grant        none
// ==/UserScript==

function logPageLoad() {
    // i fucking hate Date()
    let min = new Date().getMinutes();
    min = min.toString().length > 1 ? min : '0' + min;

    const hour = new Date().getHours();

    setTimeout(() => {
        console.clear();
        console.log(`last page load: ${hour}:${min}`);
    }, 2000);
}

(function () {
    'use strict';

    logPageLoad();

    setTimeout(() => {
        window.location.reload();
    }, 1740000); // 29 mins, converted to ms
})();

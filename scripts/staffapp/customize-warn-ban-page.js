// ==UserScript==
// @name         Customize warn/ban page
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Replaces default reason icons & adds the banner's player head to their notes
// @author       Marceline
// @match        https://staff.queercraft.net/bans/*/
// @match        https://staff.queercraft.net/warnings/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=queercraft.net
// @grant        none
// ==/UserScript==

function getHead(username) {
    const img = document.createElement('img');
    img.src = `https://vzge.me/face/16/${username}?no=ears`;
    img.style = 'width: 16px; height: 16px;';

    const imgSpan = document.createElement('span');
    imgSpan.style = 'float: left; margin: 2px 4px 0px 0px;';
    imgSpan.appendChild(img);

    return imgSpan;
}

(function () {
    'use strict';

    // replace reason icons
    const iconUrls = {
        True: 'https://i.imgur.com/yIlI8TK.png',
        False: 'https://i.imgur.com/A8PSIK3.png',
    };

    Array.from(document.querySelectorAll('span.inplaceedit > img')).forEach(
        icon => {
            icon.src = iconUrls[icon.alt];
        }
    );

    // add staff member heads to notes
    const notes = document.querySelectorAll('div.note');
    Array.from(notes).forEach(note => {
        const username = note.children[1].textContent.split('(')[0].trim();

        const img = getHead(username);

        note.insertBefore(img, note.children[1]);
    });
})();

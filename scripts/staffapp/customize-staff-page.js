// ==UserScript==
// @name         Customize staff page
// @namespace    http://tampermonkey.net/
// @version      2025-08-23
// @description  Add staff player heads and role colors to the staff page on staffapp
// @author       Marceline
// @match        https://staff.queercraft.net/staff/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=queercraft.net
// @grant        none
// ==/UserScript==

const staffRoles = {
    Admin: { className: 'admin-class', count: 0 },
    SrOp: { className: 'srop-class', count: 0 },
    Op: { className: 'op-class', count: 0 },
    Mod: { className: 'mod-class', count: 0 },
};

function getHead(username) {
    const img = document.createElement('img');
    img.src = `https://vzge.me/face/16/${username}?no=ears`;
    img.style = 'width: 16px; height: 16px;';

    const imgSpan = document.createElement('span');
    imgSpan.style = 'margin: 2px 4px 0px 0px;';
    imgSpan.appendChild(img);

    return imgSpan;
}

function staffRoleLi(role, count) {
    const li = document.createElement('li');

    const firstSpan = li.appendChild(document.createElement('span'));
    firstSpan.classList.add(staffRoles[role].className);
    firstSpan.textContent = `${role}: `;

    const secondSpan = li.appendChild(document.createElement('span'));
    secondSpan.textContent = count;
    secondSpan.style.color = '#c0caf5';

    return li;
}

(function () {
    'use strict';

    /*
        add player heads & colorize usernames/roles
    */
    const staffElems = document.querySelectorAll(
        'table.styled > tbody > tr.active'
    );
    Array.from(staffElems).forEach(element => {
        // element containing staff member's username
        const username = element.children[0].children[0];
        // element containing staff member's role
        const role = element.children[1];

        username.classList.add(staffRoles[role.textContent.trim()].className);
        role.classList.add(staffRoles[role.textContent.trim()].className);

        // create element for staff member's head
        const staffHead = getHead(username.textContent.trim());
        element.children[0].insertBefore(staffHead, username);

        staffRoles[role.textContent.trim()].count += 1;
    });

    /*
        add staff count per role below staff table
    */
    const content = document.getElementById('content');

    const countHeader = content.appendChild(document.createElement('h2'));
    countHeader.textContent = 'Current staff count:';
    const roleList = content.appendChild(document.createElement('ul'));
    Object.keys(staffRoles).forEach(role => {
        const roleCount = staffRoleLi(role, staffRoles[role].count);
        roleList.appendChild(roleCount);
    });

    const totalStaff = content.appendChild(document.createElement('strong'));
    const totalStaffCount = Object.keys(staffRoles).reduce((total, role) => {
        return total + staffRoles[role].count;
    }, 0);

    totalStaff.textContent = `Total staff: ${totalStaffCount}`;
})();

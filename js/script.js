/*
* Author: Renan Filho
*/
const apiEndpoint = 'https://global.atdtravel.com/api/';
const productResourceUrl = 'products';

async function makeRequest(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        } else if (response.status === 404) {
            return {};
        } else {
            throw new Error(`Error! HTTP status: ${response.status}`);
        }

    } catch (error) {
        throw new Error(`Failed to make request! Please try again later.`);
    }
}

/**
 * Number of items and where to start from can be found below
 */
function buildAndMakeRequest() {
    // feel free to change and perform a search again
    const limit = 5;
    const offset = 0;
    makeRequest(
        buildProductSearchUrl(getGeo(),
            document.getElementById('title').value,
            5,
            0
        ))
        .then(data => {
            if (JSON.stringify(data) === '{}') {
                clearTableBody();
                document.querySelector('tbody').innerHTML = "NOT FOUND!";
            } else {
                clearTableBody();
                buildTableBody(data.data);
            }
        })
        .catch(error => alert(error));
}

document.getElementById('search').addEventListener('click', function () {
    clearTableBody();
    const tbody = document.querySelector('tbody');
    tbody.insertAdjacentHTML(
        'beforeend',
        `
       <tr>
        <td>Loading</td>
        <td>Loading</td>
        <td>Loading</td>
      </tr>`);
    buildAndMakeRequest();
});

/**
 * Builds the body of a table with objects in an array
 * @param items [item = {
 *     title: "Title",
 *     img_sml: "img url",
 *     dest: "Destination"
 * }]
 */
function buildTableBody(items) {
    const tbody = document.querySelector('tbody');
    for (const item of items) {
        let title = item.title;
        let img = item.img_sml;
        let dest = item.dest;
        tbody.insertAdjacentHTML(
            'beforeend',
            `
       <tr>
        <td><img src="${img}" alt="${title}" width="50"></td>
        <td>${title}</td>
        <td>${dest}</td>
      </tr>`
        )

    }
}


function clearTableBody() {
    document.querySelector('tbody').innerHTML = "";
}

function setGeo(geo) {
    document.cookie = "geo= " + geo + "; SameSite=None; Secure";
}

function getGeo() {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find((cookie) => cookie.trim().startsWith(`geo=`));
    if (cookie) {
        return cookie.split('=')[1];
    }
    // default en
    return 'en';
}

/**
 *
 * @param geo string
 * @param title string
 * @param limit int
 * @param offset int
 * @returns {string}
 */
function buildProductSearchUrl(geo, title, limit = 10, offset = 0) {
    let url = apiEndpoint + productResourceUrl + '?geo=' + geo + '&title=' + title +
        '&limit=' + limit + '&offset=' + offset;

    return url;
}

document.getElementById('geo-en').addEventListener('click', function () {
    setGeo('en');
});
document.getElementById('geo-ie').addEventListener('click', function () {
    setGeo('en-ie');
});
document.getElementById('geo-de').addEventListener('click', function () {
    setGeo('de-de');
});

document.addEventListener("DOMContentLoaded", () => {
    buildAndMakeRequest();
});
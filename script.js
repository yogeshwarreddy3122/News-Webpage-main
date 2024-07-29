const api_key = "15ebc0edb4054aa9aa159d5d77969e8a";
const url = "https://newsapi.org/v2/everything?q=tesla&from=2024-03-12&sortBy=";

window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload()
}
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${api_key}`);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        bindData(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';
    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name}. ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}

let curSelectNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);

    if (curSelectNav) {
        curSelectNav.classList.remove('active');
    }

    curSelectNav = navItem;

    if (curSelectNav) {
        curSelectNav.classList.add('active');
    }
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click", () => {
    const query = searchText.value;

    if (!query) return;

    fetchNews(query);

    if (curSelectNav) {
        curSelectNav.classList.remove('active');
    }

    curSelectNav = null;
});
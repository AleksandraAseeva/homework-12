// Импортируем необходимые модули 
import axios from 'axios';
import { Root } from './types';

const API_Key = '5b70a37855f745e0bdf6aeba82bc0bbf';
const BASE_URL = 'https://newsapi.org/v2';

// выкачивает данные с использованием промиса, возвращает либо интерфейс, либо нал, если не удалось выкачать данные
async function fetchNews(query: string): Promise<Root | null>{
    try {
        // дальше испотзуем апи аксиос чтобы загрузить эти данные
        // используется конструкция приведения типов <Root>, когда мы через аксиос получаем json он автоматически преобразуется в тип Root, который включает в себя тип Артикл
        const response = await axios.get<Root>(`${BASE_URL}/everything`, {
            params: {
                q: query, // строчка которую ищем
                apiKey: API_Key, // наш ключ апи
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        return null;
    }
}

// выкачиваем данные с сервера и в консоли их показываем
async function displayNews(query: string) {
    const newsData = await fetchNews(query);
    console.log('\nQuery:', query);
    console.log(newsData?.articles.length ?? 0, 'articles received\n');
    const limitedArticles = newsData?.articles.slice(0, 5);
    if (limitedArticles) {
        limitedArticles.forEach(article => {
            console.log(`Title: ${article.title}`);
            console.log(`Description: ${article.description}`);
            console.log(`URL: ${article.url}`);
            console.log('..................................');
        });
    } else {
        console.log('No news data available');
    }
}

// displayNews('processor');

async function displayNewsInDOM(query: string) {
    // await чтобы сначала дождаться загрузки данных, а потом их записать в newsData
    const newsData = await fetchNews(query);
    const newsContainer = document.getElementById('news-container');
    if (newsData && newsContainer) {
        // тип переменной articles мы уже прописали в types.ts
        newsData.articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article';
            articleDiv.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank"></a>`;

            newsContainer.appendChild(articleDiv)
        })
    }
}

// displayNewsInDOM('processor');

document.getElementById('queryBtn')?.addEventListener('click', () => {
    const query = (document.getElementById('queryInp') as HTMLInputElement)?.value.trim();
    displayNewsInDOM(query);
})
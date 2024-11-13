// Импортируем необходимые модули
import axios from "axios";
import { Root } from "./types";

const API_Key = "5b70a37855f745e0bdf6aeba82bc0bbf";
const BASE_URL = "https://newsapi.org/v2";

// выкачивает данные с использованием промиса, возвращает либо интерфейс, либо нал, если не удалось выкачать данные
async function fetchNews(query: string): Promise<Root | null> {
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
    console.error("Error fetching news:", error);
    return null;
  }
}

async function displayNewsInDOM(query: string) {
  // await чтобы сначала дождаться загрузки данных, а потом их записать в newsData
  const newsData = await fetchNews(query);
  const newsContainer = document.getElementById("news-container");

  console.log(newsData?.articles.length);
  if (newsData?.articles.length == 0 && newsContainer) {
    const noNewsFound = document.createElement("div");
    noNewsFound.className = "emptiness";
    noNewsFound.innerHTML = `
          <p>По запросу ${query} ничего не найдено</p>`;
    newsContainer.appendChild(noNewsFound);
  }

  if (newsData && newsContainer) {
    // тип переменной articles мы уже прописали в types.ts
    //добавили все статьи на страницу, кроме удаленных
    newsData.articles.forEach((article) => {
      if (article.title != "[Removed]") {
        const articleDiv = document.createElement("div");
        articleDiv.className = "article";
        articleDiv.innerHTML = `
              <h2>${article.title}</h2>
              <p>${article.publishedAt.slice(
                0,
                -10
              )} ${article.publishedAt.slice(11, -4)}</p>
              <p>${article.description || ""} <a href="${
          article.url
        }" target="_blank">Читать еще</a></p>
              `;
        newsContainer.appendChild(articleDiv);
      }
    });

    //добавляем кнопку
    const articleBtn = document.createElement("button");
    articleBtn.id = "button";
    articleBtn.innerText = "Показать еще";
    newsContainer.appendChild(articleBtn);

    const article: HTMLCollectionOf<Element> =
      document.getElementsByClassName("article");
    const btn: HTMLElement | null = document.getElementById("button");
    //скрыть кнопку если новостей меньше 10
    if (article.length < 10) {
      (btn as HTMLElement).style.display = "none";
    }
    //если статей больше 10, скрываем остальные
    for (let i: number = 10; i < article.length; i++) {
      (article[i] as HTMLElement).style.display = "none";
    }

    //если нажали на кнопку показать еще
    let countD: number = 10;
    if (btn) {
      btn.addEventListener("click", function (): void {
        //добавляем еще 10
        countD += 10;
        if (countD <= article.length) {
          for (let i: number = 0; i < countD; i++) {
            (article[i] as HTMLElement).style.display = "block";
          }
        }
      });
    }
  }
}

//клик по кнопке "найти"
document.getElementById("queryBtn")?.addEventListener("click", () => {
  //очищаем контейнер с новостями перед новым запросом
  (document.getElementById("news-container") as HTMLElement).innerHTML = "";
  const query = (
    document.getElementById("queryInp") as HTMLInputElement
  )?.value.trim();
  //проверка, что не отправляется пустой запрос
  if (query) {
    displayNewsInDOM(query);
    (document.getElementById("queryInp") as HTMLInputElement).value = "";
  }
});

//отправка запроса с помощью enter
document.getElementById("queryInp")?.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    (document.getElementById("news-container") as HTMLElement).innerHTML = "";
    e.preventDefault();
    const query = (
      document.getElementById("queryInp") as HTMLInputElement
    )?.value.trim();
    if (query) {
      displayNewsInDOM(query);
      (document.getElementById("queryInp") as HTMLInputElement).value = "";
    }
  }
});

//можно сделать боковую панель и добавить туда все новостные сайты(свернуть большую часть и добавить поиск), при клике на новостной сайт показать популярные новости данного сайта через апи-ссылку, добавляя соурс:новостной-сайт
//правую боковую панель (горячие новости) можно сделать через ссылку: популярное+все, добавить картинки, сделать новости маленькими

//попытка2 сделать панель с категориями

// выкачивает статьи по категории
async function fetchCategories(categoryV: string): Promise<Root | null> {
  try {
    // дальше используем апи аксиос чтобы загрузить эти данные
    // используется конструкция приведения типов <Root>, когда мы через аксиос получаем json он автоматически преобразуется в тип Root, который включает в себя тип Артикл
    const response = await axios.get<Root>(
      `${BASE_URL}/top-headlines`,
      {
        params: {
          category: categoryV, // строчка которую ищем
          apiKey: API_Key, // наш ключ апи
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}
 // показываем новости по категории
//  async function displayNewsByCategories(category: string): Promise<void> {
//   // взяли все источники категории
//   const newsData = await fetchCategories(category);
//   // выводим массив источников в консоль
//   // console.log(newsData?.sources);

//   const newsContainer = document.getElementById("news-container");

//   // console.log(newsData?.articles.length);
//   // if (newsData?.articles.length == 0 && newsContainer) {
//   //   const noNewsFound = document.createElement("div");
//   //   noNewsFound.className = "emptiness";
//   //   noNewsFound.innerHTML = `
//   //         <p>По запросу ${query} ничего не найдено</p>`;
//   //   newsContainer.appendChild(noNewsFound);
//   // }

//   if (newsData && newsContainer) {
//     // тип переменной articles мы уже прописали в types.ts
//     //добавили все статьи на страницу, кроме удаленных
//     newsData.articles.forEach((article) => {
//       if (article.title != "[Removed]") {
//         const articleDiv = document.createElement("div");
//         articleDiv.className = "article";
//         articleDiv.innerHTML = `
//               <h2>${article.title}</h2>
//               <p>${article.publishedAt.slice(
//                 0,
//                 -10
//               )} ${article.publishedAt.slice(11, -4)}</p>
//               <p>${article.description || ""} <a href="${
//           article.url
//         }" target="_blank">Читать еще</a></p>
//               `;
//         newsContainer.appendChild(articleDiv);
//       }
//     });

//     //добавляем кнопку
//     const articleBtn = document.createElement("button");
//     articleBtn.id = "button";
//     articleBtn.innerText = "Показать еще";
//     newsContainer.appendChild(articleBtn);

//     const article: HTMLCollectionOf<Element> =
//       document.getElementsByClassName("article");
//     const btn: HTMLElement | null = document.getElementById("button");
//     //скрыть кнопку если новостей меньше 10
//     if (article.length < 10) {
//       (btn as HTMLElement).style.display = "none";
//     }
//     //если статей больше 10, скрываем остальные
//     for (let i: number = 10; i < article.length; i++) {
//       (article[i] as HTMLElement).style.display = "none";
//     }

//     //если нажали на кнопку показать еще
//     let countD: number = 10;
//     if (btn) {
//       btn.addEventListener("click", function (): void {
//         //добавляем еще 10
//         countD += 10;
//         if (countD <= article.length) {
//           for (let i: number = 0; i < countD; i++) {
//             (article[i] as HTMLElement).style.display = "block";
//           }
//         }
//       });
//     }
//   }
 
// }
//событие клика по категории (по тегу li)
document.querySelector("ul")?.addEventListener("click", (ev: MouseEvent) => {
  const li = (ev.target as HTMLElement).closest("li");
  if (li) {
    //взяли значение
    const categoryValue = li.getAttribute("value") || "";
    // console.log(categoryValue)
    //вызываем функцию показа новостей по категориям
    (document.getElementById("news-container") as HTMLElement).innerHTML = "";
    displayNewsInDOM(categoryValue);
  }
});


//последняя задача: сделать справа блок с горячими новостями
// Для категорий

// Импортируем необходимые модули
import axios from "axios";
import { Root } from "./types";

const API_Key = "5b70a37855f745e0bdf6aeba82bc0bbf";
const BASE_URL = "https://newsapi.org/v2";


// выкачивает источники статей по категории
async function fetchCategories(category: string): Promise<Root | null> {
    try {
      // дальше испотзуем апи аксиос чтобы загрузить эти данные
      // используется конструкция приведения типов <Root>, когда мы через аксиос получаем json он автоматически преобразуется в тип Root, который включает в себя тип Артикл
      const response = await axios.get<Root>(
        `${BASE_URL}/top-headlines/sources?`,
        {
          params: {
            category: category, // строчка которую ищем
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
  
  // выкачиваем новости конкретного источника
  async function fetchNewsByCategories(sourceId: string): Promise<Root | null> {
    try {
      const response = await axios.get<Root>(`${BASE_URL}/top-headlines?`, {
        params: {
          sources: sourceId,
          apiKey: API_Key, // наш ключ апи
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching news:", error);
      return null;
    }
  }
  
  // показываем новости для всех источников?
  async function displayNewsByCategories(category: string): Promise<void> {
    // взяли все источники категории
    const newsData = await fetchCategories(category);
    // выводим массив источников в консоль
    console.log(newsData?.sources);
  
    if (newsData) {
      // разобрали каждый источник
      newsData?.sources.forEach((source) => {
        if (source.id) {
          // нашли все новости для конкретного источника
          const newsData = fetchNewsByCategories(source.id)
          const newsContainer = document.getElementById("news-container");
  
          //попытка реализовать то же самое, что и в поиске новостей по запросу, newsData не содержит articles
          // if (newsData && newsContainer) {
          //   newsData?.articles.forEach((article) => {
          //     if (article.title != "[Removed]") {
          //       const articleDiv = document.createElement("div");
          //       articleDiv.className = "article";
          //       articleDiv.innerHTML = `
          //       <h2>${article.title}</h2>
          //       <p>${article.publishedAt.slice(
          //         0,
          //         -10
          //       )} ${article.publishedAt.slice(11, -4)}</p>
          //       <p>${article.description || ""} <a href="${
          //         article.url
          //       }" target="_blank">Читать еще</a></p>
          //       `;
          //       newsContainer.appendChild(articleDiv);
          //     }
          //   });
  
          //   //добавляем кнопку
          //   const articleBtn = document.createElement("button");
          //   articleBtn.id = "button";
          //   articleBtn.innerText = "Показать еще";
          //   newsContainer.appendChild(articleBtn);
  
          //   const article: HTMLCollectionOf<Element> =
          //     document.getElementsByClassName("article");
          //   const btn: HTMLElement | null = document.getElementById("button");
          //   //скрыть кнопку если новостей меньше 10
          //   if (article.length < 10) {
          //     (btn as HTMLElement).style.display = "none";
          //   }
          //   //если статей больше 10, скрываем остальные
          //   for (let i: number = 10; i < article.length; i++) {
          //     (article[i] as HTMLElement).style.display = "none";
          //   }
  
          //   //если нажали на кнопку показать еще
          //   let countD: number = 10;
          //   if (btn) {
          //     btn.addEventListener("click", function (): void {
          //       //добавляем еще 10
          //       countD += 10;
          //       if (countD <= article.length) {
          //         for (let i: number = 0; i < countD; i++) {
          //           (article[i] as HTMLElement).style.display = "block";
          //         }
          //       }
          //     });
          //   }
          // }
        }
      });
    }
  }
  
  //событие клика по категории (по тегу li)
  document.querySelector("ul")?.addEventListener("click", (ev: MouseEvent) => {
    const li = (ev.target as HTMLElement).closest("li");
    if (li) {
      //взяли значение
      const categoryValue = li.getAttribute("value") || "";
      // console.log(categoryValue)
      //вызываем функцию показа новостей по категориям
      displayNewsByCategories(categoryValue);
    }
  });
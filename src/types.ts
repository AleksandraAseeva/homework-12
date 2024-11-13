// Ответ который приходит с сайта
export interface Root {
    status: string;
    totalResults: number;
    articles: Article[];
  }
  
// основной интерфейс
  export interface Article {
    source: {
        id: string | null
        name: string
      }
    author: string | null
    title: string
    category: string | null
    description: string | null
    url: string
    urlToImage: string | null
    publishedAt: string
    content: string | null
  }

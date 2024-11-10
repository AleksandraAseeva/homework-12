// Ответ который приходит с сайта
export interface Root {
    status: string;
    totalResults: number;
    articles: Article[];
    sources: Source[];
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
  
  export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
  }

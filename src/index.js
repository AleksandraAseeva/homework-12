"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
// Импортируем необходимые модули
var axios_1 = require("axios");
var API_Key = "5b70a37855f745e0bdf6aeba82bc0bbf";
var BASE_URL = "https://newsapi.org/v2";
// выкачивает данные с использованием промиса, возвращает либо интерфейс, либо нал, если не удалось выкачать данные
function fetchNews(query) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("".concat(BASE_URL, "/everything"), {
                            params: {
                                q: query, // строчка которую ищем
                                apiKey: API_Key, // наш ключ апи
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching news:", error_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function displayNewsInDOM(query) {
    return __awaiter(this, void 0, void 0, function () {
        var newsData, newsContainer, noNewsFound, articleBtn, article_1, btn_1, i, countD_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchNews(query)];
                case 1:
                    newsData = _a.sent();
                    newsContainer = document.getElementById("news-container");
                    if ((newsData === null || newsData === void 0 ? void 0 : newsData.articles.length) == 0 && newsContainer) {
                        noNewsFound = document.createElement("div");
                        noNewsFound.className = "emptiness";
                        noNewsFound.innerHTML = "\n          <p>\u041F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \u00AB".concat(query, "\u00BB \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</p>");
                        newsContainer.appendChild(noNewsFound);
                    }
                    if (newsData && newsContainer) {
                        //добавили все статьи на страницу, кроме удаленных
                        newsData.articles.forEach(function (article) {
                            if (article.title != "[Removed]") {
                                var articleDiv = document.createElement("div");
                                articleDiv.className = "article";
                                articleDiv.innerHTML = "\n              <h2>".concat(article.title, "</h2>\n              <p>").concat(article.publishedAt.slice(0, -10), " ").concat(article.publishedAt.slice(11, -4), "</p>\n              <p>").concat(article.description || "", " <a href=\"").concat(article.url, "\" target=\"_blank\">\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u0435\u0435</a></p>\n              ");
                                newsContainer.appendChild(articleDiv);
                            }
                        });
                        articleBtn = document.createElement("button");
                        articleBtn.id = "button";
                        articleBtn.innerText = "Показать ещё";
                        newsContainer.appendChild(articleBtn);
                        article_1 = document.getElementsByClassName("article");
                        btn_1 = document.getElementById("button");
                        //скрыть кнопку если новостей меньше 10
                        if (article_1.length < 10) {
                            btn_1.style.display = "none";
                        }
                        //если статей больше 10, скрываем остальные
                        for (i = 10; i < article_1.length; i++) {
                            article_1[i].style.display = "none";
                        }
                        countD_1 = 10;
                        if (btn_1) {
                            btn_1.addEventListener("click", function () {
                                //добавляем еще 10
                                countD_1 += 10;
                                if (countD_1 <= article_1.length) {
                                    for (var i = 0; i < countD_1; i++) {
                                        article_1[i].style.display = "block";
                                        btn_1.style.display = "none";
                                    }
                                }
                                else { //если статьи еще есть, но их меньше 10
                                    for (var i = 10; i < article_1.length; i++) {
                                        article_1[i].style.display = "block";
                                        btn_1.style.display = "none";
                                    }
                                }
                            });
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//клик по кнопке "найти"
(_a = document.getElementById("queryBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var _a;
    //очищаем контейнер с новостями перед новым запросом
    document.getElementById("news-container").innerHTML = "";
    var query = (_a = document.getElementById("queryInp")) === null || _a === void 0 ? void 0 : _a.value.trim();
    //проверка, что не отправляется пустой запрос
    if (query) {
        displayNewsInDOM(query);
        document.getElementById("queryInp").value = "";
    }
});
//отправка запроса с помощью enter
(_b = document.getElementById("queryInp")) === null || _b === void 0 ? void 0 : _b.addEventListener("keydown", function (e) {
    var _a;
    if (e.key === "Enter") {
        document.getElementById("news-container").innerHTML = "";
        e.preventDefault();
        var query = (_a = document.getElementById("queryInp")) === null || _a === void 0 ? void 0 : _a.value.trim();
        if (query) {
            displayNewsInDOM(query);
            document.getElementById("queryInp").value = "";
        }
    }
});
//панель с категориями
function fetchCategories(categoryV) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("".concat(BASE_URL, "/top-headlines"), {
                            params: {
                                category: categoryV,
                                apiKey: API_Key,
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error fetching news:", error_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// показываем новости по категории
function displayNewsByCategories(category) {
    return __awaiter(this, void 0, void 0, function () {
        var newsData, newsContainer, articleBtn, article_2, btn_2, i, countD_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchCategories(category)];
                case 1:
                    newsData = _a.sent();
                    newsContainer = document.getElementById("news-container");
                    if (newsData && newsContainer) {
                        newsData.articles.forEach(function (article) {
                            if (article.title != "[Removed]") {
                                var articleDiv = document.createElement("div");
                                articleDiv.className = "article";
                                articleDiv.innerHTML = "\n              <h2>".concat(article.title, "</h2>\n              <p>").concat(article.publishedAt.slice(0, -10), " ").concat(article.publishedAt.slice(11, -4), "</p>\n              <p>").concat(article.description || "", " <a href=\"").concat(article.url, "\" target=\"_blank\">\u0427\u0438\u0442\u0430\u0442\u044C \u0435\u0449\u0435</a></p>\n              ");
                                newsContainer.appendChild(articleDiv);
                            }
                        });
                        articleBtn = document.createElement("button");
                        articleBtn.id = "button";
                        articleBtn.innerText = "Показать еще";
                        newsContainer.appendChild(articleBtn);
                        article_2 = document.getElementsByClassName("article");
                        btn_2 = document.getElementById("button");
                        console.log(article_2.length);
                        //скрыть кнопку если новостей меньше 10
                        if (article_2.length < 10) {
                            btn_2.style.display = "none";
                        }
                        //если статей больше 10, скрываем остальные
                        for (i = 10; i < article_2.length; i++) {
                            article_2[i].style.display = "none";
                        }
                        countD_2 = 10;
                        if (btn_2) {
                            btn_2.addEventListener("click", function () {
                                //добавляем еще 10
                                countD_2 += 10;
                                if (countD_2 <= article_2.length) {
                                    for (var i = 0; i < countD_2; i++) {
                                        article_2[i].style.display = "block";
                                        btn_2.style.display = "none";
                                    }
                                }
                                else { //если статьи еще есть, но их меньше 10
                                    for (var i = 10; i < article_2.length; i++) {
                                        article_2[i].style.display = "block";
                                        btn_2.style.display = "none";
                                    }
                                }
                            });
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//событие клика по категории (по тегу li)
(_c = document.querySelector("ul")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function (ev) {
    var li = ev.target.closest("li");
    if (li) {
        //взяли значение
        var categoryValue = li.getAttribute("value") || "";
        //вызываем функцию показа новостей по категориям
        document.getElementById("news-container").innerHTML = "";
        displayNewsByCategories(categoryValue);
    }
});

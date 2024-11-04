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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// Импортируем необходимые модули 
var axios_1 = require("axios");
var API_Key = '5b70a37855f745e0bdf6aeba82bc0bbf';
var BASE_URL = 'https://newsapi.org/v2';
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
                    console.error('Error fetching news:', error_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// выкачиваем данные с сервера и в консоли их показываем
function displayNews(query) {
    return __awaiter(this, void 0, void 0, function () {
        var newsData, limitedArticles;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetchNews(query)];
                case 1:
                    newsData = _b.sent();
                    console.log('\nQuery:', query);
                    console.log((_a = newsData === null || newsData === void 0 ? void 0 : newsData.articles.length) !== null && _a !== void 0 ? _a : 0, 'articles received\n');
                    limitedArticles = newsData === null || newsData === void 0 ? void 0 : newsData.articles.slice(0, 5);
                    if (limitedArticles) {
                        limitedArticles.forEach(function (article) {
                            console.log("Title: ".concat(article.title));
                            console.log("Description: ".concat(article.description));
                            console.log("URL: ".concat(article.url));
                            console.log('..................................');
                        });
                    }
                    else {
                        console.log('No news data available');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// displayNews('processor');
function displayNewsInDOM(query) {
    return __awaiter(this, void 0, void 0, function () {
        var newsData, newsContainer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchNews(query)];
                case 1:
                    newsData = _a.sent();
                    newsContainer = document.getElementById('news-container');
                    if (newsData && newsContainer) {
                        // тип переменной articles мы уже прописали в types.ts
                        newsData.articles.forEach(function (article) {
                            var articleDiv = document.createElement('div');
                            articleDiv.className = 'article';
                            articleDiv.innerHTML = "\n            <h2>".concat(article.title, "</h2>\n            <p>").concat(article.description || '', "</p>\n            <a href=\"").concat(article.url, "\" target=\"_blank\"></a>");
                            newsContainer.appendChild(articleDiv);
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// displayNewsInDOM('processor');
(_a = document.getElementById('queryBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var _a;
    var query = (_a = document.getElementById('queryInp')) === null || _a === void 0 ? void 0 : _a.value.trim();
    displayNewsInDOM(query);
});

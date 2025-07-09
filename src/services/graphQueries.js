"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAaveMarketData = fetchAaveMarketData;
exports.fetchCompoundMarketData = fetchCompoundMarketData;
var _a = require("graphql-request"), request = _a.request, gql = _a.gql;
require("dotenv").config();
// SUBGRAPH ENDPOINT
var AAVE_SUBGRAPH_URL = "https://gateway.thegraph.com/api/".concat(process.env.GRAPH_API_KEY, "/subgraphs/id/JCNWRypm7FYwV8fx5HhzZPSFaMxgkPuw4TnR3Gpi81zk");
var COMPOUND_SUBGRAPH_URL = "https://gateway.thegraph.com/api/".concat(process.env.GRAPH_API_KEY, "/subgraphs/id/AwoxEZbiWLvv6e3QdvdMZw4WDURdGbvPfHmZRc8Dpfz9");
var messariMarketQuery = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query Markets($symbol: String!) {\n    markets(where: { inputToken_: { symbol: $symbol } }) {\n      id\n      inputToken {\n        symbol\n      }\n      totalDepositBalanceUSD\n      totalBorrowBalanceUSD\n      rates(where: { side: LENDER }) {\n        rate\n      }\n    }\n  }\n"], ["\n  query Markets($symbol: String!) {\n    markets(where: { inputToken_: { symbol: $symbol } }) {\n      id\n      inputToken {\n        symbol\n      }\n      totalDepositBalanceUSD\n      totalBorrowBalanceUSD\n      rates(where: { side: LENDER }) {\n        rate\n      }\n    }\n  }\n"])));
function fetchAaveMarketData(symbol) {
    return __awaiter(this, void 0, void 0, function () {
        var response, market, lendingRate, utilization, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request(AAVE_SUBGRAPH_URL, messariMarketQuery, { symbol: symbol })];
                case 1:
                    response = _d.sent();
                    market = (_a = response.markets) === null || _a === void 0 ? void 0 : _a[0];
                    if (!market)
                        return [2 /*return*/, null];
                    lendingRate = parseFloat(((_c = (_b = market.rates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.rate) || "0");
                    utilization = parseFloat(market.totalBorrowBalanceUSD) / parseFloat(market.totalDepositBalanceUSD);
                    return [2 /*return*/, {
                            id: market.id,
                            symbol: market.inputToken.symbol,
                            lendingRate: lendingRate,
                            utilization: utilization,
                        }];
                case 2:
                    error_1 = _d.sent();
                    console.error("Error querying AAVE subgraph:", error_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function fetchCompoundMarketData(symbol) {
    return __awaiter(this, void 0, void 0, function () {
        var response, market, lendingRate, utilization, error_2;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, request(COMPOUND_SUBGRAPH_URL, messariMarketQuery, { symbol: symbol })];
                case 1:
                    response = _d.sent();
                    market = (_a = response.markets) === null || _a === void 0 ? void 0 : _a[0];
                    if (!market)
                        return [2 /*return*/, null];
                    lendingRate = parseFloat(((_c = (_b = market.rates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.rate) || "0");
                    utilization = parseFloat(market.totalBorrowBalanceUSD) / parseFloat(market.totalDepositBalanceUSD);
                    return [2 /*return*/, {
                            id: market.id,
                            symbol: market.inputToken.symbol,
                            lendingRate: lendingRate,
                            utilization: utilization,
                        }];
                case 2:
                    error_2 = _d.sent();
                    console.error("Error querying Compound subgraph:", error_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var templateObject_1;

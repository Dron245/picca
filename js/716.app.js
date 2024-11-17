"use strict";

(self["webpackChunkfls_start"] = self["webpackChunkfls_start"] || []).push([ [ 716 ], {
    7716: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
            default: () => __WEBPACK_DEFAULT_EXPORT__
        });
        var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4848);
        var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6540);
        var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7767);
        var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4976);
        var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1083);
        var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1468);
        var _redux_cart_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9196);
        var _components_PizzaBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9087);
        var _redux_cart_selectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4636);
        var __assign = void 0 && (void 0).__assign || function() {
            __assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
            return __assign.apply(this, arguments);
        };
        var __awaiter = void 0 && (void 0).__awaiter || function(thisArg, _arguments, P, generator) {
            function adopt(value) {
                return value instanceof P ? value : new P((function(resolve) {
                    resolve(value);
                }));
            }
            return new (P || (P = Promise))((function(resolve, reject) {
                function fulfilled(value) {
                    try {
                        step(generator.next(value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function rejected(value) {
                    try {
                        step(generator["throw"](value));
                    } catch (e) {
                        reject(e);
                    }
                }
                function step(result) {
                    result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
                }
                step((generator = generator.apply(thisArg, _arguments || [])).next());
            }));
        };
        var __generator = void 0 && (void 0).__generator || function(thisArg, body) {
            var f, y, t, _ = {
                label: 0,
                sent: function() {
                    if (t[0] & 1) throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            }, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
            return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
                return this;
            }), g;
            function verb(n) {
                return function(v) {
                    return step([ n, v ]);
                };
            }
            function step(op) {
                if (f) throw new TypeError("Generator is already executing.");
                while (g && (g = 0, op[0] && (_ = 0)), _) try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
                    0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    if (y = 0, t) op = [ op[0] & 2, t.value ];
                    switch (op[0]) {
                      case 0:
                      case 1:
                        t = op;
                        break;

                      case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false
                        };

                      case 5:
                        _.label++;
                        y = op[1];
                        op = [ 0 ];
                        continue;

                      case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;

                      default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [ 6, e ];
                    y = 0;
                } finally {
                    f = t = 0;
                }
                if (op[0] & 5) throw op[1];
                return {
                    value: op[0] ? op[1] : void 0,
                    done: true
                };
            }
        };
        var FullPizza = function() {
            var navigate = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Zp)();
            var dispatch = (0, react_redux__WEBPACK_IMPORTED_MODULE_5__.wA)();
            var idPizza = (0, react_router_dom__WEBPACK_IMPORTED_MODULE_4__.g)().idPizza;
            var _a = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)({
                id: "",
                title: "",
                imageUrl: "",
                price: [],
                types: [],
                sizes: [],
                count: 0,
                countPizzaBlock: 0,
                cartId: 555
            }), pizza = _a[0], setPizza = _a[1];
            var items = (0, react_redux__WEBPACK_IMPORTED_MODULE_5__.d4)(_redux_cart_selectors__WEBPACK_IMPORTED_MODULE_6__.aJ).items;
            var _b = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(0), sizeindex = _b[0], setSizeindex = _b[1];
            var _c = pizza.types.length === 1 && pizza.types[0] === 1 ? (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(1) : (0, 
            react__WEBPACK_IMPORTED_MODULE_1__.useState)(0), typeIndex = _c[0], setTypeIndex = _c[1];
            var pizzaR = (0, react_redux__WEBPACK_IMPORTED_MODULE_5__.d4)((0, _redux_cart_selectors__WEBPACK_IMPORTED_MODULE_6__.r5)(idPizza));
            var findItem = items.find((function(obj) {
                return obj.title === pizza.title && obj.types === _components_PizzaBlock__WEBPACK_IMPORTED_MODULE_3__.D[typeIndex] && obj.sizes === pizza.sizes[sizeindex];
            }));
            var count = findItem ? findItem.count : 0;
            var countPizzaBlock = pizzaR ? pizzaR.countPizzaBlock : 0;
            console.log(pizza);
            try {
                (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((function() {
                    var fethdata = function() {
                        return __awaiter(void 0, void 0, void 0, (function() {
                            var data;
                            return __generator(this, (function(_a) {
                                switch (_a.label) {
                                  case 0:
                                    return [ 4, axios__WEBPACK_IMPORTED_MODULE_7__.A.get("https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas/" + "".concat(idPizza)) ];

                                  case 1:
                                    data = _a.sent().data;
                                    setPizza(data);
                                    return [ 2 ];
                                }
                            }));
                        }));
                    };
                    fethdata();
                }), []);
            } catch (error) {
                alert("ошибка в получении пицц");
                console.log(error);
                navigate("/");
            }
            var addPizza = function() {
                var pizzaCorrect = __assign(__assign({}, pizza), {
                    price: pizza.price[sizeindex],
                    types: _components_PizzaBlock__WEBPACK_IMPORTED_MODULE_3__.D[typeIndex],
                    sizes: pizza.sizes[sizeindex]
                });
                dispatch((0, _redux_cart_slice__WEBPACK_IMPORTED_MODULE_2__.B5)(pizzaCorrect));
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "container fullpizza",
                children: pizza ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                        className: "fullpizza__img",
                        src: pizza.imageUrl
                    }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "fullpizza__content",
                        children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "pizza-block__title",
                            children: pizza.title
                        }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "pizza-block__price",
                            children: [ pizza.price[sizeindex], " рублей" ]
                        }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "pizza-block__selector",
                            children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
                                children: pizza.types.map((function(type) {
                                    return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                        onClick: function() {
                                            return setTypeIndex(type);
                                        },
                                        className: typeIndex === type ? "active" : "",
                                        children: _components_PizzaBlock__WEBPACK_IMPORTED_MODULE_3__.D[type]
                                    }, type);
                                }))
                            }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
                                children: pizza.sizes.map((function(size, index) {
                                    return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                        onClick: function() {
                                            return setSizeindex(index);
                                        },
                                        className: sizeindex === index ? "active" : "",
                                        children: [ size, " см." ]
                                    }, index);
                                }))
                            }) ]
                        }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            style: {
                                marginRight: "20px"
                            },
                            onClick: addPizza,
                            className: "button button--outline button--add",
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: "купить"
                            })
                        }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.N_, {
                            to: "/",
                            className: "button button--outline button--add go-back-btn",
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: "Вернуться назад"
                            })
                        }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "pizza-block__info",
                            children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "pizza-block__title",
                                children: [ "Всего куплено пицц ", pizza.title, ": ", countPizzaBlock ]
                            }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "pizza-block__price",
                                children: [ 'Куплено пицц "', pizza.title, '" тесто: ', _components_PizzaBlock__WEBPACK_IMPORTED_MODULE_3__.D[typeIndex], ' размер "', pizza.sizes[sizeindex], ' см" : ', count, " шт." ]
                            }) ]
                        }) ]
                    }) ]
                }) : "Загрузка..."
            });
        };
        const __WEBPACK_DEFAULT_EXPORT__ = FullPizza;
    }
} ]);
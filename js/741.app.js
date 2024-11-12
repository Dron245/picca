"use strict";

(self["webpackChunkfls_start"] = self["webpackChunkfls_start"] || []).push([ [ 741 ], {
    6741: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
            default: () => __WEBPACK_DEFAULT_EXPORT__
        });
        var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4848);
        var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4976);
        var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1468);
        var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7652);
        var _redux_cart_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4636);
        var _redux_cart_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9196);
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
        var Cart = function() {
            var items = (0, react_redux__WEBPACK_IMPORTED_MODULE_3__.d4)(_redux_cart_selectors__WEBPACK_IMPORTED_MODULE_4__.aJ).items;
            var totalPrice = items.reduce((function(sum, item) {
                return sum + item.price * item.count;
            }), 0);
            var totalCount = items.reduce((function(sum, item) {
                return sum + item.count;
            }), 0);
            var dispatch = (0, react_redux__WEBPACK_IMPORTED_MODULE_3__.wA)();
            function clearCart() {
                dispatch((0, _redux_cart_slice__WEBPACK_IMPORTED_MODULE_2__.N2)());
            }
            if (totalCount === 0) return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.Ah, {});
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "container container--cart",
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "cart",
                    children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "cart__top",
                        children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                            className: "content__title",
                            children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                width: "18",
                                height: "18",
                                viewBox: "0 0 18 18",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z",
                                    stroke: "white",
                                    strokeWidth: "1.8",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z",
                                    stroke: "white",
                                    strokeWidth: "1.8",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669",
                                    stroke: "white",
                                    strokeWidth: "1.8",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }) ]
                            }), "Корзина" ]
                        }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            onClick: clearCart,
                            className: "cart__clear",
                            children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 20 20",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M2.5 5H4.16667H17.5",
                                    stroke: "#B6B6B6",
                                    strokeWidth: "1.2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z",
                                    stroke: "#B6B6B6",
                                    strokeWidth: "1.2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M8.33337 9.16667V14.1667",
                                    stroke: "#B6B6B6",
                                    strokeWidth: "1.2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    d: "M11.6666 9.16667V14.1667",
                                    stroke: "#B6B6B6",
                                    strokeWidth: "1.2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round"
                                }) ]
                            }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                children: "Очистить корзину"
                            }) ]
                        }) ]
                    }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "content__items",
                        children: items.map((function(item) {
                            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components__WEBPACK_IMPORTED_MODULE_1__.m6, __assign({}, item), item.cartId);
                        }))
                    }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "cart__bottom",
                        children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "cart__bottom-details",
                            children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [ " ", "Всего пицц: ", (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("b", {
                                    children: [ totalCount, " шт." ]
                                }), " " ]
                            }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                children: [ " ", "Сумма заказа: ", (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("b", {
                                    children: [ totalPrice, " ₽" ]
                                }), " " ]
                            }) ]
                        }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "cart__bottom-buttons",
                            children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.N_, {
                                to: "/",
                                className: "button button--outline button--add go-back-btn",
                                children: [ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                    width: "8",
                                    height: "14",
                                    viewBox: "0 0 8 14",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                        d: "M7 13L1 6.93015L6.86175 1",
                                        stroke: "#D3D3D3",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    })
                                }), "Вернуться назад" ]
                            }), (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "button pay-btn",
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    children: "Оплатить сейчас"
                                })
                            }) ]
                        }) ]
                    }) ]
                })
            });
        };
        const __WEBPACK_DEFAULT_EXPORT__ = Cart;
    }
} ]);
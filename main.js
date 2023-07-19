/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/validCards.js
function validCards(value) {
  if (/(^4)\d{16}/.test(value)) {
    return ".visa";
  } else if (/(^5[1-5])\d{16}/.test(value)) {
    return ".master";
  } else if (/(^3[47])\d{16}/.test(value)) {
    return ".amex";
  } else if (/^(?:2131|1800|35\d{3})\d{11}/.test(value)) {
    return ".jcb";
  } else if (/(^2||6)\d{16}/.test(value)) {
    return ".mir";
  } else if (/^6(?:011|5)/.test(value)) {
    return ".discover";
  }
  return null;
}
;// CONCATENATED MODULE: ./src/js/WidgetStartPage.js
class WidgetStartPage {
  constructor(container) {
    this.container = container;
  }
  drawUI() {
    console.log("отрисовка запуск");
    this.container.innerHTML = WidgetStartPage.markup;
  }
  static get markup() {
    return `<h1 class="title">Validate Credit Card Numbers</h1>
    <div class="wrapper">
        <div class="wrapper-check-card">
            <h2>Check your credit card number</h2>
            <div class="container">
                <ul class="cards">
                    <li class="card visa" title="Visa"></li>
                    <li class="card master" title="Mastercard"></li>
                    <li class="card amex" title="American Express"></li>
                    <li class="card mir" title="Mir"></li>
                    <li class="card discover" title="Discover"></li>
                    <li class="card jcb" title="Jcb"></li>
                </ul>
            </div>
            <div class="filter-container">
                <form class="filter-widget-form">
                    <input class="form-control" id="card_number" type="number" placeholder="Credit card number"
                        title="" required>
                    <button class="btn" type="submit">Click to Validate</button>
                </form>
            </div>

        </div>
    </div>
</div>

<div id="result"></div>`;
  }
}
;// CONCATENATED MODULE: ./src/js/app.js



const page = new WidgetStartPage(document.querySelector(".validator"));
page.drawUI();
if (typeof document !== "undefined") {
  const input = document.querySelector(".form-control");
  input.addEventListener("input", () => {
    const type = validCards(input.value);
    if (type) {
      document.querySelector(type).style.opacity = 1;
    }
  });
  input.parentNode.addEventListener("submit", e => {
    e.preventDefault();
    const result = document.getElementById("result");
    result.textContent = "";
    validCards(input.value) ? result.textContent = "Действующая карта" : result.textContent = "Введён некорректный номер карты!";
  });
}
;// CONCATENATED MODULE: ./src/index.js




/******/ })()
;
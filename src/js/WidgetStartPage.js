export default class WidgetStartPage {
  constructor(container) {
    this.container = container;
  }


  drawUI() {
    console.log("отрисовка запуск")
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

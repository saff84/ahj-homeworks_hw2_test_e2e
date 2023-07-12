
import validCards from "./validCards";
import validate from "./validCards";
import WidgetStartPage from "./WidgetStartPage";

const page = new WidgetStartPage(document.querySelector(".validator"))
page.drawUI()

if (typeof document !== "undefined") {
  const input = document.querySelector(".form-control");

  input.addEventListener("input", () => {
    const type = validCards(input.value);

    if (type) {
      document.querySelector(type).style.opacity = 1;
    }
  });

  input.parentNode.addEventListener("submit", (e) => {
    e.preventDefault();
    const result = document.getElementById("result");
    result.textContent = "";
    validate(input.value)
      ? (result.textContent = "Действующая карта")
      : (result.textContent = "Введён некорректный номер карты!");
  });
}

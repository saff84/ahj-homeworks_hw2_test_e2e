export default function validate(value) {
    if (value.length < 13) return false;
    let sum = 0;
    for (let i = 0; i < value.length; i++) {
      let cardNumber = parseInt(value[i], 10);
  
      if ((value.length - i) % 2 === 0) {
        cardNumber *= 2;
        if (cardNumber > 9) {
          cardNumber -= 9;
        }
      }
  
      sum += cardNumber;
    }
  
    return sum !== 0 && sum % 10 === 0;
  }
export default function validCards(value) {
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

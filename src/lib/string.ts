function getSuffixedAsteroidString(number: number) {
  let ending;
  if (number === 1) {
    ending = "";
  } else if (number >= 2 && number <= 4) {
    ending = "а";
  } else {
    ending = "ов";
  }
  return `${number} астероид${ending}`;
}

export { getSuffixedAsteroidString }
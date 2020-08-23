//generates basic random keys to insert when using array.map
export const keyGenerator = () => {
  const num = Math.floor(Math.random() * 1000000).toString();
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const firstLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  const secondLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  const key = num.split("");
  key.splice(Math.floor(Math.random() * num.length), 0, firstLetter);
  key.splice(Math.floor(Math.random() * num.length), 0, secondLetter);
  return key.join("");
};

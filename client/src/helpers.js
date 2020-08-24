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
  const combined = num.split("");
  combined.splice(Math.floor(Math.random() * num.length), 0, firstLetter);
  combined.splice(Math.floor(Math.random() * num.length), 0, secondLetter);
  const key = combined.join("");
  return key;
};

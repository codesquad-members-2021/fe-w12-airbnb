export function changeNullToBlank(array) {
  const inputArray = [...array];
  for (let i = 0; i < 35; i++) {
    if (!inputArray[i]) inputArray[i] = ``;
  }
  return inputArray;
}

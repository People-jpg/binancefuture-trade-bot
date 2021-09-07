module.exports.convertTextToJson = function(_text) {
  const arrayFromText = _text.split("\n");

  if (!arrayFromText[0].includes(' - BUY ')) {
    return
  }

  const takeProfit = [];
  for (let i = 5; i < arrayFromText.length - 1; i++) {
    takeProfit.push(arrayFromText[i].split(" ")[1].replace('$', ''))
  }

  const jsonData = {
    symbol: arrayFromText[0].split(" ")[3].replace('/', ''),
    entry: arrayFromText[2].split(" ")[1].replace('$', ''),
    stopLoss: arrayFromText[3].split(" ")[1].replace('$', ''),
    takeProfit,
  };
  return jsonData;
}

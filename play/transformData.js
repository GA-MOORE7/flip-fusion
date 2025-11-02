// Convert MongoDB-like object to pairs array
function convertToPairs(dataObj) {
  if (!dataObj || !dataObj.items) return [];
  return dataObj.items.map(item => ({
    id: item._id,
    picture: item.imageUrl,
    word: item.word
  }));
}

export { convertToPairs };
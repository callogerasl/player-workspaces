export function getItemForKey(list, key) {
  var result = null;
  list.forEach(item => {
    if (item.key === key) result = item;
  });
  return result;
}

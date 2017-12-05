export function isStart(action) {
  return action.sequence.type === "start";
}

export function isSuccess(action) {
  return action.sequence.type === "next" && !action.payload.messageError;
}

export function getItemForKey(list, key) {
  var result = null;
  list.forEach(item => {
    if (item.key === key) result = item;
  });
  return result;
}

 

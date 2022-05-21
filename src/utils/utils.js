exports.getFilter = (query) => {
  return (
    query &&
    Object.keys(query).reduce((a, b) => {
      const operator = b.substring(b.lastIndexOf("_"), b.length);
      const field = b.substring(0, b.lastIndexOf("_"));
      const bb = b === "id" ? "_id" : b;
      const fieldB = field === "id" ? "_id" : field;
      const value =
        operator === "_ne"
          ? { [fieldB]: { $ne: query[b] } }
          : operator === "_gt"
          ? { [fieldB]: { $gt: query[b] } }
          : operator === "_gte"
          ? { [fieldB]: { $gte: query[b] } }
          : operator === "_lt"
          ? { [fieldB]: { $lt: query[b] } }
          : operator === "_lte"
          ? { [fieldB]: { $lte: query[b] } }
          : { [bb]: query[b] };

      return { ...a, ...value };
    }, {})
  );
};

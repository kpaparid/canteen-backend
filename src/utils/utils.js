exports.getFilter = (query) => {
  return (
    query &&
    Object.keys(query).reduce((a, b) => {
      const operator = b.substring(b.lastIndexOf("_"), b.length);
      const field = b.substring(0, b.lastIndexOf("_"));
      const value =
        operator === "_ne"
          ? { [field]: { $ne: query[b] } }
          : operator === "_gt"
          ? { [field]: { $gt: query[b] } }
          : operator === "_gte"
          ? { [field]: { $gte: query[b] } }
          : operator === "_lt"
          ? { [field]: { $lt: query[b] } }
          : operator === "_lte"
          ? { [field]: { $lte: query[b] } }
          : { [b]: query[b] };

      return { ...a, ...value };
    }, {})
  );
};

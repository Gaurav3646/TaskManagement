const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      console.log("hello");
      await fn(req, res, next);
      console.log("hello");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

module.exports = asyncWrapper;

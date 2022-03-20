export const auth = (req, res, next) => {
  console.log("Auth is running");
  next();
};

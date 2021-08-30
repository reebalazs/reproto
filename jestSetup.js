process.on("unhandledRejection", (err) => {
  global.fail(err);
});

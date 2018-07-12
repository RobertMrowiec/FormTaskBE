require('./app')('mongodb://localhost/eventApp').then(app => {
  console.log("Server is running on port: 8030");
  app.listen(process.env.PORT || 8030);
});

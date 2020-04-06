const { app } = require('./../bin/www/index');

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Application running on http://localhost:${port}`);
});

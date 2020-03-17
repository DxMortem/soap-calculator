const app = require('./app');
const config = require('./common/configuration');

const port = config.get('app.port');

app.listen(port, () => {
  console.log('Server running at port:', port);
});

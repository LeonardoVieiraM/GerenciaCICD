const app = require('./src/app');
const Logger = require('./src/utils/logger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  Logger.info(`Server running on port ${PORT}`);
  Logger.info(`Health check: http://localhost:${PORT}/health`);
  Logger.info(`API available: http://localhost:${PORT}/api/users`);
});
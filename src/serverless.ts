import serverless from 'serverless-http';
import app from './routes';

module.exports.handler = serverless(app);

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { router } from './routes';
import { notFoundHandler } from './middleware/notFoundHandler';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(requestLogger);

app.use('/api/v1', router);

app.use(notFoundHandler);
app.use(errorHandler);

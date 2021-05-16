import cors from 'cors';
import express from 'express';
import OpenAPIBackend, { Request } from 'openapi-backend';

// Create api with your definition file or object. This points to the openapi yaml spec
const api = new OpenAPIBackend({ definition: '../openapi.yaml' });

// Register your framework specific request handlers here
api.register({
  notFound: (c, req, res) => res.status(404).json({ err: 'not found' }),
  notImplemented: (c, req, res) => {
    const { status, mock } = c.api.mockResponseForOperation(c.operation.operationId ?? '');
    return res.status(status).json(mock);
  },
});

api.register('GetPosts', function (c, req, res) {
  return res.status(200).json([
    {
      id: 1,
      userId: 1,
      title: 'a',
      body: 'a',
    },
    {
      id: 2,
      userId: 2,
      title: 'b',
      body: 'b',
    },
  ]);
});

// Initialize the backend
api.init();

// Initialize the express server that will serve the api backend
const port = 9000;
const app = express();
app.use(express.json());
// Allow cors on all origins
app.use(cors());
app.use((req, res) => api.handleRequest(req as Request, req, res));
app.listen(port, () => console.info(`api listening at http://localhost:${port}`));

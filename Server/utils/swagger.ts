import swaggerJsdoc from 'swagger-jsdoc';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Food Delivery API',
      version: '1.0.0',
      description: 'API documentation for the Food Delivery application.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8000}/api/v1`,
      },
    ],
  },
  // Use a robust, absolute path to find the route files
  apis: [path.join(process.cwd(), 'routes', '*.ts')],
};

const swaggerSpec = swaggerJsdoc(options);
const router = Router();
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default router;

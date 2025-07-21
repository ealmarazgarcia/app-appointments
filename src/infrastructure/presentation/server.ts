import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../../../api/docs/swagger.json';
import { AppointmentController } from './AppointmentController';
import { appointmentService } from '../../config/dependency-injection';

const app = express();
app.use(express.json());

const controller = new AppointmentController(appointmentService);

app.post('/appointments', (req, res) => controller.register(req, res));
app.get('/appointments/:insuredId', (req, res) => controller.getInsuredId(req, res));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

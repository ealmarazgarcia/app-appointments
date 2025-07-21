import { SQSEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateAppointmentStatusDto } from '../dtos/UpdateAppointmentStatusDto';
import { appointmentService } from '../../../config/dependency-injection';

export const handler = async (event: SQSEvent): Promise<void> => {
  console.log('ingreso: handler SQS');
  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body);
      console.log(JSON.stringify(body));
      await appointmentService.updateAppointmentStatus(body.insuredId, body.scheduleId, body.status);
      console.log(`Status actualizado para insuredId: ${body.insuredId}, scheduleId: ${body.scheduleId}`);
    } catch (err) {
      console.error('Error procesando mensaje SQS:', err);
    }
  }
}; 
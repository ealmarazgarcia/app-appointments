import { DynamoAppointmentRepository } from '../infrastructure/database/DynamoAppointmentRepository';
import { RegisterAppointmentUseCase } from '../application/use-cases/RegisterAppointmentUseCase';
import { GetAppointmentsByInsuredIdUseCase } from '../application/use-cases/GetAppointmentsByInsuredIdUseCase';
import { UpdateAppointmentStatusUseCase } from '../application/use-cases/UpdateAppointmentStatusUseCase';
import { AppointmentSnsPublisher } from '../application/use-cases/AppointmentSnsPublisher';
import { AppointmentServiceImpl } from '../application/services/AppointmentServiceImpl';

const appointmentRepository = new DynamoAppointmentRepository();
const appointmentSnsPublisher = new AppointmentSnsPublisher(process.env.SNS_TOPIC_ARN!);

const registerAppointmentUseCase = new RegisterAppointmentUseCase(appointmentRepository, appointmentSnsPublisher);
const getAppointmentsByInsuredIdUseCase = new GetAppointmentsByInsuredIdUseCase(appointmentRepository);
const updateAppointmentStatusUseCase = new UpdateAppointmentStatusUseCase(appointmentRepository);

export const appointmentService = new AppointmentServiceImpl(
  registerAppointmentUseCase,
  getAppointmentsByInsuredIdUseCase,
  updateAppointmentStatusUseCase
); 
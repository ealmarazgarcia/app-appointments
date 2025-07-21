import { Appointment } from '../../domain/entities/Appointment';
import { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';
import { AppointmentSnsPublisher } from './AppointmentSnsPublisher';

export class RegisterAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private appointmentSnsPublisher: AppointmentSnsPublisher
  ) {}

  async execute(appointment: Appointment): Promise<Appointment> {
    appointment.status = 'pending';
    const saved = await this.appointmentRepository.save(appointment);
    await this.appointmentSnsPublisher.publishAppointmentCreated(saved);
    return saved;
  }
} 
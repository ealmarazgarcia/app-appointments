import { Appointment } from '../../domain/entities/Appointment';
import { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';

export class UpdateAppointmentStatusUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(insuredId: string, scheduleId: number, status: Appointment['status']): Promise<Appointment> {
    console.log('use-case:' + insuredId + '*' + scheduleId + '*' + status);
    return this.appointmentRepository.updateStatus(insuredId, scheduleId, status);
  }
} 
import { Appointment } from '../entities/Appointment';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<Appointment>;
  findByInsuredId(insuredId: string): Promise<Appointment[]>;
  updateStatus(insuredId: string, scheduleId: number, status: Appointment['status']): Promise<Appointment>;
} 
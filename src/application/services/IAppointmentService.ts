import { Appointment } from '../../domain/entities/Appointment';

export interface IAppointmentService {
  registerAppointment(appointment: Appointment): Promise<Appointment>;
  listAppointmentsByInsuredId(insuredId: string): Promise<Appointment[]>;
  updateAppointmentStatus(insuredId: string, scheduleId: number, status: Appointment['status']): Promise<Appointment>;
} 
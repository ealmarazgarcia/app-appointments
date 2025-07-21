import { IAppointmentService } from './IAppointmentService';
import { RegisterAppointmentUseCase } from '../use-cases/RegisterAppointmentUseCase';
import { GetAppointmentsByInsuredIdUseCase } from '../use-cases/GetAppointmentsByInsuredIdUseCase';
import { UpdateAppointmentStatusUseCase } from '../use-cases/UpdateAppointmentStatusUseCase';
import { Appointment } from '../../domain/entities/Appointment';

export class AppointmentServiceImpl implements IAppointmentService {
  constructor(
    private registerAppointmentUseCase: RegisterAppointmentUseCase,
    private getAppointmentsByInsuredIdUseCase: GetAppointmentsByInsuredIdUseCase,
    private updateAppointmentStatusUseCase: UpdateAppointmentStatusUseCase
  ) {}

  async registerAppointment(appointment: Appointment) {
    return this.registerAppointmentUseCase.execute(appointment);
  }

  async listAppointmentsByInsuredId(insuredId: string) {
    return this.getAppointmentsByInsuredIdUseCase.execute(insuredId);
  }

  async updateAppointmentStatus(insuredId: string, scheduleId: number, status: Appointment['status']) {
    console.log('servicio:' + insuredId + '*' + scheduleId + '*' + status);
    return this.updateAppointmentStatusUseCase.execute(insuredId, scheduleId, status);
  }
} 
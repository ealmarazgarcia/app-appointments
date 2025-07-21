import 'reflect-metadata';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAppointmentDto } from './dtos/CreateAppointmentDto';
import { UpdateAppointmentStatusDto } from './dtos/UpdateAppointmentStatusDto';
import { IAppointmentService } from '../../application/services/IAppointmentService';
import { Appointment } from '../../domain/entities/Appointment';
import { SQSEvent } from 'aws-lambda';

export class AppointmentController {
  constructor(private appointmentService: IAppointmentService) {}

  async register(req: Request, res: Response) {
    const dto = plainToInstance(CreateAppointmentDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const appointment = new Appointment(dto.insuredId, dto.scheduleId, dto.countryISO, 'pending');
    const result = await this.appointmentService.registerAppointment(appointment);
    return res.status(201).json({
      status: 'processing',
      message: 'El agendamiento está en proceso.',
      data: result,
      timestamp: new Date().toISOString()
    });
  }

  async getInsuredId(req: Request, res: Response) {
    const { insuredId } = req.params;
    if (!insuredId || !/^\d{5}$/.test(insuredId)) {
      return res.status(400).json({ error: 'insuredId debe ser un string de 5 dígitos' });
    }
    const result = await this.appointmentService.listAppointmentsByInsuredId(insuredId);
    return res.status(200).json(result);
  }
} 
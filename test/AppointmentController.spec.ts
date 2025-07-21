import { AppointmentController } from '../src/infrastructure/presentation/AppointmentController';
import { Request, Response } from 'express';

const mockRegister = jest.fn();
const mockGet = jest.fn();
const mockUpdateStatus = jest.fn();
const controller = new AppointmentController({
  registerAppointment: mockRegister,
  listAppointmentsByInsuredId: mockGet,
  updateAppointmentStatus: mockUpdateStatus
} as any);

describe('AppointmentController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;
    jest.clearAllMocks();
  });

  it('debe validar y registrar una cita', async () => {
    req.body = { insuredId: '00125', scheduleId: 1, countryISO: 'PE' };
    const appointment = { ...req.body, status: 'pending' };
    const expected = {
      status: 'processing',
      message: 'El agendamiento está en proceso.',
      data: appointment,
      timestamp: expect.any(String)
    };
    mockRegister.mockResolvedValue(appointment);
    await controller.register(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expected);
  });

  it('debe rechazar insuredId inválido', async () => {
    req.params = { insuredId: '12' };
    await controller.getInsuredId(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('debe devolver citas por insuredId válido', async () => {
    req.params = { insuredId: '12345' };
    const expected = [{ insuredId: '12345', scheduleId: 1, countryISO: 'PE', status: 'pending' }];
    mockGet.mockResolvedValue(expected);
    await controller.getInsuredId(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
}); 
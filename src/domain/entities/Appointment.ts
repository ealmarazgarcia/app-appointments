export type CountryISO = 'PE' | 'CL';

export type AppointmentStatus = 'pending' | 'completed' | 'cancelled';

export class Appointment {
  constructor(
    public insuredId: string,
    public scheduleId: number,
    public countryISO: CountryISO,
    public status: AppointmentStatus = 'pending'
  ) {}
} 
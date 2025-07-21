import { IsString, IsNumber, IsIn } from 'class-validator';

export class UpdateAppointmentStatusDto {
  @IsString()
  insuredId!: string;

  @IsNumber()
  scheduleId!: number;

  @IsIn(['pending', 'completed', 'cancelled'])
  status!: 'pending' | 'completed' | 'cancelled';
} 
import { IsString, Length, Matches, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  @IsString()
  @Length(5, 5, { message: 'insuredId debe tener exactamente 5 dígitos' })
  @Matches(/^\d{5}$/, { message: 'insuredId debe ser numérico de 5 dígitos' })
  insuredId!: string;

  @IsNumber()
  @Type(() => Number)
  scheduleId!: number;

  @IsString()
  @IsIn(['PE', 'CL'], { message: 'countryISO solo puede ser PE o CL' })
  countryISO!: 'PE' | 'CL';
} 
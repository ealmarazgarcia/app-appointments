import { Appointment, CountryISO } from '../../domain/entities/Appointment';
import { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';
import { DynamoDB } from 'aws-sdk';

const TABLE_NAME = process.env.APPOINTMENTS_TABLE || 'Appointments';

export class DynamoAppointmentRepository implements AppointmentRepository {
  private docClient: DynamoDB.DocumentClient;

  constructor() {
    this.docClient = new DynamoDB.DocumentClient();
  }

  async save(appointment: Appointment): Promise<Appointment> {
    await this.docClient.put({
      TableName: TABLE_NAME,
      Item: {
        insuredId: appointment.insuredId,
        scheduleId: appointment.scheduleId,
        countryISO: appointment.countryISO,
        status: appointment.status,
      },
    }).promise();
    return appointment;
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    const result = await this.docClient.query({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'insuredId = :insuredId',
      ExpressionAttributeValues: {
        ':insuredId': insuredId,
      },
    }).promise();
    return (result.Items || []).map(
      (item: any) => new Appointment(item.insuredId, item.scheduleId, item.countryISO as CountryISO, item.status as 'pending' | 'completed' | 'cancelled')
    );
  }

  async updateStatus(insuredId: string, scheduleId: number, status: Appointment['status']): Promise<Appointment> {
    console.log('repositorio:' + insuredId + '*' + scheduleId + '*' + status);
    const result = await this.docClient.update({
      TableName: TABLE_NAME,
      Key: {
        insuredId: insuredId,
        scheduleId: scheduleId,
      },
      UpdateExpression: 'SET #status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': status,
      },
      ReturnValues: 'ALL_NEW',
    }).promise();

    const updatedItem = result.Attributes as any;
    return new Appointment(
      updatedItem.insuredId,
      updatedItem.scheduleId,
      updatedItem.countryISO as CountryISO,
      updatedItem.status as 'pending' | 'completed' | 'cancelled'
    );
  }
} 
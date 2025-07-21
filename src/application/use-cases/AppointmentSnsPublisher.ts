import { SNS } from 'aws-sdk';
import { Appointment } from '../../domain/entities/Appointment';

export class AppointmentSnsPublisher {
  private sns: SNS;
  private topicArn: string;

  constructor(topicArn: string) {
    this.sns = new SNS();
    this.topicArn = topicArn;
  }

  async publishAppointmentCreated(appointment: Appointment): Promise<void> {
    const message = JSON.stringify({
      event: 'AppointmentCreated',
      data: appointment
    });
    await this.sns.publish({
      TopicArn: this.topicArn,
      Message: message,
      MessageAttributes: {
        countryISO: {
          DataType: 'String',
          StringValue: appointment.countryISO
        }
      }
    }).promise();
  }
} 
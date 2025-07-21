# Appointments API

## Descripción
Este proyecto implementa una API para la gestión de citas (appointments) en AWS, utilizando Node.js, Express, Serverless Framework y AWS Lambda. Permite registrar citas, consultar citas por asegurado y actualizar el status de una cita mediante mensajes SQS. Además, publica eventos en SNS al registrar una cita.

## Arquitectura
- **Express** para exponer endpoints HTTP.
- **AWS Lambda** para ejecución serverless.
- **DynamoDB** como base de datos para almacenar citas.
- **SNS** para publicar eventos al registrar una cita.
- **SQS** para procesar la actualización de status de citas de forma asíncrona.
- **Serverless Framework** para despliegue y desarrollo local.

## Endpoints HTTP
- `POST /appointments`: Registrar una nueva cita.
- `GET /appointments/{insuredId}`: Obtener citas por ID de asegurado.
- `GET /api/docs`: Documentación Swagger UI.

> **Nota:** La actualización de status de una cita **no** se realiza por HTTP, sino mediante mensajes enviados a una cola SQS.

## Actualización de status vía SQS
Para actualizar el status de una cita, envía un mensaje a la cola SQS configurada con el siguiente formato:

```json
{
  "insuredId": "12345",
  "scheduleId": 1,
  "status": "completed" // Valores posibles: 'pending', 'completed', 'cancelled'
}
```

El handler `src/infrastructure/presentation/sqs/processAppointmentFromSqs.ts` procesa estos mensajes y actualiza el status en DynamoDB.

## Evento SNS al registrar cita
Al registrar una cita, se publica automáticamente un mensaje en un SNS Topic con el siguiente formato:

```json
{
  "event": "AppointmentCreated",
  "data": {
    "insuredId": "00125",
    "scheduleId": 1,
    "countryISO": "PE",
    "status": "pending"
  }
}
```

## Modelo de datos
- **Appointment**
  - `insuredId`: string (5 dígitos)
  - `scheduleId`: number
  - `countryISO`: 'PE' | 'CL'
  - `status`: 'pending' | 'completed' | 'cancelled'

## Despliegue y ejecución local

### Requisitos
- Node.js >= 18
- AWS CLI configurado
- Serverless Framework (`npm install -g serverless`)

### Instalación
```sh
npm install
```

### Ejecución local
```sh
npx serverless offline
```
Accede a [http://localhost:3000/api/docs](http://localhost:3000/api/docs) para ver la documentación Swagger.

### Despliegue en AWS
```sh
npx serverless deploy
```

### Variables de entorno necesarias
- `APPOINTMENTS_TABLE`: Nombre de la tabla DynamoDB (por defecto: Appointments)
- `SNS_TOPIC_ARN`: ARN del topic SNS para eventos de cita

### Configuración de SQS
Asegúrate de tener una cola SQS y su ARN configurado en el `serverless.yml`.

## Documentación Swagger
La documentación interactiva está disponible en `/api/docs`.

## Estructura principal del proyecto
- `src/domain/entities/Appointment.ts`: Entidad principal de cita
- `src/infrastructure/database/DynamoAppointmentRepository.ts`: Persistencia en DynamoDB
- `src/application/use-cases/`: Casos de uso (registro, consulta, actualización)
- `src/application/services/AppointmentServiceImpl.ts`: Servicio principal
- `src/infrastructure/presentation/server.ts`: Configuración de Express
- `src/infrastructure/presentation/sqs/processAppointmentFromSqs.ts`: Handler de SQS para actualización de status
- `src/application/use-cases/AppointmentSnsPublisher.ts`: Publicación en SNS


#### Iniciar la aplicación
El servicio tiene implementado sagger la cual facilita las pruebas del API.
El servicio TransactionService, se ejcuta en el puerto 8880, el mismo que podremo ingresar al sagger con la sigueinte ruta luego de haber iniciado la aplicación: http://localhost:8880/swagger-ui/index.html

![sagger1](images//ini1.png)
![sagger1](images//ini2.png)
![sagger1](images//ini3.png)


## Pruebas
El proyecto incluye pruebas unitarias para los casos de uso y la integración con SNS y SQS.
![trx](images//p1.png)
![fraud](images//p2.png)
---
Autor: Eduardo Almaraz García

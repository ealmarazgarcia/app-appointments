import serverlessExpress from '@vendia/serverless-express';
import app from './infrastructure/presentation/server';

export const handler = serverlessExpress({ app }); 
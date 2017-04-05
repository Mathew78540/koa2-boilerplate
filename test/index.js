import supertest from 'supertest-as-promised';
import app from '../src/api/index';

// Export App
export const request = supertest.agent(app.listen());

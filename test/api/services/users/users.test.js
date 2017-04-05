import { request } from '../../../index';
import test from 'ava';

// GET : /users
test('GET /users : Success', async (t) => {
  const { status } = await request.get('/users');

  t.is(status, 200);
});

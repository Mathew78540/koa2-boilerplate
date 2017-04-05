import User from '../../models/user';
import { encode } from '../../helpers/jsonWebToken';

/**
 * User Controller
 */
class UserCtrl {
  /**
   * GET /users/
   */
  async list(ctx) {
    const { query } = ctx;

    ctx.body = await User.paginate({}, query);
  }

  /**
   * GET /users/:id
   */
  async get(ctx) {
    ctx.body = ctx.state.user;
  }

  /**
   * POST /users
   */
  async post(ctx) {
    ctx.body = { token: encode({ name: 'Seekube V2' }) };
  }

  /**
   * PUT /users/:id
   */
  async put(ctx) {
    ctx.body = { message: 'Hello users' };
  }

  /**
   * DEL /users/:id
   */
  async del(ctx) {
    ctx.body = { message: 'Hello users' };
  }

  /**
   * PATCH /users/:id
   */
  async patch(ctx) {
    ctx.body = { message: 'Hello users' };
  }
}

export default new UserCtrl;

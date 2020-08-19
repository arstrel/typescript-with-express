import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session?.isLoggedIn) {
    next();
    return;
  } else {
    res.status(403);
    res.send(` 
      <div>
        Not permited
      </div>
      <div>
        <a href='/'>Back to home page</a>
      </div>`);
    return;
  }
}

@controller('')
export class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session?.isLoggedIn) {
      res.send(`
          <div>
            You are logged in and can go to 
            <a href='/protected'>Protected area</a>
          </div>
          <div>
            <a href='/auth/logout'>Logout</a>
          </div>
      `);
    } else {
      res.send(`
          <div>
            You are not logged in
          </div>
          <div>
            <a href='/auth/login'>Login</a>
          </div>
      `);
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send(`
          <div>
            Welcome to protected route, Mr.Guz
          </div>
          <div>
            <a href='/'>Back to home page</a>
          </div>
      `);
  }
}

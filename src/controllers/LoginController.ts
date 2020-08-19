import { Request, Response, NextFunction } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log(req.method, ' request to ', req.originalUrl);
  next();
}

@controller('/auth')
export class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
    if (email && password && email === 'guz@cool.com' && password === 'cool') {
      req.session = { isLoggedIn: true };
      res.redirect('/');
    } else {
      res.send(`
        <div>
        Invalid email or password
        </div>
        <div>
          <a href="/">Back to home page</a> 
        </div>
      `);
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = null;
    res.redirect('/');
  }
}

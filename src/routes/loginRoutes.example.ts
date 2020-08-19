// File not used. It's just an example of the same flow with the minimal use of typeScript
import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

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

const router = Router();
router.get('/', (req: Request, res: Response) => {
  if (req.session?.isLoggedIn) {
    res.send(`
        <div>
          You are logged in and can go to 
          <a href='/protected'>Protected area</a>
        </div>
        <div>
          <a href='/logout'>Logout</a>
        </div>
    `);
  } else {
    res.send(`
        <div>
          You are not logged in
        </div>
        <div>
          <a href='/login'>Login</a>
        </div>
    `);
  }
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`
        <div>
          Welcome to protected route, Mr.Guz
        </div>
        <div>
          <a href='/'>Back to home page</a>
        </div>
    `);
});

router.get('/login', (req: Request, res: Response) => {
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
});

router.post('/login', (req: RequestWithBody, res: Response) => {
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
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = null;
  res.redirect('/');
});

export { router };

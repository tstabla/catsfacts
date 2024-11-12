import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

interface User {
  username: string;
  password: string;
} 

export function validateLogin(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ 
      status: 'error',
      message: 'Missing username or password'
    });
  }

  try {
    const usersPath = path.join('server', 'users.json');
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

    const user = users.find((u: User) => 
      u.username === username && u.password === password
    );

    if (user) {
      res.json({ 
        status: 'success',
        message: 'Login successful'
      });
    } else {
      res.status(401).json({ 
        status: 'error',
        message: 'Invalid username or password'
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Server error'
    });
  }
} 


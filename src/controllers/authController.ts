import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { authService } from '../services/authService'

export class AuthController {
  // Register user
  async registerUser(req: Request, res: Response) {
    // 1. Check for validation errors (assuming express-validator middleware is used)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const msgError = errors.array()[0].msg
      return res.status(400).json({ message: msgError })
    }

    // 2.Extract the request body
    const { username, email, password } = req.body

    try {
      // 3. Call the service to register the user
      const user = await authService.registerUser({ username, email, password })

      // 4. Return success response
      return res.status(201).json({
        message: 'User registered successfully.',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          image: user.profileImage,
        },
      })
    } catch (error: any) {
      // 5. Handle errors and send appropriate responses
      return res.status(500).json({ error: error.message })
    }
  }

  async verifyEmail(req: Request, res: Response) {
    const { token } = req.query;
    try {
      const success = await authService.verifyEmail(token as string);
      if (success) {
        res.status(200).json({ message: 'Email verified successfully!' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export const authController = new AuthController()

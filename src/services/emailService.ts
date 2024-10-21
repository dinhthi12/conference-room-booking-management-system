import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export class EmailService {
  private transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
      user: 'd497fa7120939d',
      pass: '62674145c65a55',
    }
  })

  async sendVerificationEmail(to: string, token: string) {
    const verificationUrl = `http://localhost:3000/verify-email?token=${token}`

    await this.transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`, // Use the email from env
      to,
      subject: 'Verify Your Email',
      html: `
        <h3>Email Verification</h3>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Email</a>
      `
    })
  }
}

export const emailService = new EmailService()
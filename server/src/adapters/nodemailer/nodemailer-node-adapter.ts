import { MailAdapter, SendMailData } from './../email-adapters';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.user,
        pass: process.env.pass
    }
});

export class NodeMailerMailAdpter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData): Promise<void> {
        await transport.sendMail({
            from: "Equipe Simplicio Dev oi@simplicio.com",
            to: "Anderson Simplicio <anderson25eu@gmail.com>",
            subject,
            html: body
        })
    }
}
import * as nodemailer from 'nodemailer';

class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string
    ) { }

    sendMail() {
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        transport.sendMail({
            from: "contato@krro.com.br",
            to: this.to,
            subject: this.subject,
            html: this.message
        }, (err) => {
            if (err) {
                return err;
            } else {
              return "E-mail enviado com sucesso!";
            }
          });
    }
}

export default new Mail;
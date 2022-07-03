import ejs from 'ejs';
import { createTransport } from 'nodemailer';
export const transporter = createTransport({
    service: 'yandex',
    host: 'smtp.yandex.ru',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
    }
});
export const getMessageTemplate = async ({ email, name, dirname, providedProps }) => {
    const body = await ejs.renderFile(dirname, providedProps ? providedProps : {});
    return {
        from: `Shaky Ecommerce <${process.env.NODEMAILER_EMAIL}>`,
        to: `${name} <${email}>`,
        subject: `Please verify your email address`,
        html: body
    };
};

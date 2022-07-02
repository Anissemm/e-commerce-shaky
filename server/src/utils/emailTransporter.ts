import ejs from 'ejs'
import { createTransport } from 'nodemailer'

interface SendMailOptions {
    template: string
}

export const transporter = createTransport({
    service: 'yandex',
    host: 'smtp.yandex.ru',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
    }

})


export const getMessageTemplate = async (email: string, name: string, dirname: string, props: { [key: string]: string }) => {
    const body = await ejs.renderFile(dirname, { ...props })
    return {
        from: `Shaky Ecommerce <${process.env.NODEMAILER_EMAIL}>`,
        to: `${name} <${email}>`,
        subject: `Please verify your email address`,
        html: body
    }
}
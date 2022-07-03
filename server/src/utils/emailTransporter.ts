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

interface MessageTemplateParameters {
    email: string
    name: string
    dirname: string
    providedProps?: {
        [key: string]: any
    }
}

interface MessageTemplateType {
    (props: MessageTemplateParameters): Promise<{ [key: string]: string }>
}

export const getMessageTemplate: MessageTemplateType = async ({ email, name, dirname, providedProps }) => {
    const body = await ejs.renderFile(dirname, providedProps ? providedProps : {}) as string
    return {
        from: `Shaky Ecommerce <${process.env.NODEMAILER_EMAIL}>`,
        to: `${name} <${email}>`,
        subject: `Please verify your email address`,
        html: body
    }
}
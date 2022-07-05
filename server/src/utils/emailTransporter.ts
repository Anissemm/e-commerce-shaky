import ejs from 'ejs'
import { createTransport } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

const DEVELOPMENT = process.env.MODE === 'DEVELOPMENT'

const predefinedServices: string[] = [
    'DynectEmail',
    'Gmail',
    'hot.ee',
    'Hotmail',
    'iCloud',
    'mail.ee',
    'Mail.Ru',
    'Mailgun',
    'Mailjet',
    'Mandrill',
    'Postmark',
    'QQ',
    'QQex',
    'SendGrid',
    'SES',
    'Yahoo',
    'yandex',
    'Zoho'
]
const devConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jayne.kutch54@ethereal.email',
        pass: 'ShXH7dxnmxr2nJuZ6D'
    }
}

const prodConfig = (): SMTPTransport.Options => {
    const SERVICE = process.env.NODEMAILER_SERVICE
    const HOST = process.env.NODEMAILER_HOST 
    const PORT = process.env.NODEMAILER_PORT
    const DEFAULT_SERVICE = !HOST && !SERVICE

    if (SERVICE && predefinedServices.includes(SERVICE) || DEFAULT_SERVICE ) {
        return {
            service: DEFAULT_SERVICE ? 'Gmail' : process.env.NODEMAILER_SERVICE,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        }
    } else {
        return {
            host: HOST,
            port: PORT ? Number(PORT) : undefined,
            secure: process.env.NODEMAILER_SECURE === 'true' || false,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        }
    }
}

const transporterConfig = !DEVELOPMENT ? devConfig : prodConfig()

export const transporter = createTransport(transporterConfig)

interface MessageTemplateParameters {
    email: string
    name: string
    senderName: string
    subject: string
    dirname: string
    providedProps?: {
        [key: string]: any
    }
}

interface MessageTemplateType {
    (props: MessageTemplateParameters): Promise<{ [key: string]: string }>
}

export const getMessageTemplate: MessageTemplateType = async ({ email, name, subject, senderName, dirname, providedProps }) => {
    const body = await ejs.renderFile(dirname, providedProps ? {company: senderName, ...providedProps} : {}) as string
    return {
        from: `${senderName} <${process.env.NODEMAILER_EMAIL}>`,
        to: `${name} <${email}>`,
        subject: subject,
        html: body
    }
}


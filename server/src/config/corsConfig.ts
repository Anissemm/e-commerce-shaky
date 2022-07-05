export const whitelistOrigins = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (whitelistOrigins.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

const DEVELOPMENT = process.env.MODE === 'DEVELOPMENT'

const corsOptionsDev = {
    origin: 'http://localhost:3000'
}

const exportedCors = DEVELOPMENT ? corsOptionsDev : corsOptions

export default exportedCors
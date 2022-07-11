interface DecodedAccessToken {
    admin: boolean
    email: string
    avatar: string
    exp: number
    iat: number
    name: string
    sub: string
}

const decodeAccessToken = (token: string): DecodedAccessToken | false => {
    const { atob } = window
    let decoded: false | DecodedAccessToken = false
    
    if (token) {
        const splited = token.split('.')
        try {
            decoded = JSON.parse(atob(splited[1]))
        } catch(err) {
            decoded = false
        }
    }

    return decoded
}

export default decodeAccessToken
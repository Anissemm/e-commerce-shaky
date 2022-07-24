const generateSignLink = () => {
    const link = 'https://oauth.yandex.ru/authorize/'

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.REACT_APP_YANDEX_ID as string,
        display: 'popup',
        scope: ["login:email", "login:info", "login:avatar"].join(' '),
        force_confirm: 'true'
    })

    return `${link}?${params.toString()}`
}

const useYandexSignIn = () => {
    const link = generateSignLink()
    const signInWithYandex = async () => {
        const anchor = document.createElement('a')
        anchor.href = link
        anchor.click()
    }

    return signInWithYandex
}

export default useYandexSignIn
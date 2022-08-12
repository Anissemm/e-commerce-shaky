import {ReactComponent as VisaIcon} from '../../assets/svg/icons/icon-payment-visa.svg'
import {ReactComponent as ApplePayIcon} from '../../assets/svg/icons/icon-payment-applepay.svg'
import {ReactComponent as MastercardIcon} from '../../assets/svg/icons/icon-payment-mastercard.svg'
import {ReactComponent as GooglePayIcon} from '../../assets/svg/icons/icon-payment-googlepay.svg'
import {ReactComponent as PaypalIcon} from '../../assets/svg/icons/icon-payment-paypal.svg'

const PaymentMethods = () => {
  return (
    <section>
        <h5 className='sr-only'>Allowed payment methods</h5>
        <div className='bg-sandy-brown py-20 mt-9 flex items-center justify-center w-full [@supports_(gap:64px)]:gap-14 md:[@supports_(gap:64px)]:gap-20 flex-wrap'>
            <div className='[@supports_not_(gap:64px)]:mr-14 md:[@supports_not_(gap:64px)]:mr-20'>
                <span className='sr-only'>Visa</span>
                <VisaIcon className='md:scale-125 fill-ebony-clay' />
            </div>
            <div className='[@supports_not_(gap:64px)]:mr-14 md:[@supports_not_(gap:64px)]:mr-20'>
                <span className='sr-only'>Visa</span>
                <MastercardIcon className='md:scale-125 fill-ebony-clay' />
            </div>
            <div className='[@supports_not_(gap:64px)]:mr-14 md:[@supports_not_(gap:64px)]:mr-20'>
                <span className='sr-only'>Visa</span>
                <ApplePayIcon className='md:scale-125 fill-ebony-clay' />
            </div>
            <div className='[@supports_not_(gap:64px)]:mr-14 md:[@supports_not_(gap:64px)]:mr-20'>
                <span className='sr-only'>Visa</span>
                <GooglePayIcon className='md:scale-125 fill-ebony-clay' />
            </div>
            <div className='[@supports_not_(gap:64px)]:mr-14 md:[@supports_not_(gap:64px)]:mr-20'>
                <span className='sr-only'>Visa</span>
                <PaypalIcon className='md:scale-125 fill-ebony-clay' />
            </div>
        </div>
    </section>
  )
}

export default PaymentMethods
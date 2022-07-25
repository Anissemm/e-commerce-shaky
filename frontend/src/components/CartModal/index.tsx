import Button from '../Button'
import Modal from '../Modal'
import ModalBody from '../Modal/ModalBody'
import ModalHeader from '../Modal/ModalHeader'
import ProductCard from '../ProductCard'

const CartModal = () => {
  return (
    <Modal justify='end' align='start' top={50} right={50} left={50} width={590} height={690} modalId='cart-modal'>
      <ModalHeader title='Your Order' />
      <ModalBody scroll>
        <div className='mx-auto max-w-[450px] mt-7 xs:mt-10 px-3 sm:px-1'>
          <div className='h-full overflow-y-auto max-h-[195px] xs:max-h-[225px] scrollbar-thin mx-auto pr-3'>
            <ul>
              <li><ProductCard type='list' /></li>
              <li><ProductCard type='list' /></li>
              <li><ProductCard type='list' /></li>
              <li><ProductCard type='list' /></li>
              <li><ProductCard type='list' /></li>
              <li><ProductCard type='list' /></li>
            </ul>
          </div>
          <div className='rounded-xl font-[Oswald] bg-melony-clay flex items-center justify-between mt-6 px-8 py-3 mr-3 mt-6'>
            <div className='text-lg xs:text-xl leading-none uppercase font-bold'>
              Total
            </div>
            <div className='flex items-center justify-center flex-col'>
            <p className='text-xs xs:text-sm leading-none'>3 Items</p>
            <p className='font-["Roboto_Condensed"] text-lg xs:text-xl leading-5 xs:leading-7'>$29.99</p>
            </div>
          </div>
          <div className='mt-14 xs:mt-6'>
            <Button variant='outlined' className="!py-1">Continue Shopping</Button>
            <Button className="py-2 mt-2 xs:mt-4">Go to cart</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default CartModal
import Modal from '../Modal'
import ModalBody from '../Modal/ModalBody'
import ModalHeader from '../Modal/ModalHeader'
import ProductCard from '../ProductCard'

const CartModal = () => {
  return (
    <Modal justify='end' align='start' top={50} right={50} width={590} height={690} modalId='cart-modal'>
        <ModalHeader title='Your Order' />
        <ModalBody>
            <div className='h-full overflow-y-auto'>
                <ul>
                  <li><ProductCard type='list' /></li>
                  <li><ProductCard type='list' /></li>
                  <li><ProductCard type='list' /></li>
                  <li><ProductCard type='list' /></li>
                  <li><ProductCard type='list' /></li>
                  <li><ProductCard type='list' /></li>
                </ul>
            </div>
        </ModalBody>
    </Modal>
  )
}

export default CartModal
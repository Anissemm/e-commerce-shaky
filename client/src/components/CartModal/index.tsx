import React from 'react'
import Modal from '../Modal'
import ModalBody from '../Modal/ModalBody'
import ModalHeader from '../Modal/ModalHeader'

const CartModal = () => {
  return (
    <Modal modalId='cart-modal'>
        <ModalHeader title='Cart' />
        <ModalBody>
            <div>
                Hello its Cart
            </div>
        </ModalBody>
    </Modal>
  )
}

export default CartModal
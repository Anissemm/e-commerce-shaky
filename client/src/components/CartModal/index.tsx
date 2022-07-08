import React from 'react'
import Modal from '../Modal'
import ModalBody from '../Modal/ModalBody'
import ModalHeader from '../Modal/ModalHeader'

const CartModal = () => {
  return (
    <Modal justify='end' align='start' top={20} right={20} width={590} height={690} modalId='cart-modal'>
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
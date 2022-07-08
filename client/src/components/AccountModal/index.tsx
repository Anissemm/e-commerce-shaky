import React from 'react'
import Modal from '../Modal'
import ModalBody from '../Modal/ModalBody'
import ModalHeader from '../Modal/ModalHeader'

const AccountModal = () => {
  return (
    <Modal top={40} right={100} modalId='account-modal'>
        <ModalHeader title='Account' />
        <ModalBody>
            It's account
        </ModalBody>
    </Modal>
  )
}

export default AccountModal
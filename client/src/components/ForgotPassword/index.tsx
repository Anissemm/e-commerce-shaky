import React, { PropsWithChildren } from "react"
import BackgroundOverlay from "../BackgroundOverlay"
import Modal from "../Modal"
import ModalBody from "../Modal/ModalBody"
import ModalHeader from "../Modal/ModalHeader"

const ForgotPasswordModal: React.FC<PropsWithChildren> = () => {
  return (
    <Modal modalId="forgot-password-modal">
      <ModalHeader title="Password Reset" />
      <ModalBody>
        here password reset
      </ModalBody>
    </Modal>
  )
}

export default ForgotPasswordModal
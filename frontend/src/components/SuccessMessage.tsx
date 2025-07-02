import React from 'react';
import Modal from 'react-modal';

interface SuccessMessageProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ isOpen, onClose, message }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className="modal"
    overlayClassName="modal-overlay"
    ariaHideApp={false}
  >
    <h2 className="modal-title">Успіх!</h2>
    <p className="modal-text">{message}</p>
    <button className="btn-primary" onClick={onClose}>OK</button>
  </Modal>
);

export default SuccessMessage;
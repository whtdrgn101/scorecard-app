import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Confirmation({ show, title, message, onConfirm, onCancel, confirmButtonText }) {
  
  return (
    <Modal show={show} onHide={onCancel}>
    <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
        Close
        </Button>
        <Button variant="primary" onClick={onConfirm}>
        {confirmButtonText}
        </Button>
    </Modal.Footer>
    </Modal>
  );
}
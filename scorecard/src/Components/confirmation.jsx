import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Confirmation() {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function setShowState(state) {
    setShow(state);
  }

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Confirm Record Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you wish to delete this record?</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={setShowState(false)}>
        Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
        Save Changes
        </Button>
    </Modal.Footer>
    </Modal>
  );
}
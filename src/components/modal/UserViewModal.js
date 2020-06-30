import React from "react";
import Modal from "react-bootstrap/Modal";
import { toggleModal } from '../../store/actions';
import "bootstrap/dist/css/bootstrap.min.css";

function Example(props) {
    const handleClose = () => props.dispatch(toggleModal());

    return (
        <>
            <Modal show={props.isModalOpen} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            </Modal>
        </>
    );
}

export default Example;
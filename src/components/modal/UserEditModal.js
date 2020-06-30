import React from "react";
import Modal from "react-bootstrap/Modal";
import { isEditModalOpen, updateUser } from '../../store/actions';
import { Form, Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";

function UserEditModal(props) {
    const handleClose = () => props.dispatch(isEditModalOpen());
    let lastId = 0;
    let updatedUserObject = {};

    const onChange = (e) => {
        updatedUserObject['id'] = props.activeUserInfo.id
        updatedUserObject[e.target.name] = e.target.value
      }

    const submitForm = () => {
        props.dispatch(updateUser(updatedUserObject))
        handleClose();
    }

    return (
        <>
            <Modal show={props.isEditModalOpen} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.activeUserInfo.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Form>
                            {Object.entries(props.activeUserInfo).map(data => {
                                return (
                                    <div key={lastId++}>
                                        {data[0] !== 'id' &&
                                            <Form.Group as={Row} controlId="formBasicEmail">
                                                <Form.Label className="text-capitalize" column md="3"><strong>{data[0] + ':'}</strong></Form.Label>
                                                <Col md="9">
                                                    <Form.Control name={data[0]} type="text" placeholder={data[1]} onChange={onChange} />
                                                </Col>
                                            </Form.Group>
                                        }
                                    </div>
                                )
                            })}
                            <Button onClick={submitForm}>
                                Done
                            </Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserEditModal;
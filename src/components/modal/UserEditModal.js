import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { isEditModalOpen, updateUser, formError } from '../../store/actions';
import { Form, Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import formInputType from '../shared/FormInputType';
import Toast from 'react-bootstrap/Toast'

function UserEditModal(props) {
    const handleClose = () => props.dispatch(isEditModalOpen());
    let lastId = 0;
    let updatedUserObject = {};
    const error = {};
    const [show, setShow] = useState(false);

    // Handle change of each input after user presses a button.
    const onChange = (e) => {
        const validEmailRegex = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        updatedUserObject['id'] = props.activeUserInfo.id;
        updatedUserObject[e.target.name] = e.target.value;
        error['email'] = '';

        if (e.target.name === 'email' && !validEmailRegex.test(e.target.value)) {
            error[e.target.name] = 'Please provide a valid email';
        } else if (e.target.name === 'email') {
            error[e.target.name] = '';
        }
    }

    const submitForm = () => {
        //Send errors to state to use in following steps.
        props.dispatch(formError(error.email));
        //If nothing is entered
        if (Object.values(error)[0] === undefined && Object.values(updatedUserObject)[0] === undefined) {
            handleClose();
        //If error is present
        } else if (Object.values(error)[0].length > 0) {
            return
        //If form is valid
        } else {
            props.dispatch(updateUser(updatedUserObject))
            handleClose();
            setShow(true);
        }
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
                                            <Form.Group as={Row} controlId="formInput">
                                                <Form.Label className="text-capitalize" column md="3"><strong>{data[0] + ':'}</strong></Form.Label>
                                                <Col md="9">
                                                    <Form.Control name={data[0]} type={formInputType(data[0])} placeholder={data[1]} onChange={onChange} />
                                                    {data[0] === 'email' && <small className="text-danger"> {Object.keys(props.formErrors).length === 0 ? '' : props.formErrors}</small>}
                                                </Col>
                                            </Form.Group>
                                        }
                                    </div>
                                )
                            })}
                            <Button onClick={submitForm} >
                                Done
                            </Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
            {/* Show toast when user clicks done and edit was successful */}
            <Toast onClose={() => setShow(false)} show={show} autohide>
                <Toast.Body>User successfully updated!</Toast.Body>
            </Toast>
        </>
    );
}

export default UserEditModal;

import React from "react";
import Modal from "react-bootstrap/Modal";
import { isViewModalOpen, toggleModal } from '../../store/actions';
import "bootstrap/dist/css/bootstrap.min.css";

function UserViewModal(props) {
    const handleClose = () => props.dispatch(isViewModalOpen(), props.dispatch(toggleModal({})));
    let lastId = 0;

    return (
        <>
            <Modal show={props.isViewModalOpen} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{props.activeUserInfo.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        {Object.entries(props.activeUserInfo).map(data => {
                            return (
                                <div className="row" key={lastId++}>
                                    {data[0] !== 'id' &&
                                        <>
                                            <div className="col-3">
                                                <p className="text-capitalize"><strong>{data[0] + ':'}</strong></p>
                                            </div>
                                            <div className="col">
                                                <p>{data[1]}</p>
                                            </div>
                                        </>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default UserViewModal;
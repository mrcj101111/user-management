import React from "react";
import {
  getUsers,
  isViewModalOpen,
  toggleModal,
  deleteUser,
  isEditModalOpen,
  searchUsers
} from '../../store/actions';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import UserViewModal from '../modal/UserViewModal';
import UserEditModal from '../modal/UserEditModal';
import { Form, FormControl } from "react-bootstrap";

class PersonList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getUsers());
  }

  render() {
    const { error, loading, filteredUsers } = this.props;
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    const onChangeSearchFilter = (e) => {
       this.props.dispatch(searchUsers(e))
    }

    return (
      <div className="container user-layout">
        <Form inline className="pr-1 mb-3">
          <FormControl type="text" onChange={onChangeSearchFilter} placeholder="Search" className="w-50 m-auto" />
        </Form>
        <div className="row">
          {filteredUsers.map(user =>
            <div className="col-lg-3 col-md-4 user-layout__col" key={user.id}>
              <div className="user-layout__col--inner">
                <img src={'https://i.pravatar.cc/100?img=' + user.id} alt={user.name + ' profile picture'}></img>
                <p className="font-weight-bold">{user.name}</p>
                <p><small>({user.username})</small></p>
                <FontAwesomeIcon className="search-icon view" icon={faEye} onClick={() => this.props.dispatch(isViewModalOpen(), this.props.dispatch(toggleModal(user)))} />
                <FontAwesomeIcon className="search-icon edit" icon={faPencilAlt} onClick={() => this.props.dispatch(isEditModalOpen(), this.props.dispatch(toggleModal(user)))} />
                <FontAwesomeIcon className="search-icon delete" icon={faTrashAlt} onClick={() => this.props.dispatch(deleteUser(user.id))} />
              </div>
            </div>
          )}
        </div>
        <UserViewModal {...this.props} />
        <UserEditModal {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  loading: state.loading,
  error: state.error,
  isViewModalOpen: state.isViewModalOpen,
  isEditModalOpen: state.isEditModalOpen,
  activeUserInfo: state.activeUserInfo,
  formErrors: state.formErrors,
  filteredUsers: state.filteredUsers,
  toaster: state.toaster
});

export default connect(mapStateToProps)(PersonList);

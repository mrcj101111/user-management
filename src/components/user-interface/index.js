import React from "react";
import { getUsers, isModalOpen, toggleModal } from '../../store/actions';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import UserViewModal from '../modal/UserViewModal';

class PersonList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getUsers());
  }

  render() {
    const { error, loading, users } = this.props;
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container user-layout">
        <div className="row">
          {users.map(user =>
            <div className="col-lg-3 col-md-4 user-layout__col" key={user.id}>
              <div className="user-layout__col--inner">
                <img src={'https://i.pravatar.cc/100?img=' + user.id} alt={user.name + ' profile picture'}></img>
                <p className="font-weight-bold">{user.name}</p>
                <p><small>({user.username})</small></p>
                <FontAwesomeIcon className="search-icon" icon={faEye} onClick={() => this.props.dispatch(isModalOpen(), this.props.dispatch(toggleModal(user)))} />
                <FontAwesomeIcon className="search-icon" icon={faPencilAlt} />
                <FontAwesomeIcon className="search-icon" icon={faTrashAlt} />
              </div>
            </div>
          )}
        </div>
        <UserViewModal {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  loading: state.loading,
  error: state.error,
  isModalOpen: state.isModalOpen,
  activeUserInfo: state.activeUserInfo,
});

export default connect(mapStateToProps)(PersonList);

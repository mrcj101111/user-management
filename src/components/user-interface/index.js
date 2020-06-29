import React from "react";
import { getUsers } from '../../store/actions';
import { connect } from "react-redux";

class PersonList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getUsers())
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
                <img src={'https://i.pravatar.cc/100?img=' + user.id}></img>
                <p className="font-weight-bold">{user.name}</p>
                </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(PersonList);

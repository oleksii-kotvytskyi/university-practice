import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LogoImage from '../../assets/images/logo-image.png';
import { signIn } from '../../redux/sign-in/actions';
import Spinner from '../spinner';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.userNameInput = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { isAuthentificated, history } = this.props;
    const inputElement = this.userNameInput.current;

    inputElement.addEventListener('invalid', () => {
      inputElement.setCustomValidity('Field is not valid');
    });

    if (isAuthentificated) {
      history.replace('/books');
    }
  }

  componentDidUpdate() {
    const { isAuthentificated, history } = this.props;

    if (isAuthentificated) {
      history.replace('/books');
    }
  }

  handleChange(e) {
    const checkInput = e.target.value.length > 3;
    this.setState({
      username: e.target.value,
    });

    if (!checkInput) {
      e.target.setCustomValidity('Field is not valid');
    } else {
      e.target.setCustomValidity('');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username } = this.state;
    const { signInCT } = this.props;
    signInCT({ username });
  }

  render() {
    const { isLoading, error } = this.props;

    return (
      <>
        {error && <div className="text-center mt-5">Ooops... Something went wrong</div>}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="container d-flex justify-content-center">
            <div className="container col-12 col-sm-8  col-lg-4 text-center mt-5">
              <img className="card-img-top rounded col-8" src={LogoImage} alt="avatar" />
              <form
                className="d-flex flex-column align-items-center"
                onSubmit={this.handleSubmit}
              >
                <label className="mt-3 col-11 font-weight-bold" htmlFor="username">
                  Username
                  <input
                    id="username"
                    type="text"
                    placeholder="type Username"
                    className="form-control text-center"
                    minLength={4}
                    maxLength={16}
                    ref={this.userNameInput}
                    autoFocus
                    required
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit" className="btn btn-success mt-3 col-10 btn-submit">
                  <span className="signIn-content">Sign-In</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
}

SignIn.defaultProps = {
  error: PropTypes.undefined,
};

SignIn.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
  signInCT: PropTypes.func.isRequired,
  isAuthentificated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object]),
};

const mapDispatchToProps = dispatch => ({
  signInCT: userName => dispatch(signIn(userName)),
});

export default connect(
  state => ({
    isAuthentificated: state.signInReducer.isAuthentificated,
    isLoading: state.signInReducer.isLoading,
    error: state.signInReducer.error,
  }),
  mapDispatchToProps,
)(withRouter(SignIn));

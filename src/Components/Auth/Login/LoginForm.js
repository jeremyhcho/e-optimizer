import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// CSS
import './Login.scss'

// Components
import {
  Button,
  FieldText,
  Spinner,
  Checkbox
} from 'Components/Common'

// Auth
import { loginUser } from 'Actions'

// Redux-form
import { Field, reduxForm } from 'redux-form'
import { presence, minChar, email } from 'Helpers/Validators'

const minChar5 = minChar(5)

class LoginForm extends Component {
  state = {
    isEmailValidated: false,
    rememberMe: false
  }

  toggleRememberMe = () => {
    this.setState({ rememberMe: !this.state.rememberMe })
  }

  handleSubmit = ({ Email, Password }) => {
    const {
      isEmailValidated,
      rememberMe
    } = this.state

    if (isEmailValidated) {
      this.props.loginUser({
        user: {
          email: Email,
          password: Password
        },
        rememberMe
      })
    }

    this.setState({ isEmailValidated: true })
  }

  renderError () {
    return (
      <div styleName='error-dialog'>
        <p>Incorrect email address and / or password.</p>
        <p>
          Do you need help <Link className='link' to={{ pathname: '/auth/forgot' }}>logging in?</Link>
        </p>
      </div>
    )
  }

  renderPasswordField () {
    const passwordStyles = {
      height: this.state.isEmailValidated ? '40px' : '0',
      transition: 'height 300ms',
      transitionDelay: 'height 1s',
      overflow: 'hidden',
      margin: this.state.isEmailValidated ? '15px 0' : '0'
    }
    const passwordValidation = []
    // Adds validators to passwordValidation if email is validated
    if (this.state.isEmailValidated) {
      passwordValidation.push(presence, minChar5)
    }

    return (
      <Field
        name='Password'
        label='password'
        type='password'
        component={FieldText}
        isLabelHidden
        shouldFitContainer
        placeholder='Enter password'
        autoComplete='off'
        style={passwordStyles}
        dirty={this.props.touch && this.state.isEmailValidated}
        validate={passwordValidation}
      />
    )
  }

  renderInnerButton () {
    if (this.props.isLoggingIn) {
      return <Spinner invertColor size='small' style={{ paddingTop: '8px' }} />
    }

    return this.state.isEmailValidated ? 'Log in' : 'Continue'
  }

  render () {
    return (
      <div styleName='login-container'>
        <Button
          style={{ textAlign: 'center', margin: 0 }}
          shouldFitContainer
          iconBefore={
            <i
              className='fa fa-google'
              style={{ display: 'block', fontSize: '14px' }}
            />
          }
        >
          Log in with Google
        </Button>

        <p
          style={{
            textAlign: 'center',
            color: '#97A0AF',
            fontSize: '11px',
            marginTop: '20px'
          }}
        >
          OR
        </p>

        {this.props.loginError && this.renderError()}
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field
            name='Email'
            label='email'
            type='text'
            component={FieldText}
            isLabelHidden
            shouldFitContainer
            placeholder='Enter email'
            autoComplete='off'
            validate={[presence, email]}
          />

          {this.state.isEmailValidated && this.renderPasswordField()}

          <Checkbox
            label='Remember me'
            name='rememberme'
            value='rememberMe'
            onChange={this.toggleRememberMe}
          />

          <Button shouldFitContainer appearance='primary' type="submit">
            {this.renderInnerButton()}
          </Button>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  loginError: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  touch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLoggingIn: state.auth.login.loggingIn,
  loginError: state.auth.login.error,
})

const mapDispatchToProps = {
  loginUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'login'
})(LoginForm))
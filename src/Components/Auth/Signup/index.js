import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import SignupForm from './SignupForm'
import { Button, QuzeLink } from 'Components/Common'

// CSS
import './Signup.scss'

// Assets
import PaperPlane from 'Assets/Icons/paper-plane.svg'

// Actions
import { resendVerificationEmail, openSnackbar } from 'Actions'

class Signup extends React.Component {
  componentWillReceiveProps (newProps) {
    if (!newProps.sendingEmail && this.props.sendingEmail) {
      this.props.openSnackbar('Email verification sent', 3000)
    }
  }

  resendVerificationEmail = () => {
    this.props.resendVerificationEmail(this.props.user.id)
  }

  renderVerifyUser () {
    return (
      <div styleName='signup' style={{ textAlign: 'center' }}>
        <PaperPlane
          width={64}
          height={64}
          style={{ display: 'block', margin: '0 auto' }}
        />

        <h1 style={{ marginTop: '45px' }}>Almost done!</h1>

        <p style={{ marginTop: '15px' }}>
          An email with verification instructions has been sent to
          <span style={{ color: 'var(--blue)' }}>
            {this.props.user.email}
          </span>
        </p>

        <Button
          shouldFitContainer
          style={{ marginTop: '45px' }}
          onClick={this.resendVerificationEmail}
          loading={this.props.sendingEmail}
        >
          Resend verification email
        </Button>
      </div>
    )
  }

  render () {
    if (this.props.userCreated) {
      return this.renderVerifyUser()
    }

    return (
      <div styleName="signup">
        <div styleName="signup-header">
          <h1 className="semibold">
            Get your free Quze account now.
          </h1>
        </div>

        <SignupForm />

        <div styleName="tos">
          <p className="small label" style={{ display: 'inline-block' }}>
            By signing up, you are agreeing to our
          </p>

          <QuzeLink
            to={{ pathname: '/help/tos' }}
            style={{ display: 'inline-block', marginLeft: '3px' }}
          >
            <p
              className='small'
              style={{ color: 'var(--blue)', textDecoration: 'underline' }}
            >
              terms of service
            </p>
          </QuzeLink>
        </div>

        <p styleName="login-link" className="small">
          <Link to="/auth/login">Already have an account? Log in</Link>
        </p>
      </div>
    )
  }
}

Signup.propTypes = {
  userCreated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  resendVerificationEmail: PropTypes.func.isRequired,
  sendingEmail: PropTypes.bool.isRequired,
  openSnackbar: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
  userCreated: auth.signup.userCreated,
  user: auth.signup.user,
  sendingEmail: auth.signup.sendingEmail
})

const mapDispatchToProps = {
  resendVerificationEmail,
  openSnackbar
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)

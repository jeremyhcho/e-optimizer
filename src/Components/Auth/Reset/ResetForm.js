import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

// CSS
import './Reset.scss'

// Component
import { FieldInput, Button } from 'Components/Common'

// Validators
import { presence, minChar, equality } from 'Helpers/Validators'

const minChar8 = minChar(8)
const equalityPassword = equality('Password')

// Actions
import { updateUserPassword } from 'Actions'

class ResetForm extends React.Component {
  onSubmit = ({ Password }) => {
    const { userId, token } = this.props

    this.props.updateUserPassword(userId, {
      user: { password: Password },
      token
    })
  }

  render () {
    return (
      <div styleName='reset-container'>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="Password"
            label="Password"
            type="Password"
            isLabelHidden
            component={FieldInput}
            shouldFitContainer
            placeholder="New password (must be 8 characters)"
            autoComplete='off'
            validate={[presence, minChar8]}
          />

          <Field
            name="Password confirmation"
            label="Password Confirmation"
            type="password"
            isLabelHidden
            component={FieldInput}
            shouldFitContainer
            placeholder="Confirm password"
            autoComplete='off'
            validate={[presence, equalityPassword]}
          />

          <Button shouldFitContainer type="submit" style={{ margin: '15px 0 0' }}>
            Update password
          </Button>
        </form>
      </div>
    )
  }
}

ResetForm.propTypes = {
  updateUserPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}

const mapDispatchToProps = {
  updateUserPassword
}

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({
  form: 'reset'
})(ResetForm))

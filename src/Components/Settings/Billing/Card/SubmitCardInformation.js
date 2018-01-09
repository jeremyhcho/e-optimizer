import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements'

// Components
import { Input, Card, Button, Spinner } from 'Components/Common'
import StripeInput from './StripeInput'

// Icons
import AlertIcon from 'Assets/Icons/settings/alert.svg'
import CardUpdateIcon from 'Assets/Icons/settings/card_update.svg'

// Actions
import { createBillingInformation, updateBillingInformation } from 'Actions'

class SubmitCardInformation extends React.Component {
  state = {
    name: ''
  }

  componentWillReceiveProps (newProps) {
    // Toggle after billing information has been updated
    if (!newProps.updatingBilling && this.props.updatingBilling) {
      this.props.toggleUpdate()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const {
      updating,
      userId,
      updateBillingInformation,
      createBillingInformation
    } = this.props

    const { name } = this.state

    if (updating) {
      this.props.stripe.createToken({
        name
      }).then(({ token }) => {
        updateBillingInformation(userId, token.id)
      })
    } else {
      this.props.stripe.createToken({
        name
      }).then(({ token }) => {
        createBillingInformation(token.id)
      })
    }
  }

  renderSubmitButton () {
    const { updating, toggleUpdate, updatingBilling, creatingBilling } = this.props

    if (updating) {
      return (
        <div style={{ marginTop: '15px', textAlign: 'right' }}>
          <Button flat onClick={toggleUpdate}>
            Back
          </Button>
          <Button type="submit" style={{ marginLeft: '15px' }}>
            {
              updatingBilling ? (
                <div>
                  <Spinner color="#fff" xs show style={{ margin: '0 10px 3px 0' }} />
                  Submitting new card information
                </div>
              ) : (
                'Submit new card information'
              )
            }
          </Button>
        </div>
      )
    }

    return (
      <Button
        type="submit"
        shouldFitContainer
        style={{ marginTop: '15px' }}
      >
        {
          creatingBilling ? (
            <div>
              <Spinner color="#fff" xs show style={{ margin: '0 10px 3px 0' }} />
              Creating card information
            </div>
          ) : (
            'Submit card information'
          )
        }
      </Button>
    )
  }

  renderCardHeader () {
    const headerStyle = {
      textAlign: 'center',
      marginBottom: '25px'
    }

    if (!this.props.updating) {
      return (
        <div style={headerStyle}>
          <AlertIcon />
          <p className="label small">You currently have no payment method.</p>
          <p className="label small">Fill and submit the card form below to create a payment method.</p>
        </div>
      )
    }

    return (
      <div style={headerStyle}>
        <CardUpdateIcon />
        <p className="label small">Replace existing payment method with new card</p>
      </div>
    )
  }

  renderLabel () {
    if (this.props.updating) {
      return 'New card information'
    }
    return 'Card information'
  }

  render () {
    return (
      <div>
        <Card
          style={{ textAlign: 'left', margin: '0' }}
          wrapperStyle={{
            width: '600px',
            padding: '25px 45px 45px',
            textAlign: 'left'
          }}
        >
          {this.renderCardHeader()}
          <form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              label="Name on card"
              placeholder="Jane Doe"
              shouldFitContainer
            />

            <StripeInput
              label="Card number"
              component={CardNumberElement}
            />

            <div className="flex">
              <div style={{ width: '40%' }}>
                <StripeInput
                  label="Expiration date"
                  component={CardExpiryElement}
                />
              </div>

              <div style={{ width: '25%', paddingLeft: '15px' }}>
                <StripeInput
                  label="CVC"
                  component={CardCVCElement}
                />
              </div>

              <div style={{ width: '35%', paddingLeft: '15px' }}>
                <StripeInput
                  label="Zip Code"
                  component={PostalCodeElement}
                />
              </div>
            </div>

            {this.renderSubmitButton()}
          </form>
        </Card>
      </div>
    )
  }
}

SubmitCardInformation.propTypes = {
  stripe: PropTypes.object.isRequired,
  updating: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  toggleUpdate: PropTypes.func.isRequired,
  createBillingInformation: PropTypes.func.isRequired,
  updateBillingInformation: PropTypes.func.isRequired,
  updatingBilling: PropTypes.bool.isRequired,
  creatingBilling: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
  updatingBilling: auth.authState.updatingBilling,
  creatingBilling: auth.authState.creatingBilling
})

const mapDispatchToProps = {
  createBillingInformation,
  updateBillingInformation
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectStripe(SubmitCardInformation))

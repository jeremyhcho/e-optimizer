import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Components
import { Card, Button } from 'Components/Common'
import planFactory from '../planFactory'

// CSS
import './SubscriptionPlan.scss'

const initialStyle = {
  height: '375px',
  width: '275px',
  position: 'relative',
  transition: 'all 200ms ease'
}

const buttonStyle = {
  marginTop: '20px'
}

class SubscriptionPlan extends React.Component {
  state = {
    style: initialStyle
  }

  selectPlan = () => {
    this.props.select(this.props.plan)
  }

  handleMouseOver = () => {
    this.setState({
      style: {
        ...this.state.style,
        boxShadow: '0px 4px 4px var(--gray)'
      }
    })
  }

  handleMouseOut = () => {
    this.setState({ style: initialStyle })
  }

  renderButton () {
    const { subscription, plan } = this.props

    if (subscription && subscription.plan.id === plan) {
      return (
        <p style={{ marginTop: '30px', cursor: 'default' }} className="semibold">You are currently on this plan</p>
      )
    }

    if (plan === 'advanced-plan') {
      return (
        <Button
          style={buttonStyle}
          disabled
        >
          This plan is currently unavailable
        </Button>
      )
    }

    return (
      <Button
        style={buttonStyle}
        onClick={this.selectPlan}
        type="button"
      >
        Choose this plan
      </Button>
    )
  }

  render () {
    const { plan } = this.props

    return (
      <Card
        style={{ margin: '0 25px' }}
        wrapperStyle={this.state.style}
        styleName="subscription-plan"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <div style={{ padding: '80px 0 25px' }}>
          <p className="semibold">{plan.toUpperCase()}</p>

          <div styleName="price">
            <span className="semibold" styleName="dollar">$</span>
            <span className="semibold" styleName="amount">{planFactory[plan].price}</span>
            <span className="small" style={{ letterSpacing: '0.5px' }}>/mo</span>
          </div>
        </div>

        <div styleName="features">
          {
            planFactory[plan].features.map(feature => (
              <p key={feature} className="small label">{feature}</p>
            ))
          }
        </div>

        <hr />

        {this.renderButton()}
      </Card>
    )
  }
}

SubscriptionPlan.defaultProps = {
  select: () => null,
  subscription: null
}

SubscriptionPlan.propTypes = {
  plan: PropTypes.oneOf(['basic-plan', 'advanced-plan']).isRequired,
  select: PropTypes.func,
  subscription: PropTypes.object
}

const mapStateToProps = ({ auth }) => ({
  subscription: auth.authState.user.subscription
})

export default connect(
  mapStateToProps
)(SubscriptionPlan)
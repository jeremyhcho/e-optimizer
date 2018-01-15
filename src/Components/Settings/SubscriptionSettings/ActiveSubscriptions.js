import React from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-styled-flexboxgrid'
import moment from 'moment'

// Icons
import AlertIcon from 'Assets/Icons/settings/alert.svg'

// CSS
import './SubscriptionSettings.scss'

const ActiveSubscriptions = ({ subscription, toggleShowPlans }) => {
  const convertUnix = (date) => {
    return moment.unix(date).format('MMM DD, YYYY')
  }

  if (subscription) {
    return (
      <div>
        <Row middle='xs' styleName="row">
          <div styleName="col">
            <p>Active subscription: </p>
          </div>
          <div>
            <p>{subscription.plan.name}</p>
          </div>
        </Row>

        <Row middle='xs' styleName="row">
          <div styleName="col">
            <p>
              Subscribed since:
            </p>
          </div>
          <div>
            {convertUnix(subscription.created)}
          </div>
        </Row>

        <Row middle='xs' styleName="row">
          <div styleName="col">
            Next payment date:
          </div>
          <div>
            {convertUnix(subscription.current_period_end)}
          </div>
        </Row>

        <p styleName="end-row" className="label">
          Click {' '}
          <span
            className="link"
            onClick={toggleShowPlans}
          >
            here
          </span>
          {' '} if you want to subscribe to a different plan or cancel your current subscription.
        </p>
      </div>
    )
  }

  // Customer that is not subscribed to a plan
  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <AlertIcon style={{ marginBottom: '10px', opacity: '0.7' }} />
      <p>You are not subscribed to any plans on your Quartz account.</p>
      <p>
        Click {' '}
        <span
          className="link"
          onClick={toggleShowPlans}
        >
          here
        </span>
        {' '} to get started and subscribe to a plan.
      </p>
    </div>
  )
}

ActiveSubscriptions.defaultProps = {
  subscription: null
}

ActiveSubscriptions.propTypes = {
  toggleShowPlans: PropTypes.func.isRequired,
  subscription: PropTypes.object
}

export default ActiveSubscriptions

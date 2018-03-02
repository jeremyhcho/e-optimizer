import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-styled-flexboxgrid'
import { Redirect } from 'react-router-dom'
import { groupBy } from 'lodash'
import moment from 'moment'

// CSS
import './Games.scss'

// Components
import DayWrapper from './DayWrapper'

class GamesList extends React.Component {
  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  groupedMatches() {
    const groupedMatches = groupBy(this.props.games, (game) => (
      game.date.tz('America/New_York').format('D dddd MMMM')
    ))
    // split games by date, then sort games by time of the day
    for (const date in groupedMatches) {
      if (groupedMatches[date]) {
        groupedMatches[date].sort((gameA, gameB) => (
          gameA.date.format('H.mm') - gameB.date.format('H.mm')
        ))
      }
    }

    return groupedMatches
  }

  render () {
    const { locationState } = this.props
    const groupedMatches = this.groupedMatches()

    return (
      <div styleName="games-list">
        {
          locationState && locationState.isTrial && (
            <Redirect to={{ pathname: '/settings/subscription', state: { from: '/games' } }} />
          )
        }

        <p
          className='small'
          style={{
            width: '100%',
            display: 'block',
            textAlign: 'right',
            padding: '0 35px 10px 0',
          }}
        >
          All times displayed in EST
        </p>

        <div
          styleName="matches-container"
          ref={ref => {
            this.scroller = ref
          }}
        >
          <Row style={{ width: '100%', maxWidth: '1600px', position: 'relative' }}>
            <Col xs={12}>
              {
                Object.keys(groupedMatches).length ? (
                  Object.keys(groupedMatches).map((date) => (
                    <DayWrapper
                      games={groupedMatches[date]}
                      key={date}
                      date={date}
                    />
                  ))
                ) : (
                  <DayWrapper
                    games={this.props.games}
                    date={moment(this.props.dateNow).tz('America/New_York').format('D dddd MMMM')}
                  />
                )
              }
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

GamesList.defaultProps = {
  locationState: null
}

GamesList.propTypes = {
  games: PropTypes.array.isRequired,
  locationState: PropTypes.object,
  dateNow: PropTypes.object.isRequired
}

const mapStateToProps = ({ nba }) => ({
  dateNow: nba.dates.now
})

export default connect(
  mapStateToProps
)(GamesList)

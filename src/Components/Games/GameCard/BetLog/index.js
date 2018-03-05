import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

// Components
import { ButtonGroup } from 'Components/Common'
import BetType from './BetType'

// Icons
import LeftArrow from 'Assets/Icons/left-tail-arrow.svg'

// CSS
import './BetLog.scss'

// Helpers
import { getNBAMatchBet } from 'Helpers/Selectors'

class BetLog extends React.Component {
  state = {
    selectedBet: 'moneyline'
  }

  getMatchBetType () {
    const { selectedBet } = this.state
    const { matchBet } = this.props

    return matchBet.find(bet => bet.bet_type === selectedBet)
  }

  render () {
    const { game, toggleShowBets, matchBet } = this.props

    const betLogStyle = classNames('bet-log', {
      show: this.props.show
    })

    const betTypes = [
      { label: 'Moneyline', key: 'moneyline' },
      { label: 'Spread', key: 'spread' },
      { label: 'Total', key: 'total' }
    ]

    return (
      <div styleName={betLogStyle}>
        <header styleName="header">
          <LeftArrow
            onClick={toggleShowBets}
            style={{ cursor: 'pointer' }}
          />

          <h4 className="semibold">Log a bet</h4>
        </header>

        <div styleName="spread-buttons">
          <ButtonGroup
            buttons={betTypes}
            onChange={(e, button) => this.setState({ selectedBet: button.key })}
            defaultKey='moneyline'
          />
        </div>

        {
          !matchBet ? <div /> : (
            <BetType
              game={game}
              matchBet={this.getMatchBetType()}
              betType={this.state.selectedBet}
            />
          )
        }
      </div>
    )
  }
}

BetLog.defaultProps = {
  matchBet: null
}

BetLog.propTypes = {
  game: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  toggleShowBets: PropTypes.func.isRequired,
  matchBet: PropTypes.array
}

const makeMapStateToProps = () => {
  const getBet = getNBAMatchBet()
  return ({ routines }, { game }) => ({
    matchBet: getBet(routines, game.id)
  })
}

export default connect(
  makeMapStateToProps
)(BetLog)
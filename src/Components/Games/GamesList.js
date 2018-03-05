import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

// CSS
import './Games.scss'

// Components
import GameCard from './GameCard'

class GamesList extends React.Component {
  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  sortedGames () {
    return this.props.games.sort((gameA, gameB) => (
      gameA.date.format('H.mm') - gameB.date.format('H.mm')
    ))
  }

  render () {
    const { locationState } = this.props

    return (
      <div styleName="games-list">
        {
          locationState && locationState.isTrial && (
            <Redirect to={{ pathname: '/settings/subscription', state: { from: '/games' } }} />
          )
        }

        <div styleName='timezone'>
          <p className='small'>
            All times displayed in EST
          </p>
        </div>


        <div
          styleName="matches-container"
          ref={ref => {
            this.scroller = ref
          }}
        >
          <div styleName='matches-sub-container'>
            {
              this.sortedGames().map(game => (
                <div styleName="game-container" key={game.id}>
                  <GameCard game={game} />
                </div>
              ))
            }
          </div>
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
  locationState: PropTypes.object
}

export default GamesList

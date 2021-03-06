import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Tab, DocumentTitle } from 'Components/Common'
import Overview from './Overview'
import ModelView from './ModelView'
import Trends from './Trends'
import Matchup from './Matchup'

// CSS
import '../GameDetails.scss'

class ScheduledGameDetails extends React.Component {
  state = { selected: this.getCurrentRouteKey() }

  getCurrentRouteKey () {
    const path = this.props.location.pathname.split('/')
    const route = path.slice(path.length - 1)[0]

    let routeKey
    if (!isNaN(route)) routeKey = 'overview'
    else routeKey = route

    return routeKey
  }

  handleNavigation = (e, menuItem) => {
    this.setState({ selected: menuItem.key })
  }

  render () {
    const tabItems = [
      { label: 'Overview', key: 'overview', route: `${this.props.match.url}/overview` },
      { label: 'Models', key: 'models', route: `${this.props.match.url}/models` },
      { label: 'Trends', key: 'trends', route: `${this.props.match.url}/trends` },
      { label: 'Matchup', key: 'matchup', route: `${this.props.match.url}/matchup` }
    ]

    return (
      <DocumentTitle title='Quze - NBA Game Details' header='Game Details' backUrl='/games'>
        <div styleName="game-details scheduled">
          <Row styleName="tabs">
            <Col xs={12}>
              <Tab
                tabs={tabItems}
                selectedKey={this.state.selected}
                onChange={this.handleNavigation}
                listStyle={{ maxWidth: '560px', marginTop: '30px' }}
              />
            </Col>
          </Row>

          <div className="matches-scroller" styleName="section">
            <Switch>
              <Route exact path='/games/:id/overview' component={Overview} />
              <Route exact path='/games/:id/models' component={ModelView} />
              <Route exact path='/games/:id/trends' component={Trends} />
              <Route exact path='/games/:id/matchup' component={Matchup} />
              <Redirect to={`/games/${this.props.match.params.id}/overview`} />
            </Switch>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

ScheduledGameDetails.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default ScheduledGameDetails

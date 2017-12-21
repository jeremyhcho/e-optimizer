import React from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Row, Col } from 'react-styled-flexboxgrid'

// Components
import { Tab } from 'Components/Common'
import { Overview, PlayerStats, TeamStats, Models } from './Sections'

// CSS
import './MatchDetails.scss'

class MatchDetails extends React.Component {
  state = {
    game: null
  }

  handleNavigation = (e, menuItem) => {
    this.props.history.push(`${this.props.match.url}/${menuItem.key}`)
  }

  render () {
    const tabItems = [
      { label: 'Overview', key: 'overview' },
      { label: 'Models', key: 'models' },
      { label: 'Player Stats', key: 'players' },
      { label: 'Team Stats', key: 'teams' }
    ]
    return (
      <div>
        <Row style={{ marginTop: '15px' }}>
          <Col xs={6}>
            <Tab
              tabs={tabItems}
              defaultKey='overview'
              onChange={this.handleNavigation}
            />
          </Col>
        </Row>
        <div style={{ marginTop: '15px', overflowY: 'scroll' }}>
          <Switch>
            <Route exact path='/matches/:id/overview' component={Overview} />
            <Route exact path='/matches/:id/teams' component={TeamStats} />
            <Route exact path='/matches/:id/players' component={PlayerStats} />
            <Route exact path='/matches/:id/models' component={Models} />
            <Redirect to={`/matches/${this.props.match.params.id}/overview`} />
          </Switch>
        </div>
      </div>
    )
  }
}

MatchDetails.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default MatchDetails
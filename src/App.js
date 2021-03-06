import React from 'react'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'styled-components'

// Global CSS
import './Assets/Stylesheets/Main.scss'

// Layouts
import MainLayout from 'Layouts/Main'
import AuthLayout from 'Layouts/Auth'

// Components
import AuthorizedRoute from 'Components/AuthorizedRoute'
import UnauthorizedRoute from 'Components/UnauthorizedRoute'

// Actions
import { fetchUser } from 'Actions'

// Helpers
import { theme } from 'Helpers'

class App extends React.Component {
  componentDidMount () {
    this.props.fetchUser()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.authorized && !this.props.authorized) {
      this.props.fetchUser()
    }
  }

  getMetaTag () {
    const { history } = this.props

    if (history.location.pathname === '/'
      || history.location.pathname.includes('/help')
      || history.location.pathname.includes('/auth')) {
      return [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }

    return [{ name: 'viewport', content: 'default' }]
  }

  render () {
    return (
      <div className='main'>
        <Helmet meta={this.getMetaTag()} />

        <ThemeProvider theme={theme}>
          <Switch>
            <UnauthorizedRoute path='/auth' component={AuthLayout} />
            <AuthorizedRoute path='/' component={MainLayout} />
          </Switch>
        </ThemeProvider>
      </div>
    )
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
  authorized: auth.authState.authorized
})

const mapDispatchToProps = {
  fetchUser
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))

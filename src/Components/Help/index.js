import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'

// Components
import { QuzeLink, Dropdown, MenuItem } from 'Components/Common'
import { Faq, Tos } from './HelpBlocks'
import SideNav from './SideNav'

// Icons
import QuzeIcon from 'Assets/Icons/blue-q-1.svg'

// CSS
import './Help.scss'

const Help = ({ history }) => (
  <main styleName="help-section">
    <header styleName="header">
      <div styleName="left">
        <QuzeIcon
          width={30}
          height={30}
          style={{ marginRight: '20px' }}
        />

        <QuzeLink to={{ pathname: '/' }}>
          <span>Quze</span>
        </QuzeLink>
      </div>

      <div styleName="middle">
        <Dropdown defaultText='How can we help?' wrapperStyle={{ width: '100%' }}>
          <MenuItem onClick={() => history.push({ pathname: '/help/faq' })}>
            FAQ
          </MenuItem>

          <MenuItem onClick={() => history.push({ pathname: '/help/tos' })}>
            Terms of service
          </MenuItem>
        </Dropdown>
      </div>

      <div styleName="right">
        <QuzeLink to={{ pathname: '/dashboard' }}>
          <span>
            Back to Home
          </span>
        </QuzeLink>
      </div>
    </header>

    <section styleName="help-center">
      <div styleName="title">
        <h4 className='semibold label'>Help Center</h4>
      </div>

      <div styleName="body">
        <SideNav />

        <Switch>
          <Route exact path='/help/faq' component={Faq} />
          <Route exact path='/help/tos' component={Tos} />
          <Redirect to='/help/faq' />
        </Switch>
      </div>
    </section>
  </main>
)

Help.propTypes = {
  history: PropTypes.object.isRequired
}

export default Help

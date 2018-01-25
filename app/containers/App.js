import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeView } from '../ducks/config'

import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Tabs, Tab} from 'material-ui/Tabs'
import muiTheme from '../styles/MUI'
import '../styles/App.css'

import Dashboard from '../views/Dashboard/Dashboard'
import Tasks from '../views/Tasks/Tasks'
import IDE from '../views/IDE/IDE'
import Community from '../views/Community/Community'
import Settings from '../views/Settings/Settings'

@connect(
  state => ({
    view: state.config.view
  }),
  dispatch => ({ actions: bindActionCreators({ changeView }, dispatch) })
)
class App extends Component {
  static propTypes = {
    view: PropTypes.string.isRequired
  }
  componentDidMount () {
    console.log('APP:', chrome)
  }

  render () {
    const { view, actions } = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div id='body'>
          <AppBar title='Security Extension' showMenuIconButton={false} />
          <Tabs value={view} onChange={actions.changeView}>
            <Tab value='dashboard' label='Dashboard' >
              <Dashboard />
            </Tab>
            <Tab value='tasks' label='Tasks' >
              <Tasks />
            </Tab>
            <Tab value='ide' label='IDE' >
              <IDE />
            </Tab>
            <Tab value='community' label='Community' >
              <Community />
            </Tab>
            <Tab value='settings' label='Settings' >
              <Settings />
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>
    )
  }
}
export default App

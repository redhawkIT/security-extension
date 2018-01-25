import React, { Component, PropTypes } from 'react'
// import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//  Redux Actions
import { addScript, editScript } from '../../ducks/scripts'
const actions = { addScript, editScript }
//  Styles
import '../../styles/Dashboard.css'

// require('../../core/chrome-extension-async')
// require('../../core/execute-async-function')

@connect(
  state => ({
    scripts: state.scripts
  }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
class Dashboard extends Component {
  static propTypes = {
    scripts: PropTypes.array.isRequired
  }
  static defaultProps = {
    scripts: []
  }
  render () {
    const { scripts } = this.props
    console.warn('executeAsyncFunction', typeof chrome.tabs.executeAsyncFunction)
    return (
      <section>
        Includes at a glance metrics for the application, scripts that ran on this page, logged output, etc.
      </section>
    )
  }
}
export default Dashboard

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
//  Redux Actions
// import { editConfig } from '../../ducks/config'
//  Styles
import '../../styles/IDE.css'
import Editor from './Editor/Editor'
import Output from './Output/Output'
import Docs from './Docs/Docs'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import EditorIcon from 'material-ui/svg-icons/action/code'
import OutputIcon from 'material-ui/svg-icons/action/compare-arrows'
import DocsIcon from 'material-ui/svg-icons/action/chrome-reader-mode'

@connect(
  state => ({
    config: state.config
  })
  // dispatch => ({ actions: bindActionCreators({ editConfig }, dispatch) })
)
class IDE extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired
  }
  static defaultProps = {
    config: {}
  }
  // state = {
  //   index: 0
  // }
  constructor (props) {
    super(props)
    this.state = { index: 0 }
    this.select = this.select.bind(this)
  }
  select = (index) => this.setState({ index })

  render (
    { config } = this.props,
    { index } = this.state
  ) {
    const Views = [<Editor />, <Output />, <Docs />]
    return (
      <section>
        <div>
          {Views[index]}
        </div>
        <BottomNavigation selectedIndex={index}>
          <BottomNavigationItem
            label='Editor'
            icon={<EditorIcon />}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label='Output'
            icon={<OutputIcon />}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label='API Docs'
            icon={<DocsIcon />}
            onClick={() => this.select(2)}
          />
        </BottomNavigation>
      </section>
    )
  }
}
export default IDE

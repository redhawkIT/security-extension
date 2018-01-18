import React, { PropTypes } from 'react'

import { ListItem } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import ActionInfo from 'material-ui/svg-icons/action/info'

import JsonView from 'react-json-view'

const Script = ({ executeScript, id, title, description, body, executed, output }) => (
  <div>
    <ListItem
      primaryText={title}
      secondaryText={description}
      disabled={false}
      leftCheckbox={<Checkbox disabled={false}
        onClick={() => executeScript(id, body)}
      />}
      rightIcon={<ActionInfo />}
      style={{ paddingBottom: 4 }}
    />
    {output && <JsonView
      src={output}
      name={null}
      indentWidth={2}
      collapsed
      collapseStringsAfterLength={25}
      displayObjectSize={false}
    />}
  </div>
)

Script.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  executed: PropTypes.bool.isRequired,
  executeScript: PropTypes.func.isRequired
  // output: PropTypes.array
}
Script.defaultProps = {
  description: ''
}

export default Script

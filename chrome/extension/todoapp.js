import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../../app/Root'
import './todoapp.css'

chrome.storage.local.get('state', (obj) => {
  const { state } = obj
  const initialState = JSON.parse(state || '{}')

  const createStore = require('../../app/store')
  console.warn('createStore', createStore)

  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  )
})

import { put, call } from 'redux-saga/effects'
import axios from 'axios'

import {
  GET_PLAYER,
  GET_PLAYER_SUCCESS,
  GET_PLAYER_FAIL
} from '../actions/actionTypes'

const statsURL = 'https://nba-players.herokuapp.com/players-stats/'
const imageURL = 'https://nba-players.herokuapp.com/players/'

const statsWeWant = [
  'points_per_game',
  'assists_per_game',
  'blocks_per_game',
  'three_point_percentage',
  'field_goal_percentage',
  'rebounds_per_game' 
]

function fetchPlayerData(firstName, surname) {
  let url = `${statsURL}${surname}/${firstName}`

  return axios.get(
    url
  )
}

export function* retrievePlayer(action) {
  let {firstName, surname} = action.payload

  try {
    let response = yield call(fetchPlayerData, firstName, surname)
    
    if (response.data.name) {
      let image = `${imageURL}${surname}/${firstName}`
      let stats = []

      for(let key in response.data) {
        if(statsWeWant.includes(key)) {
          stats.push({label: key, value: response.data[key]})
        }
      }

      let palyerProfile = {
        ...response.data,
        stats,
        image
      }
    }
  } catch (e) {
    yield put({type: 'GET_PLAYER_FAIL', payload: e})
  }
}
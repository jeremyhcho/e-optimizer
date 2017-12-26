import userSaga from './user'

import {
  resetSaga,
  loginSaga
} from './auth'

import {
  nbaSaga,
  overviewSaga,
  teamStatsSaga,
  playerStatsSaga
} from './nba'

import { nbaTeamsSaga } from './teams'

export default function* rootSaga() {
  yield [
    loginSaga(),
    userSaga(),
    resetSaga(),
    nbaSaga(),
    overviewSaga(),
    teamStatsSaga(),
    playerStatsSaga(),
    nbaTeamsSaga()
  ]
}

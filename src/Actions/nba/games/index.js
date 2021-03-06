import moment from 'moment'
import { createRoutine } from 'Routines'

// Constants
import { FETCH_NBA_GAMES, UPDATE_NBA_GAMES } from 'Constants'

// Apis
import { getNBAGames } from 'Apis'

export const fetchNBAGames = createRoutine({
  prefix: FETCH_NBA_GAMES,
  api: getNBAGames,
  reducerKey: ['nba', 'games'],
  transform: (response) => (
    response.map(game => ({
      ...game, date: moment.utc(new Date(game.date))
    }))
  )
})

export const updateNBAGames = (date) => ({
  type: UPDATE_NBA_GAMES,
  date
})

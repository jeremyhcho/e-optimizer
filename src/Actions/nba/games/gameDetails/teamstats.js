import createRoutine from 'Routines'

// Apis
import {
  getNBATeamStats,
  getNBAKeyStats
} from 'Apis'

// Constants
import {
  FETCH_NBA_TEAM_STATS,
  FETCH_NBA_KEY_STATS
} from 'Constants'

export const fetchNBATeamStats = createRoutine(
  FETCH_NBA_TEAM_STATS,
  getNBATeamStats,
  {
    reducerKey: {
      primaryKey: 'nba',
      type: 'teamStats'
    },
    transform: 'replace'
  }
)

export const fetchNBAKeyStats = createRoutine(
  FETCH_NBA_KEY_STATS,
  getNBAKeyStats,
  {
    reducerKey: {
      primaryKey: 'nba',
      type: 'keyStats'
    },
    transform: 'replace'
  }
)
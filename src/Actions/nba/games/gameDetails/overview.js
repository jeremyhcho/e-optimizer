import createRoutine from 'Routines'

// Apis
import {
  getNBASummary,
  getNBAQuarters,
  getNBARecentGames,
  getNBAStartingLineup,
  getNBAInjuries,
  getNBALines
} from 'Apis'

// Constants
import {
  FETCH_NBA_SUMMARY,
  FETCH_NBA_QUARTERS,
  FETCH_NBA_RECENT_GAMES,
  FETCH_NBA_STARTING_LINEUP,
  FETCH_NBA_INJURIES,
  FETCH_NBA_LINES
} from 'Constants'

// Summary
export const fetchNBASummary = createRoutine(
  FETCH_NBA_SUMMARY,
  getNBASummary,
  {
    reducerKey: {
      primaryKey: 'nba',
      type: 'summary'
    },
    transform: 'replace'
  }
)

// Quarters
export const fetchNBAQuarters = createRoutine(
  FETCH_NBA_QUARTERS,
  getNBAQuarters,
  {
    reducerKey: {
      primaryKey: 'nba',
      type: 'quarters'
    },
    transform: 'replace'
  }
)

// Recent Games
export const fetchNBARecentGames = createRoutine(
  FETCH_NBA_RECENT_GAMES,
  getNBARecentGames,
  {
    reducerKey: {
      primaryKey: 'nba',
      type: 'recentGames'
    },
    transform: 'replace'
  }
)

// Starting Lineup
export const fetchNBAStartingLineup = createRoutine(
  FETCH_NBA_STARTING_LINEUP,
  getNBAStartingLineup,
  {
    reducerKey: {
      primaryKey: 'nba',
      type: 'startingLineup'
    },
    transform: 'replace'
  }
)

// Injuries
export const fetchNBAInjuries = createRoutine(
  FETCH_NBA_INJURIES,
  getNBAInjuries,
  {
    reducerKey: {
      primaryKey: 'nba',
      type: 'injuries'
    },
    transform: 'replace'
  }
)

// Vegas Lines
export const fetchNBALines = createRoutine(
  FETCH_NBA_LINES,
  getNBALines,
  {
    reducerKey: {
      primaryKey: 'nba',
      type: 'lines'
    },
    transform: 'replace'
  }
)
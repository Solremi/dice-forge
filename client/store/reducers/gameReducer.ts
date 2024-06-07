import { createAction, createReducer } from '@reduxjs/toolkit';

export interface GameState {
  gameId: number;
  name: string;
  gameUrl: string;
}

export const gameInitialState: GameState = {
  gameId: 0,
  name: '',
  gameUrl: '',
};

export const actionSetGameId = createAction<{ gameId: number }>('SET_GAME_ID');

export const actionSetGameUrl = createAction<{ gameUrl: string }>(
  'SET_GAME_URL'
);

const gameReducer = createReducer(gameInitialState, (builder) => {
  builder
    .addCase(actionSetGameId, (state, action) => {
      if (action.payload) {
        state.gameId = action.payload.gameId;
      }
    })
    .addCase(actionSetGameUrl, (state, action) => {
      if (action.payload) {
        state.gameUrl = action.payload.gameUrl;
      }
    });
});

export default gameReducer;

import { CREATE_GAME, GET_GAMES } from "../constants/apiRoutes";
import { runGetApiRequest, runPostApiRequest } from "../utils/Api";

export function getGames() {
  return runGetApiRequest({
    endpoint: GET_GAMES,
  });
}

export function saveGame(payload) {
  return runPostApiRequest({
    endpoint: CREATE_GAME,
    payload: payload.data,
  });
}

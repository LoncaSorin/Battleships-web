import {
  checkStatus, errorParse, REQUEST_OPTIONS, responseParser,
} from "./apiUtils";

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';

const HEADERS = {
  'Content-Type': 'application/json',
};

export function runGetApiRequest(props) {
  const { endpoint } = props;

  const options = {
    headers: HEADERS,
    ...REQUEST_OPTIONS,
    method: METHOD_GET,
  };
  const route = `http://localhost:4000/api/${endpoint}`;

  return fetch(route, options)
    .then(checkStatus)
    .then(responseParser)
    .catch(errorParse);
}


export function runPostApiRequest(props) {
  const {
    endpoint,
    payload,
  } = props;

  const options = {
    headers: HEADERS,
    ...REQUEST_OPTIONS,
    method: METHOD_POST,
    body: payload ? JSON.stringify(payload) : null,
  };
  const route = `http://localhost:4000/api/${endpoint}`;

  return fetch(route, options)
    .then(checkStatus)
    .then(responseParser)
    .catch(errorParse);
}

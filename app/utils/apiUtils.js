export const REQUEST_OPTIONS = {
  mode: 'cors',
};

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.status = response.status;
  error.response = response;

  throw error;
}

export function responseParser(response) {
  const contentType = response.headers.get('Content-Type');

  if (((contentType && contentType.match(/application\/(ld\+)?json/)) || {}).input) {
    return response.json() || emptyObject;
  }

  return response.text();
}

export function errorParse(error) {
  if (!error || !error.response) {
    return Promise.reject(new Error('Unknown error'));
  }

  return responseParser(error.response)
    .then((errorResponse) => {
      const rejectedError = { ...errorResponse, status: error.status };
      return Promise.reject(rejectedError);
    });
}

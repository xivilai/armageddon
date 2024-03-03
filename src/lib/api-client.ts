const apiURL = process.env.API_URL;
const apiKey = process.env.API_KEY;

type ConfigType = {
  data?: any;
  token?: string;
  headers?: Record<string, string>;
  [key: string]: any;
};

async function client(
  endpoint: string,
  { data, token, headers: customHeaders, ...customConfig }: ConfigType = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...customHeaders,
    },
    ...customConfig,
  };

  return fetch(`${apiURL}/${endpoint}&api_key=${apiKey}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { client };

export const createQS = ({
  queryStringMap,
}: {
  queryStringMap: Map<string, string>;
}): URLSearchParams => {
  const searchParams = new URLSearchParams();
  const iterator = queryStringMap.entries()[Symbol.iterator]();
  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    const [k, v] = value;
    searchParams.set(k, v);
  }
  return searchParams;
};

export const appendPath = ({
  originalURL,
  newPathToAppend,
  queryStringMap,
  baseURL,
}: {
  originalURL: string;
  newPathToAppend: string;
  queryStringMap?: Map<string, string>;
  baseURL?: string;
}) => {
  const regEx = new RegExp(/^\/api/);
  if (regEx.test(originalURL) && baseURL) {
    const [, lastPath] = originalURL.split('/api');
    if (queryStringMap) {
      const qs = createQS({ queryStringMap });
      return new URL(`/api${newPathToAppend}${lastPath}?${qs.toString()}`, `${baseURL}`);
    }
    return new URL(`/api${newPathToAppend}${lastPath}`, `${baseURL}`);
  }
  return null;
};

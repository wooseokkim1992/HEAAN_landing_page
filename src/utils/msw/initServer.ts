export const initServer = async () => {
  const { server } = await import('../../mocks/server');
  server.listen();
};

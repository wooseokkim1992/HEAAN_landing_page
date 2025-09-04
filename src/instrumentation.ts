export async function register() {
  console.log({ runTime: process.env.NEXT_RUNTIME });
  console.log({ nodeEnv: process.env.NODE_ENV });
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV === 'development') {
    console.log('register mock service!');
    const { server } = await import('./mocks/server');
    server.listen({ onUnhandledRequest: 'bypass' });
  }
}

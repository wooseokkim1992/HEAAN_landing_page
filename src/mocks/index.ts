async function initMSW() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server');
    server.listen({ onUnhandledRequest: 'bypass' });
  } else {
    const { worker } = await import('./worker');
    worker.start({ onUnhandledRequest: 'bypass' });
  }
}

export default initMSW;

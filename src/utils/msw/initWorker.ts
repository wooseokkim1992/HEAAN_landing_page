export const initWorker = async () => {
  console.log({ runTime: process.env.NEXT_RUNTIME });
  console.log({ runTime: process.env.NODE_ENV });
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_RUNTIME !== 'nodejs') {
    const { worker } = await import('../../mocks/worker');
    worker.start({ onUnhandledRequest: 'bypass' });
  }
};

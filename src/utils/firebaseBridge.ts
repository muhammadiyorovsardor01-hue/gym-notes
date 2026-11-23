let runtimePromise: Promise<{
  authMod: typeof import('firebase/auth');
  firebaseMod: typeof import('../lib/firebase');
  cloudSyncMod: typeof import('./cloudSync');
}> | null = null;

export const loadFirebaseRuntime = () => {
  if (!runtimePromise) {
    runtimePromise = Promise.all([
      import('firebase/auth'),
      import('../lib/firebase'),
      import('./cloudSync'),
    ]).then(([authMod, firebaseMod, cloudSyncMod]) => ({
      authMod,
      firebaseMod,
      cloudSyncMod,
    }));
  }
  return runtimePromise;
};

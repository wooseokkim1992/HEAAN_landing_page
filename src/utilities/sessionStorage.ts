export const getSessionStorage = (key: string) => sessionStorage.getItem(key);

export const setSessionStorage = (key: string, val: string) => sessionStorage.setItem(key, val);

export const removeSessionStorage = (key: string) => sessionStorage.removeItem(key);

export const clearSessionStorage = () => sessionStorage.clear();

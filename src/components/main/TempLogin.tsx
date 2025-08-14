'use client';

import React, { useState, type FC } from 'react';

type TempLoginProps = {
  uid?: string;
};

const TempLogin: FC<TempLoginProps> = ({ uid }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <form
      action={`${process.env.NEXT_PUBLIC_NGINX_URL}/auth/${uid}/login`}
      method="post"
      className="flex flex-row gap-[10px] w-fill bg-white"
    >
      <div className="flex flex-row gap-[2.5px] w-auto">
        <label htmlFor="username">username</label>
        <input
          id="username"
          name="username"
          className="w-[120px] border-[1px] border-solid border-black "
          type="text"
          value={username}
          onChange={(evt) => {
            const {
              target: { value },
            } = evt;
            setUsername(value);
          }}
        />
      </div>
      <div className="flex flex-row gap-[2.5px] w-auto">
        <label htmlFor="username">password</label>
        <input
          className="w-[120px] border-[1px] border-solid border-black "
          name="password"
          type="password"
          value={password}
          onChange={(evt) => {
            const {
              target: { value },
            } = evt;
            setPassword(value);
          }}
        />
      </div>
      <button
        type="submit"
        className="box-border border-[1px] border-[black] border-solid rounded-[12px] p-[5px]"
      >
        로그인
      </button>
    </form>
  );
};

export default TempLogin;

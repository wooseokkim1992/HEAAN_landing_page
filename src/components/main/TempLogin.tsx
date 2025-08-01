'use client';

import React, { useState } from 'react';

function TempLogin() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="flex flex-row gap-20px  w-full">
      <input
        type="text"
        value={username}
        onChange={(evt) => {
          const {
            target: { value },
          } = evt;
          setUsername(value);
        }}
      />
      <input
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
  );
}

export default TempLogin;

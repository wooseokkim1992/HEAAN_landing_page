import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js'; // ESLint 내장 규칙 세트
import globals from 'globals'; // 전역 변수 정의
// 플러그인을 직접 임포트할 경우 (compat.plugins를 사용하지 않을 때)
import reactPlugin from 'eslint-plugin-react';

import tsParser from '@typescript-eslint/parser';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  // 플러그인 경로를 현재 파일 기준으로 해석하도록 설정
  resolvePluginsRelativeTo: __dirname,
  // js.configs.recommended 등을 extends 할 때 사용될 수 있음
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  // 1. **전역 무시 파일 및 디렉토리 설정** (항상 배열의 가장 처음에 위치)
  // 이 설정은 모든 린팅 대상에서 제외됩니다.
  {
    ignores: ['node_modules/', '.next/', 'dist/', 'build/', '@next/', '**/*.{md,json,css}'],
  },

  // 2. **기본 Next.js 설정 확장**
  // 이들은 Next.js와 관련된 기본 React, TypeScript 규칙을 제공합니다.
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 3. **src/ 하위의 일반 JS/JSX/TS/TSX 파일에 적용될 기본 규칙**
  // 'no-var', 'semi' 등과 같이 언어 전반에 걸쳐 적용되는 규칙을 여기에 정의합니다.
  {
    files: ['./src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'no-var': 'error', // 'var' 키워드 사용 금지
      semi: 'error', // 세미콜론 강제 (Prettier와 충돌할 수 있으므로 Prettier 사용 시 주의)
      // 'no-unused-vars'는 TypeScript 섹션에서 @typescript-eslint 버전으로 대체합니다.
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 모듈 경계 타입 명시 강제 해제 (개인의 선호에 따라)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-unused-vars': 'off',
    },
  },

  // 4. **React 및 JSX A11y 설정**
  // React 관련 규칙과 접근성 규칙을 적용합니다.
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ...compat.extends('plugin:react/recommended', 'plugin:jsx-a11y/recommended')[0],
    plugins: {
      // compat.plugins를 사용하는 것이 일반적이며, reactPlugin을 직접 import한 경우에도 괜찮습니다.
      react: reactPlugin,
      // jsx-a11y는 extends로 가져왔으므로 여기서는 명시적으로 추가할 필요 없음
      // 만약 extends 없이 개별 규칙을 사용한다면: "jsx-a11y": compat.plugins["jsx-a11y"]
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // JSX 구문 활성화
        },
      },
      globals: {
        ...globals.browser, // 브라우저 환경 전역 변수 활성화
      },
    },
    rules: {
      // Next.js 12+의 새로운 JSX Runtime 덕분에 불필요
      'react/react-in-jsx-scope': 'off',
      // TypeScript 사용 시 PropTypes는 일반적으로 불필요
      'react/prop-types': 'off',
      // prop 중에 boolean type 이 true 인 경우 굳이 명시하지 않음 ex) <Elem flag /> => flag 가 true
      'react/jsx-boolean-value': 'error', // '2' 대신 'error' 또는 'warn' 사용
      // self-closing 시 trailing tag (/>) 와의 간격 유지할지
      'react/jsx-space-before-closing': 'error', // '2' 대신 'error' 또는 'warn' 사용
      // children 없는 react 요소일 경우 self-closing 하도록 강제
      'react/self-closing-comp': 'error', // '2' 대신 'error' 또는 'warn' 사용
    },
  },
  // 6. **Module Import Order 및 Import Rule 설정**
  {
    files: ['./src/**/*.{js,jsx,ts,tsx}'],
    ...compat.extends('plugin:import/recommended', 'plugin:import/typescript')[0],
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal', // 파일 별칭 경로 (ex. @/components)는 'internal'로 분류됩니다.
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'next*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@amplify',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@{components,utils,assets}/**/*',
              group: 'internal',
            },
            {
              pattern: '@{constants}/**/*',
              group: 'object',
            },
            {
              pattern: '@typings/**/*',
              group: 'type',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'error', // 해결되지 않는 임포트 경로 오류
      'import/no-duplicates': 'error', // 중복 임포트 방지
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
        typescript: {
          project: './tsconfig.json', // tsconfig.json의 'paths' 설정을 읽어들여 파일 별칭 인식
        },
      },
    },
  },

  // 6. **Module Import Order 및 Import Rule 설정**
  {
    files: ['./src/**/*.{js,jsx,ts,tsx}'],
    ...compat.extends('plugin:import/recommended', 'plugin:import/typescript')[0],
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal', // 파일 별칭 경로 (ex. @/components)는 'internal'로 분류됩니다.
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'next*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react*',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@amplify',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@{components,utils,assets}/**/*',
              group: 'internal',
            },
            {
              pattern: '@constants/**/*',
              group: 'object',
            },
            {
              pattern: '@typings/**/*',
              group: 'type',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'error', // 해결되지 않는 임포트 경로 오류
      'import/no-duplicates': 'error', // 중복 임포트 방지
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
        typescript: {
          project: './tsconfig.json', // tsconfig.json의 'paths' 설정을 읽어들여 파일 별칭 인식
        },
      },
    },
  },

  // 7. **Prettier 통합** (항상 배열의 **가장 마지막**에 위치해야 합니다!)
  {
    files: ['./**/*.{js,jsx,ts,tsx,json,css,scss,md}'],
    ...compat.extends('plugin:prettier/recommended')[0],
  },
];

export default eslintConfig;

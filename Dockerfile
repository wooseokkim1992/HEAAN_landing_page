# 1단계: 의존성 설치 및 애플리케이션 빌드
FROM node:22-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package.json pnpm-lock.yaml ./

# 의존성 설치
RUN npm install -g pnpm && pnpm install --frozen-lockfile
RUN rm -rf ./.next/cache
# 애플리케이션 소스 복사
COPY . ./

# 애플리케이션 빌드
RUN pnpm build

# 2단계: 실행 이미지
FROM node:22-alpine

WORKDIR /app

# 빌드 단계에서 생성된 필수 파일만 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static /app/.next/static
COPY --from=builder /app/public ./public

EXPOSE 5000

CMD ["node", "server.js"]
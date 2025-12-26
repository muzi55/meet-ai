![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/muzi55/next-service?utm_source=oss&utm_medium=github&utm_campaign=muzi55%2Fnext-service&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

---

2025년 12월 26일 작성

# Next.js DB 연동 및 Drizzle ORM 사용법

## DB 연동 개요

이 프로젝트는 **Next.js**와 **Drizzle ORM**을 활용하여 PostgreSQL 데이터베이스와 연동합니다.

### 주요 파일 및 역할

- `app/db/schema.ts`: DB 테이블 스키마 정의 (Drizzle ORM)
- `app/db/index.ts`: DB 인스턴스 생성 및 내보내기
- `drizzle.config.ts`: Drizzle ORM 마이그레이션 및 설정 파일

## Drizzle ORM 공식문서

- https://orm.drizzle.team/docs

## 환경 변수

`.env` 파일에 아래와 같이 DB 연결 정보를 설정해야 합니다.

```env
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>
```

## 테이블 스키마 예시 (`app/db/schema.ts`)

```typescript
import {
  integer,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
```

## DB 인스턴스 생성 (`app/db/index.ts`)

```typescript
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(process.env.DATABASE_URL!);
```

## 마이그레이션 및 DB 관리

Drizzle ORM의 CLI를 활용해 마이그레이션 및 DB 관리를 할 수 있습니다.

### 마이그레이션 명령어

- 스키마 반영: `npm run db:push`
- Drizzle Studio(웹 UI): `npm run db:studio`

## 참고

- Drizzle ORM 공식문서: https://orm.drizzle.team/docs
- Neon(PostgreSQL 서버리스): https://neon.tech/docs

---

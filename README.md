# Todo List App

![Todo List App](/public/images/logo.svg)

## 기술 스택

- **Next.js**
- **TailwindCSS**
- **Tanstack Query (React Query)**
- **Return-fetch**

## 주요 기능

### 할 일 추가 기능
- 홈 화면 상단의 입력 폼에서 새로운 할 일을 쉽게 추가할 수 있습니다.
- 입력 후 즉시 목록에 반영되어 사용자에게 즉각적인 피드백을 제공합니다.

### 할 일 관리 기능
- **완료/미완료 전환**: 할 일 항목을 클릭하여 완료 상태를 토글할 수 있습니다.
- **상세 보기**: 항목 클릭 시 세부 페이지로 이동하여 자세한 정보를 확인하고 관리할 수 있습니다.
- **할 일 삭제**: 세부 페이지에서 삭제 버튼을 통해 할 일을 제거할 수 있습니다.

### 할 일 필터링 기능
- TODO 섹션과 DONE 섹션으로 나누어 할 일 목록을 효과적으로 관리합니다.
- 완료된 일과 완료되지 않은 일을 시각적으로 구분하여 확인할 수 있습니다.

### 메모 및 이미지 기능
- 할 일에 메모를 추가하여 상세 정보를 기록할 수 있습니다.
- 이미지 업로드 기능을 통해 할 일과 관련된 시각적 정보를 첨부할 수 있습니다.

## 특징

- **효율적인 API 통신**: `return-fetch` 라이브러리를 사용해 axios 인스턴스와 유사하게 공통된 base-url과 헤더 설정을 공유하는 커스텀 인스턴스 구현
- **낙관적 업데이트**: 모든 TODO CRUD 훅에서 낙관적 업데이트를 적용하여 서버 응답 전에 클라이언트 상태를 먼저 업데이트함으로써 사용자 경험 향상
- **성능 최적화**: 상세 페이지에서 폼 컴포넌트의 상태를 자식 컴포넌트가 관리하도록 설계하여 입력 시 불필요한 전체 컴포넌트 리렌더링 방지
- **직관적인 사용자 피드백**: Toast 공통 컴포넌트를 통해 사용자에게 성공/실패/오류 메시지를 표시하여 사용성 제고

## 시작하기

### 설치

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

개발 서버가 http://localhost:3000 에서 실행됩니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 프로젝트 구조

- `/src/app`: Next.js 페이지 컴포넌트
- `/src/components`: 재사용 가능한 UI 컴포넌트
- `/src/api`: API 통신 관련 모듈
- `/src/hooks`: 커스텀 React 훅
- `/src/utils`: 유틸리티 함수
- `/public`: 정적 자원 (이미지, 아이콘 등)

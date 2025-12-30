import React, { Suspense } from "react";
import { AgentsView } from "./_components/agents-view";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/app/trpc/server";
import { LoadingState } from "@/app/_components/loading-state";
import { ErrorState } from "@/app/_components/error-state";
import { ErrorBoundary } from "react-error-boundary/";

export default await function AgentsPage() {
  /**
   *  1. QueryClient는 React Query의 핵심 객체로, 쿼리 캐시와 상태를 관리합니다.
   *  2. Next.js의 app route(서버 컴포넌트 기반) 환경에서는 SSR(서버사이드 렌더링)과 CSR(클라이언트사이드 렌더링) 모두에서 QueryClient 인스턴스가 중복 생성되지 않도록 관리하는 것이 중요합니다.
   *  3. 만약 매번 new QueryClient()로 생성하면, 같은 요청 내에서 여러 번 인스턴스가 만들어져 캐시가 공유되지 않고, 불필요한 메모리 사용과 예기치 않은 동작이 발생할 수 있습니다.
   *  4. getQueryClient()는 내부적으로 이미 생성된 QueryClient가 있으면 그 인스턴스를 반환하고, 없으면 새로 만들어 반환합니다(싱글턴 패턴).
   *  5. 이렇게 하면 SSR 환경에서도 하나의 QueryClient 인스턴스를 재사용할 수 있어, 쿼리 프리패치(prefetch)와 하이드레이션(hydration)이 올바르게 동작합니다.
   *  6. 또한, 클라이언트와 서버 모두에서 일관된 쿼리 캐시를 사용할 수 있어, 데이터 일관성과 성능이 향상됩니다.
   *
   *  결론: getQueryClient()를 사용하면 QueryClient 인스턴스가 중복 생성되는 것을 방지하고, SSR/CSR 환경 모두에서 React Query의 캐시와 상태를 안전하게 관리할 수 있습니다.
   */
  const queryClient = getQueryClient();

  /**
   *  1. queryClient.prefetchQuery()는 Promise(비동기 객체)를 반환합니다.
   *  2. await를 사용하면 해당 비동기 작업이 끝날 때까지 다음 코드 실행이 멈춥니다.
   *     - 즉, 데이터를 모두 받아올 때까지 컴포넌트 렌더링이 지연될 수 있습니다.
   *     - 만약 prefetch 결과가 필수적이지 않거나, 렌더링과 동시에 백그라운드에서 데이터를 미리 받아두고 싶을 때는 await가 필요하지 않습니다.
   *  3. void 연산자는 반환값(Promise)을 명시적으로 무시한다는 의미로 사용합니다.
   *     - 이렇게 하면 "이 비동기 작업의 결과나 완료 여부에 신경 쓰지 않겠다"는 의도를 코드에 명확하게 드러낼 수 있습니다.
   *     - 코드 가독성과 의도 전달에 도움이 됩니다.
   *  4. Next.js app route 기반 SSR 환경에서는 prefetchQuery가 실패해도 전체 페이지 렌더링에는 영향을 주지 않도록 하는 것이 일반적입니다.
   *     - 만약 반드시 데이터가 필요하다면 await와 try-catch로 에러 처리를 해주는 것이 더 안전합니다.
   *     - 하지만 prefetch는 "미리 캐시에 데이터를 넣어두는" 용도이므로, 실패해도 치명적이지 않은 경우가 많아 void를 사용합니다.
   *   결론:
   *      - await는 해당 비동기 작업이 꼭 끝나야 다음 로직이 안전하게 실행될 때 사용합니다.
   *      - void는 결과를 기다릴 필요가 없고, Promise의 반환값을 명시적으로 무시하고 싶을 때 사용합니다.
   *      - 이 코드는 prefetchQuery의 결과가 필수적이지 않으므로 void를 사용한 것입니다.
   */
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions()
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Error loading agents"
                description="There was an error while loading the agents."
              />
            }>
            <LoadingState
              title="Loading agents"
              description="Please wait while we load the agents."
            />
          </ErrorBoundary>
        }>
        <AgentsView />
      </Suspense>
    </HydrationBoundary>
  );
};

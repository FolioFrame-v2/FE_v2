import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "@/styles.css?url";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import axios from "axios";

// 전역 Axios 인터셉터 설정 (요청 시마다 로컬스토리지의 토큰을 헤더에 자동 주입)
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 토큰 만료 등 401 에러 발생 시 자동 로그아웃 처리 및 토큰 재발급
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 401 에러이고, 재시도한 적이 없으며, 리프레시 토큰 재발급 요청 자체가 아닌 경우
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/api/auth/refresh')) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }
        
        // 리프레시 토큰으로 새 토큰 발급 요청
        const res = await axios.post('/api/auth/refresh', undefined, {
          headers: {
            'Refresh-Token': refreshToken
          }
        });
        
        const newAccessToken = res.data?.result?.accessToken;
        const newRefreshToken = res.data?.result?.refreshToken;
        
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }
          
          // 원래 요청 재시도
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // 리프레시 실패 시 로그아웃 처리
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userType");
        // window.location.href = '/login';
      }
    } else if (error.response?.status === 401) {
      // 리프레시 토큰도 없거나 재시도해도 401인 경우
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userType");
    }
    return Promise.reject(error);
  }
);

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FolioFrame — 개발자 포트폴리오 제작 플랫폼" },
      { name: "description", content: "템플릿으로 시작하고, AI 진단으로 다듬고, 한 줄 링크로 공유하는 개발자 포트폴리오." },
      { property: "og:title", content: "Devfolio — 개발자 포트폴리오 제작 플랫폼" },
      { property: "og:description", content: "템플릿 · AI 진단 · 공유 · 기업 공고 매칭을 한 곳에서." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { Nav } from "@/components/ui/nav";
import { Footer } from "@/components/ui/footer";
import { useRouterState } from "@tanstack/react-router";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useRouterState({ select: (s) => s.location });

  const NO_LAYOUT_PATHS = ["/login", "/signup", "/onboarding", "/onboarding-recruiter", "/portfoliopageeditor", "/createportfolio", "/modifyportfolio", "/memberselection"];
  const isNoLayout = NO_LAYOUT_PATHS.some(path => location.pathname.startsWith(path));

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background">
        {!isNoLayout && <Nav />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!isNoLayout && <Footer />}
      </div>
    </QueryClientProvider>
  );
}

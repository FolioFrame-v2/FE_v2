import { defineConfig } from 'orval';

export default defineConfig({
    api: {
        // 백엔드의 OpenAPI(Swagger) JSON 파일 URL 또는 로컬 경로를 입력하세요.
        input: 'http://13.209.72.246/v3/api-docs', // 예: 백엔드 Swagger URL
        output: {
            mode: 'tags-split', // 태그(Controller)별로 파일을 분리해서 생성
            target: 'src/api/generated/endpoints.ts', // 생성될 파일의 위치
            schemas: 'src/api/generated/models', // 타입/인터페이스가 생성될 위치
            client: 'react-query', // React Query 훅을 생성하도록 설정
            httpClient: 'axios',
            mock: false, // 만약 MSW용 Mock 데이터가 필요하면 true로 설정
        },
    },
});

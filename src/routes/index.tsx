import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-yellow-500">Lemong</h1>
        <p className="mt-4 text-lg text-gray-600">
          협업을 위한 CI/CD 파이프라인이 구성되었습니다
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            CI 통과
          </span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
            자동 배포
          </span>
        </div>
      </div>
    </div>
  )
}

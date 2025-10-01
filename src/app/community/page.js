'use client'

import AuthGuard from '@/components/AuthGuard'
import { useAuth } from '@/contexts/AuthContext'

function CommunityContent() {
  const { user } = useAuth()

  return (
    <div className="py-8 pt-32">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          QnA 커뮤니티
        </h1>
        <p className="text-gray-600">
          느린학습자들을 위한 질문과 답변 공간입니다.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-1">
          환영합니다, {user?.name || user?.email}님! 🎉
        </h2>
        <p className="text-blue-700 text-sm">
          로그인이 성공적으로 완료되었습니다. 이제 커뮤니티의 모든 기능을 이용하실 수 있습니다.
        </p>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">
            React Hook Form 사용법이 궁금해요
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            React Hook Form을 처음 사용해보는데, 기본적인 사용법을 알고 싶습니다...
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>작성자: 김학습</span>
            <span>2024.01.15</span>
            <span>답변 3개</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">
            Next.js 미들웨어 질문입니다
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            미들웨어에서 쿠키를 읽는 방법이 잘 안 되는데 도움 부탁드립니다...
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>작성자: 이개발</span>
            <span>2024.01.14</span>
            <span>답변 1개</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">
            React Hook Form 사용법이 궁금해요
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            React Hook Form을 처음 사용해보는데, 기본적인 사용법을 알고 싶습니다...
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>작성자: 김학습</span>
            <span>2024.01.15</span>
            <span>답변 3개</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">
            Next.js 미들웨어 질문입니다
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            미들웨어에서 쿠키를 읽는 방법이 잘 안 되는데 도움 부탁드립니다...
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>작성자: 이개발</span>
            <span>2024.01.14</span>
            <span>답변 1개</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">
            React Hook Form 사용법이 궁금해요
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            React Hook Form을 처음 사용해보는데, 기본적인 사용법을 알고 싶습니다...
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>작성자: 김학습</span>
            <span>2024.01.15</span>
            <span>답변 3개</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">
            Next.js 미들웨어 질문입니다
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            미들웨어에서 쿠키를 읽는 방법이 잘 안 되는데 도움 부탁드립니다...
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>작성자: 이개발</span>
            <span>2024.01.14</span>
            <span>답변 1개</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">
            React Hook Form 사용법이 궁금해요
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            React Hook Form을 처음 사용해보는데, 기본적인 사용법을 알고 싶습니다...
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>작성자: 김학습</span>
            <span>2024.01.15</span>
            <span>답변 3개</span>
          </div>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">
            Next.js 미들웨어 질문입니다
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            미들웨어에서 쿠키를 읽는 방법이 잘 안 되는데 도움 부탁드립니다...
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>작성자: 이개발</span>
            <span>2024.01.14</span>
            <span>답변 1개</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          새 질문 작성하기
        </button>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  return (
    <AuthGuard>
      <CommunityContent />
    </AuthGuard>
  )
}
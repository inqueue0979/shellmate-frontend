'use client'

import AuthGuard from '@/components/AuthGuard'
import { useAuth } from '@/contexts/AuthContext'
import { Search, Filter, User, MessageSquare, Calendar, TrendingUp, Star } from 'lucide-react'
import Image from 'next/image'

// 왼쪽 사이드바 - 검색 및 필터
function LeftSidebar() {
  return (
    <div className="space-y-6">
      {/* 검색어 입력 */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-semibold text-gray-900 mb-3">검색</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 검색 조건 */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          검색 조건
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
            <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>전체</option>
              <option>질문</option>
              <option>정보 공유</option>
              <option>자유게시판</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">기간</label>
            <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>전체</option>
              <option>오늘</option>
              <option>일주일</option>
              <option>한달</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">정렬</label>
            <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>최신순</option>
              <option>인기순</option>
              <option>답변순</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

// 중앙 메인 콘텐츠
function MainContent() {
  const dummyPosts = [
    {
      id: 1,
      title: "React Hook Form 사용법이 궁금해요",
      content: "React Hook Form을 처음 사용해보는데, 기본적인 사용법을 알고 싶습니다...",
      author: "김학습",
      date: "2024.01.15",
      replies: 3,
      likes: 12
    },
    {
      id: 2,
      title: "Next.js 미들웨어 질문입니다",
      content: "미들웨어에서 쿠키를 읽는 방법이 잘 안 되는데 도움 부탁드립니다...",
      author: "이개발",
      date: "2024.01.14",
      replies: 1,
      likes: 8
    },
    {
      id: 3,
      title: "TypeScript에서 제네릭 활용 방법",
      content: "제네릭을 어떻게 활용하면 좋을지 궁금합니다. 실무에서 많이 사용하나요?",
      author: "박타입",
      date: "2024.01.13",
      replies: 5,
      likes: 15
    }
  ]

  return (
    <div className="space-y-6">
      {/* 공지사항 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            공지 및 안내사항
        </h2>
        <div className="space-y-2">
          <div className="text-blue-700 text-sm p-2 bg-blue-100 rounded">
            📢 커뮤니티 이용 규칙을 준수해 주세요
          </div>
          <div className="text-blue-700 text-sm p-2 bg-blue-100 rounded">
            🎉 새로운 질문 답변 이벤트가 진행중입니다
          </div>
        </div>
      </div>

      {/* 오늘의 베스트 글 */}
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
          베스트 질문
        </h2>
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-1 flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            React 성능 최적화 완벽 가이드
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            React 애플리케이션의 성능을 향상시키는 다양한 방법들을 정리해봤습니다...
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>작성자: 성능킹</span>
            <span>👍 42</span>
            <span>💬 18</span>
          </div>
        </div>
      </div>

      {/* 글 목록 */}
      <div className="bg-white border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            질문 목록
          </h2>
        </div>

        <div className="divide-y">
          {dummyPosts.map((post) => (
            <div key={post.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{post.content}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {post.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {post.date}
                </span>
                <span className="flex items-center">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  답변 {post.replies}개
                </span>
                <span className="flex items-center">
                  👍 {post.likes}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 text-center border-t">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            새 글 작성하기
          </button>
        </div>
      </div>
    </div>
  )
}

// 오른쪽 사이드바 - 프로필 및 최근 글
function RightSidebar() {
  const { user } = useAuth()

  const recentPosts = [
    { title: "React Hooks 질문", date: "01.14", replies: 2 },
    { title: "CSS Grid 문의", date: "01.12", replies: 0 },
    { title: "JavaScript 비동기", date: "01.10", replies: 1 }
  ]

  return (
    <div className="space-y-6">
      {/* 내 프로필 */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">내 프로필</h3>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            {user?.profile_image ? (
              <Image
                src={user.profile_image}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
                width={128}
                height={128}
              />
            ) : (
              <User className="w-6 h-6 text-gray-600" />
            )}
          </div>
          <div className="ml-3">
            <h4 className="font-medium text-gray-900">{user?.name || user?.email}</h4>
            <p className="text-sm text-gray-500">{user?.user_type_display}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg font-semibold text-gray-900">12</div>
            <div className="text-xs text-gray-500">작성한 글</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg font-semibold text-gray-900">8</div>
            <div className="text-xs text-gray-500">받은 좋아요</div>
          </div>
        </div>
        
        {/* 최근 작성 글 */}
        <h3 className="font-semibold text-sm text-gray-600 mb-3 mt-6">최근 작성 글</h3>
        <div className="space-y-3">
          {recentPosts.map((post, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <h4 className="text-sm font-medium text-gray-900 mb-1">{post.title}</h4>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.date}</span>
                <span>답변 {post.replies}개</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CommunityContent() {
  return (
    <div className="py-8">

      {/* 1:2:1 비율의 그리드 레이아웃 */}
      <div className="grid grid-cols-4 gap-6 h-screen">
        {/* 왼쪽 사이드바 (1) - 고정 */}
        <div className="col-span-1 sticky top-28 self-start h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                전문가 QnA 커뮤니티
                </h1>
            </div>
          <LeftSidebar />
        </div>

        {/* 중앙 메인 콘텐츠 (2) - 스크롤 가능 */}
        <div className="col-span-2">
          <MainContent />
        </div>

        {/* 오른쪽 사이드바 (1) - 고정 */}
        <div className="col-span-1 sticky top-28 self-start h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
          <RightSidebar />
        </div>
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
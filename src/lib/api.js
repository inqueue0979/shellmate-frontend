import { getAccessToken, refreshAccessToken, clearTokens } from './auth'

/**
 * API 기본 설정
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

/**
 * API 응답 에러 클래스
 */
class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

/**
 * 토큰이 포함된 API 요청을 보내는 함수
 *
 * @param {string} endpoint - API 엔드포인트 (예: '/auth/login')
 * @param {Object} options - fetch 옵션
 * @returns {Promise} - API 응답
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  // 기본 헤더 설정
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  // 토큰이 필요한 요청인지 확인 (로그인/회원가입 제외)
  const isAuthRequired = !endpoint.includes('/auth/login/') &&
                        !endpoint.includes('/auth/signup/') &&
                        !endpoint.includes('/auth/token/refresh/')

  if (isAuthRequired) {
    const token = getAccessToken()
    if (token && token !== 'undefined') {
      defaultHeaders.Authorization = `Bearer ${token}`
    }
  }

  // 요청 옵션 병합
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    // 401 에러 (토큰 만료)인 경우 토큰 갱신 시도
    if (response.status === 401 && isAuthRequired) {
      const newToken = await refreshAccessToken()
      if (newToken) {
        // 새 토큰으로 재요청
        config.headers.Authorization = `Bearer ${newToken}`
        const retryResponse = await fetch(url, config)
        return handleResponse(retryResponse)
      } else {
        // 토큰 갱신 실패시 로그아웃 처리
        clearTokens()
        throw new ApiError('인증이 만료되었습니다. 다시 로그인해주세요.', 401)
      }
    }

    return handleResponse(response)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    throw new ApiError('네트워크 오류가 발생했습니다.', 0, error)
  }
}

/**
 * 응답 처리 함수
 */
async function handleResponse(response) {
  const contentType = response.headers.get('content-type')

  let data
  if (contentType && contentType.includes('application/json')) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  if (!response.ok) {
    throw new ApiError(
      data.message || data.error || `HTTP ${response.status}`,
      response.status,
      data
    )
  }

  return data
}

/**
 * 편의 함수들
 */

// GET 요청
export const get = (endpoint, options = {}) =>
  apiRequest(endpoint, { ...options, method: 'GET' })

// POST 요청
export const post = (endpoint, data, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  })

// PUT 요청
export const put = (endpoint, data, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  })

// DELETE 요청
export const del = (endpoint, options = {}) =>
  apiRequest(endpoint, { ...options, method: 'DELETE' })

/**
 * 인증 관련 API 함수들
 */

// 로그인
export const loginApi = (email, password) =>
  post('/auth/login/', { email, password })

// 로그아웃
export const logoutApi = () =>
  post('/auth/logout/')

// 사용자 정보 조회
export const getMeApi = () =>
  get('/user/me/')

// 토큰 갱신
export const refreshTokenApi = () =>
  post('/auth/token/refresh/')

// 회원가입
export const signupApi = (userData) =>
  post('/auth/signup/', userData)

/**
 * 기타 API 함수들 (예시)
 */

// 커뮤니티 게시글 목록
export const getCommunityPosts = () =>
  get('/community/posts/')

// 칼럼 목록
export const getColumns = () =>
  get('/columns/')

// 상담 예약
export const createConsultation = (data) =>
  post('/consultations/', data)
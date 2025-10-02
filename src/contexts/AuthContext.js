'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  getAccessToken,
  setTokens,
  clearTokens,
  refreshAccessToken,
  isTokenExpired
} from '@/lib/auth'
import { loginApi, logoutApi, getMeApi } from '@/lib/api'

/**
 * 인증 컨텍스트 생성
 *
 * 이 컨텍스트는 앱 전체에서 다음과 같은 정보를 공유합니다:
 * - user: 현재 로그인한 사용자 정보
 * - loading: 로그인 상태를 확인 중인지 여부
 * - login: 로그인 함수
 * - logout: 로그아웃 함수
 */
const AuthContext = createContext({})

/**
 * 인증 상태를 관리하는 Provider 컴포넌트
 *
 * 역할:
 * 1. 사용자 로그인 상태 관리
 * 2. 토큰 자동 갱신
 * 3. 로그인/로그아웃 기능 제공
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)           // 사용자 정보
  const [loading, setLoading] = useState(true)     // 로딩 상태

  /**
   * 사용자 정보를 서버에서 가져오는 함수
   * accessToken이 있을 때 사용자 프로필을 조회합니다
   */
  const fetchUser = useCallback(async () => {
    try {
      const userData = await getMeApi()
      setUser(userData)
      return userData
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error)
      setUser(null)
      clearTokens()
      return null
    }
  }, [])

  /**
   * 토큰 유효성 검사 및 자동 갱신
   */
  const validateAndRefreshToken = useCallback(async () => {
    const token = getAccessToken()

    if (!token) {
      setLoading(false)
      return
    }

    // 토큰이 만료되었는지 확인
    if (isTokenExpired(token)) {
      console.log('토큰 만료됨, 갱신 시도...')
      const newToken = await refreshAccessToken()

      if (newToken) {
        await fetchUser()
      } else {
        console.log('토큰 갱신 실패, 로그아웃 처리')
        setUser(null)
        clearTokens()
      }
    } else {
      // 토큰이 유효하면 사용자 정보 조회
      await fetchUser()
    }

    setLoading(false)
  }, [fetchUser])

  /**
   * 로그인 함수
   *
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @returns {Object} { success: boolean, message: string }
   */
  const login = async (email, password) => {
    try {
      setLoading(true)

      const data = await loginApi(email, password)

      // 로그인 성공
      setTokens(data.access, data.refresh)
      const userData = await fetchUser()

      return {
        success: true,
        message: '로그인 성공',
        user: userData
      }
    } catch (error) {
      console.error('로그인 오류:', error)
      return {
        success: false,
        message: error.message || '로그인에 실패했습니다.'
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * 로그아웃 함수
   */
  const logout = async () => {
    try {
      // 서버에 로그아웃 요청 (refresh token 무효화)
      await logoutApi()
    } catch (error) {
      console.error('로그아웃 요청 실패:', error)
    } finally {
      // 클라이언트 측 토큰 정리
      setUser(null)
      clearTokens()
    }
  }

  /**
   * 컴포넌트 마운트 시 인증 상태 확인
   */
  useEffect(() => {
    validateAndRefreshToken()

    // 30분마다 토큰 유효성 검사 및 갱신
    const interval = setInterval(validateAndRefreshToken, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [validateAndRefreshToken])

  // Context 값 정의
  const value = {
    user,              // 현재 사용자 정보
    loading,           // 로딩 상태
    login,             // 로그인 함수
    logout,            // 로그아웃 함수
    isAuthenticated: !!user  // 로그인 여부 (boolean)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * 인증 컨텍스트를 사용하는 커스텀 훅
 *
 * 사용법:
 * const { user, login, logout, loading, isAuthenticated } = useAuth()
 */
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.')
  }

  return context
}
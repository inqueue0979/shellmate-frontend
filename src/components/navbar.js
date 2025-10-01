'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import ProfileDropdown from "@/components/ProfileDropdown"

export default function Navbar() {
  const { isAuthenticated, loading } = useAuth()

  return (
    <div className="w-full fixed top-0 left-0 z-50 p-4">
      <div className="w-full backdrop-blur-md bg-white/50 border border-gray-200 rounded-2xl">
        <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-600 transition-colors">
              shellmate
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/home" className={cn(navigationMenuTriggerStyle(), " bg-transparent text-base font-bold")}>
                    홈
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/community" className={cn(navigationMenuTriggerStyle(), " bg-transparent text-base font-bold")}>
                    커뮤니티
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/column" className={cn(navigationMenuTriggerStyle(), " bg-transparent text-base font-bold")}>
                    칼럼
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/consultation" className={cn(navigationMenuTriggerStyle(), " bg-transparent text-base font-bold")}>
                    상담 예약
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            {loading ? (
              // 로딩 중일 때
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              // 로그인된 상태
              <ProfileDropdown />
            ) : (
              // 로그인되지 않은 상태
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors">
                  로그인
                </Link>
                <Link href="/signup" className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
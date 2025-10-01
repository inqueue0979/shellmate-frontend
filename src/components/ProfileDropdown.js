'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { User, Settings, LogOut } from "lucide-react"
import Image from "next/image"

export default function ProfileDropdown() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  const handleProfileSettings = () => {
    // TODO: 프로필 설정 페이지로 이동
    console.log('프로필 설정 페이지로 이동')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors cursor-pointer">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          {user?.profile_image ? (
            <Image
              src={user.profile_image}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              width={128}
              height={128}
            />
          ) : (
            <User className="w-4 h-4 text-gray-600" />
          )}
        </div>
        <span className="text-sm text-gray-950 font-medium">
          {user?.name || user?.email}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileSettings} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>프로필 설정</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>로그아웃</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Navbar() {
  return (
    <div className="w-full border-b">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-600 transition-colors">
            shellmate
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/community" className={cn(navigationMenuTriggerStyle(), " text-base font-bold")}>
                  커뮤니티
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/column" className={cn(navigationMenuTriggerStyle(), " text-base font-bold")}>
                  칼럼
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/consultation" className={cn(navigationMenuTriggerStyle(), " text-base font-bold")}>
                  상담 예약
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
            로그인
          </Link>
          <Link href="/signup" className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  )
}
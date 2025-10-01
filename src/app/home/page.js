'use client'

import AuthGuard from '@/components/AuthGuard'
import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <AuthGuard>
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                {user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-gray-600 text-xl font-bold">
                    {user?.name?.charAt(0) || user?.email?.charAt(0)}
                  </span>
                )}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {user?.name || user?.nickname || user?.email}
                </h2>
                <p className="text-gray-600">
                  {user?.user_type_display}
                </p>
                {user?.email && (
                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">가입상태</p>
                  <p className="font-medium">{user?.signup_status_display}</p>
                </div>
                <div>
                  <p className="text-gray-600">가입방법</p>
                  <p className="font-medium">{user?.provider_display}</p>
                </div>
                {user?.phone_number && (
                  <div className="col-span-2">
                    <p className="text-gray-600">연락처</p>
                    <p className="font-medium">{user.phone_number}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
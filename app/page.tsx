"use client"

import { useEffect, useState } from "react"
import SplashScreen from "@/components/splash-screen"
import MainWindow from "@/components/main-window"
import LoginWidget from "@/components/login-widget"
import { useAuthStore } from "@/store/useAuthStore"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  // Forma corrigida de usar o Zustand para evitar loops infinitos
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  
  // Não vamos chamar useDevice() diretamente aqui para evitar loops
  
  useEffect(() => {
    // Simular o tempo de splash screen
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (user: any) => {
    // O login agora é tratado pelo useAuthStore dentro do componente de login
    // Não precisamos fazer nada aqui pois o estado é gerenciado pelo Zustand
  }

  const handleLogout = () => {
    logout()
  }

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <main className="min-h-screen">
      {isAuthenticated && user ? (
        <MainWindow currentUser={user} onLogout={handleLogout} />
      ) : (
        <LoginWidget onLoginSuccess={handleLogin} />
      )}
    </main>
  )
}

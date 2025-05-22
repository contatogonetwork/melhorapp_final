"use client"

import { useEffect, useState } from "react"
import SplashScreen from "@/components/splash-screen"
import MainWindow from "@/components/main-window"
import LoginWidget from "@/components/login-widget"
import { useAuthStore } from "@/store/useAuthStore"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  // Forma corrigida de usar o Zustand para evitar loops infinitos
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const logout = useAuthStore((state) => state.logout)
  const isMobile = useMobile()
  
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
        <>
          <LoginWidget onLoginSuccess={handleLogin} />
          <div className={`fixed ${isMobile ? 'bottom-4 left-4 right-4 flex justify-between' : 'bottom-4 right-4 flex gap-2'}`}>
            <a 
              href="/tema" 
              className={`text-xs bg-dracula-purple hover:bg-dracula-purple/90 text-white ${isMobile ? 'flex-1 mr-2 text-center' : 'px-4 py-2'} rounded-md transition-all shadow-dracula`}
            >
              Demo do Tema
            </a>
            <a 
              href="/exemplo" 
              className={`text-xs bg-dracula-cyan hover:bg-dracula-cyan/90 text-black ${isMobile ? 'flex-1 text-center' : 'px-4 py-2'} rounded-md transition-all shadow-dracula`}
            >
              Exemplo
            </a>
          </div>
        </>
      )}
    </main>
  )
}

import { AnimatePresence } from "framer-motion"
import React, { useEffect } from "react"
import { Routes, Route, useLocation } from 'react-router-dom'
import IsAuthenticated from "./authorization/IsAuthorized"
import MainLayout from "./Layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import Error from "./pages/Error"
import Home from "./pages/Home"
import UserAuthLayout from "./Layouts/UserAuthLayout"
import SignInUp from "./pages/Account/SignInUp"
import PasswordReset from "./pages/Account/PasswordReset"
import EmailVerification from "./pages/Account/EmailVerification"

const App: React.FC = () => {
    const location = useLocation()

    return (
        <AnimatePresence initial={false} exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='account' element={<UserAuthLayout />}>
                        <Route index element={<SignInUp />} />
                        <Route path='email-verification' element={<EmailVerification />} />
                        <Route path='reset-password' element={<PasswordReset />} />

                        {/* Authenticated */}
                        <Route element={<IsAuthenticated />} >
                            <Route path='dashboard' element={<Dashboard />} />
                        </Route>
                    </Route>
                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default App
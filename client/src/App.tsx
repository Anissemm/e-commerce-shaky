import { AnimatePresence } from "framer-motion"
import React from "react"
import { Routes, Route, useLocation } from 'react-router-dom'
import IsAuthenticated from "./Authorization/IsAuthorized"
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
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='account' element={<UserAuthLayout />}>
                        <Route index element={<SignInUp />} />
                        <Route path='email-verification' element={<EmailVerification />} />
                        <Route path='password-reset' element={<PasswordReset />} />
                        <Route path='dashboard' element={
                            <IsAuthenticated>
                                <Dashboard />
                            </IsAuthenticated>}
                        />
                    </Route>
                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default App
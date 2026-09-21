import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import SectionBand from './components/layout/SectionBand'
import AdminLayout from './admin/layouts/AdminLayout'
import DashboardPage from './admin/pages/DashboardPage'
import LoginPage from './admin/pages/LoginPage'
import ProtectedRoute from './admin/routes/ProtectedRoute'
import BoutiquePage from './pages/BoutiquePage'
import DidascalieTVPage from './pages/DidascalieTVPage'
import VideoPage from './pages/VideoPage'

import {
  Hero,
  LePere,
  PrayerLibrary,
  Teachings,
  DidascalieTV,
  Agenda,
  Shop,
  Gallery,
  Donate,
  Contact,
} from './components/sections'

/** Public site composition, kept separate from the administration layout. */
function PublicSite() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <>
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <Hero />
      <SectionBand />
      <LePere />
      <SectionBand />
      <PrayerLibrary />
      <SectionBand />
      <Teachings />
      <SectionBand />
      <DidascalieTV />
      <SectionBand />
      <Agenda />
      <SectionBand />
      <Shop />
      <SectionBand />
      <Gallery />
      <SectionBand />
      <Donate />
      <SectionBand />
      <Contact />
      <Footer />
    </>
  )
}

/** Root router for the public site and protected administration area. */
export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Route>
      </Route>
      <Route path="/boutique" element={<BoutiquePage />} />
      <Route path="/didascalie-tv" element={<DidascalieTVPage />} />
      <Route path="/didascalie-tv/:videoId" element={<VideoPage />} />
      <Route path="*" element={<PublicSite />} />
    </Routes>
  )
}

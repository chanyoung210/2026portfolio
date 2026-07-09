import { LenisProvider } from './lib/LenisProvider'
import CustomCursor from './components/CustomCursor/CustomCursor'
import GNB from './components/GNB/GNB'
import Hero from './components/Hero/Hero'
import Motto from './components/Motto/Motto'
import Portfolio from './components/Portfolio/Portfolio'
import WhatIDo from './components/WhatIDo/WhatIDo'
import AboutMe from './components/AboutMe/AboutMe'
import Footer from './components/Footer/Footer'
import ScrollTopButton from './components/ScrollTopButton/ScrollTopButton'

function App() {
  return (
    <LenisProvider>
      <CustomCursor />
      <GNB />
      <main>
        <Hero companyName="Aladin" />
        <Motto />
        <Portfolio />
        <WhatIDo />
        <AboutMe />
      </main>
      <Footer />
      <ScrollTopButton />
    </LenisProvider>
  )
}

export default App

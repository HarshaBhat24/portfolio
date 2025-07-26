import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import CTFWriteups from '@/components/CTFWriteups'
import Hobbies from '@/components/Hobbies'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CTFWriteups />
      <Hobbies />
      <Contact />
    </>
  )
}

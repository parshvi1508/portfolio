import { Nav } from '@/components/nav/Nav'
import { Hero } from '@/components/hero/Hero'
import { Experience } from '@/components/experience/Experience'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { Achievements } from '@/components/achievements/Achievements'
import { Now } from '@/components/now/Now'
import { Education } from '@/components/education/Education'
import { Positions } from '@/components/positions/Positions'
import { Contact } from '@/components/contact/Contact'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <ProjectGrid />
        <Achievements />
        <Now />
        <Education />
        <Positions />
      </main>
      <Contact />
    </>
  )
}

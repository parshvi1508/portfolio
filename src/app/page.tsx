import { Nav } from '@/components/nav/Nav'
import { Hero } from '@/components/hero/Hero'
import { Achievements } from '@/components/achievements/Achievements'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { Experience } from '@/components/experience/Experience'
import { Education } from '@/components/education/Education'
import { Positions } from '@/components/positions/Positions'
import { Certifications } from '@/components/certifications/Certifications'
import { Now } from '@/components/now/Now'
import { Contact } from '@/components/contact/Contact'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Achievements />
        <ProjectGrid />
        <Experience />
        <Education />
        <Positions />
        <Certifications />
        <Now />
      </main>
      <Contact />
    </>
  )
}

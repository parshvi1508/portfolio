import { redirect } from 'next/navigation'

// No posts exist yet -- redirect to home.
// When MDX posts are added under /content/posts, render them here.
export default function WritingPage() {
  redirect('/')
}

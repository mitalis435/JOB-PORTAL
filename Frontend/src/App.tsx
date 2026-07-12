// import { Button } from "@/components/ui/button"

// function App() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 text-zinc-900">
//       <div className="text-center space-y-2">
//         <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
//           Job Portal Dashboard
//         </h1>
//         <p className="text-zinc-500 max-w-[500px]">
//           Your React 19, Vite, and Tailwind CSS v4 design system is fully operational.
//         </p>
//       </div>
      
//       <div className="flex gap-4">
//         <Button size="lg">Explore Jobs</Button>
//         <Button variant="outline" size="lg">Post a Job</Button>
//       </div>
//     </div>
//   )
// }

// export default App

import { Routes, Route, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

// 1. A quick layout wrapper so you don't repeat headers/footers across pages
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-primary">
          Briefcase<span className="text-muted-foreground font-light">Portal</span>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/explore">Find Jobs</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/post">Post Opening</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {children}
      </main>
    </div>
  )
}

// 2. Individual Screen Component Definitions
function WelcomeScreen() {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          Job Portal Dashboard
        </h1>
        <p className="text-muted-foreground max-w-[500px] mx-auto">
          Your React 19, Vite, and Tailwind CSS v4 design system is fully operational.
        </p>
      </div>
      
      <div className="flex gap-4 justify-center">
        {/* Notice the use of asChild to turn the Shadcn button cleanly into a routing link */}
        <Button size="lg" asChild>
          <Link to="/explore">Explore Jobs</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/post">Post a Job</Link>
        </Button>
      </div>
    </div>
  )
}

function ExploreJobs() {
  return (
    <div className="w-full max-w-4xl space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Available Positions</h2>
      <p className="text-muted-foreground">Dynamic job search feed will render here...</p>
    </div>
  )
}

function PostJob() {
  return (
    <div className="w-full max-w-xl space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Create a New Job Listing</h2>
      <p className="text-muted-foreground">Submission wizard form interface goes here...</p>
    </div>
  )
}

// 3. Main Application Routing Switchboard
function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/explore" element={<ExploreJobs />} />
        <Route path="/post" element={<PostJob />} />
      </Routes>
    </DashboardLayout>
  )
}

export default App
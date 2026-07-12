// import { StrictMode } from "react"
// import { createRoot } from "react-dom/client"

// import "./index.css"
// import App from "./App.tsx"
// import { ThemeProvider } from "@/components/theme-provider.tsx"

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <ThemeProvider>
//       <App />
//     </ThemeProvider>
//   </StrictMode>
// )


import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

// 1. Target the root element safely with non-null assertion
const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Failed to find the root element. Ensure index.html has a <div id=\"root\"></div> container.")
}

createRoot(rootElement).render(
  <StrictMode>
    {/* 2. BrowserRouter establishes global routing context for your React 19 application */}
    <BrowserRouter>
      {/* 3. ThemeProvider wraps the app tree to provide global dark-mode context */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
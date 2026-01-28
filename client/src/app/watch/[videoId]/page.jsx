"use client"

import { useParams } from "next/navigation"
import VideoPlayer from "@/components/video-player"
import ToolsPanel from "@/components/tools-panel"

export default function WatchPage() {
  const params = useParams()
  // Mock video URL for now - in real app, fetch from DB based on params.videoId
  const videoUrl = "https://www.youtube.com/watch?v=Get7rqXYwKc" 

  return (
    <div className="container py-6">
      <div className="grid gap-6 lg:grid-cols-12 lg:h-[calc(100vh-100px)]">
        {/* Left Pane: Video (roughly 60-65% on large screens) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <VideoPlayer url={videoUrl} />
          
          <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
             <h1 className="text-2xl font-bold">Introduction to React.js</h1>
             <p className="text-muted-foreground mt-2">
               Learn the basics of React components, state, and props in this comprehensive tutorial.
             </p>
          </div>
        </div>

        {/* Right Pane: Tools (roughly 35-40% on large screens) */}
        <div className="lg:col-span-4 h-full">
          <ToolsPanel />
        </div>
      </div>
    </div>
  )
}

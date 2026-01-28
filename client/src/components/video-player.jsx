"use client"

import ReactPlayer from "react-player"
import { Card } from "@/components/ui/card"

export default function VideoPlayer({ url }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border bg-black shadow-lg">
      <ReactPlayer 
        url={url} 
        width="100%" 
        height="100%" 
        controls={true}
        config={{
          youtube: {
            playerVars: { showinfo: 1 }
          }
        }}
      />
    </div>
  )
}

"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function ToolsPanel() {
  return (
    <Card className="h-full border-none shadow-none">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">Study Tools</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Tabs defaultValue="notes" className="h-full w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="cheatsheet">Sheet</TabsTrigger>
            <TabsTrigger value="mindmap">Map</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes" className="mt-4 h-[calc(100vh-250px)] overflow-y-auto rounded-md border p-4">
            <div className="prose prose-sm dark:prose-invert">
              <h3>Get Started</h3>
              <p className="text-muted-foreground">AI generated notes will appear here...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="cheatsheet" className="mt-4 h-[calc(100vh-250px)] rounded-md border p-4">
             <p className="text-muted-foreground">Cheat Sheet placeholder...</p>
          </TabsContent>
          
          <TabsContent value="mindmap" className="mt-4 h-[calc(100vh-250px)] rounded-md border p-4">
             <p className="text-muted-foreground">Mind Map placeholder...</p>
          </TabsContent>

          <TabsContent value="code" className="mt-4 h-[calc(100vh-250px)] rounded-md border p-4">
             <p className="text-muted-foreground">Code Editor placeholder...</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

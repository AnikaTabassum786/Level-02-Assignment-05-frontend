
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md border p-1 cursor-pointer">
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all group-data-[state=dark]:scale-0 group-data-[state=dark]:-rotate-90" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all group-data-[state=dark]:scale-100 group-data-[state=dark]:rotate-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
           Light
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
           Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle";
import { Briefcase, Code } from "lucide-react";
import type { StyleMode } from "@/lib/types";

interface StyleToggleProps {
  value: StyleMode;
  onValueChange: (value: StyleMode) => void;
}

export function StyleToggle({ value, onValueChange }: StyleToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(val) => {
        if (val === "CEO" || val === "ENTHUSIAST") {
          onValueChange(val);
        }
      }}
      className="bg-muted/50 p-1 rounded-lg"
    >
      <ToggleGroupItem
        value="CEO"
        aria-label="CEO Mode"
        className="data-[state=on]:bg-background data-[state=on]:shadow-sm"
      >
        <Briefcase className="mr-2 h-4 w-4" />
        CEO Mode
      </ToggleGroupItem>
      <ToggleGroupItem
        value="ENTHUSIAST"
        aria-label="Tech Enthusiast Mode"
        className="data-[state=on]:bg-background data-[state=on]:shadow-sm"
      >
        <Code className="mr-2 h-4 w-4" />
        Tech Enthusiast
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

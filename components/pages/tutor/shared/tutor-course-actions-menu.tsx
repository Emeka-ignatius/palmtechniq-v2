"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Edit,
  BarChart3,
  Copy,
  Share2,
  Archive,
  Trash,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function TutorCourseActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white/70 hover:bg-white/10">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-background border-white/10">
        <DropdownMenuItem>
          <Eye className="w-4 h-4 mr-2" /> Preview
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="w-4 h-4 mr-2" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BarChart3 className="w-4 h-4 mr-2" /> Analytics
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="w-4 h-4 mr-2" /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2 className="w-4 h-4 mr-2" /> Share
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Archive className="w-4 h-4 mr-2" /> Archive
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">
          <Trash className="w-4 h-4 mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EditJobDialog } from "./EditJobDialog";
import { BoostJobDialog } from "./BoostJobDialog";
import { Eye, Trash, List } from "lucide-react";
import { JobPost } from "@/hooks/use-job-posts";

interface JobListingsActionsProps {
  job: JobPost;
  onViewApplicants: (jobId: string) => void;
  onDelete: (job: JobPost) => void;
}

export const JobListingsActions = ({ job, onViewApplicants, onDelete }: JobListingsActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <BoostJobDialog job={job} />
      <EditJobDialog job={job} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <List className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onViewApplicants(job.id)}>
            <Eye className="mr-2 h-4 w-4" />
            View Applicants
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-red-600"
            onClick={() => onDelete(job)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

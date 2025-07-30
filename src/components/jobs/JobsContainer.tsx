
import { useState } from "react";
import { toast } from "sonner";
import { JobApplicationDialog } from "@/components/jobseeker/JobApplicationDialog";
import { useJobApplications } from "@/hooks/use-job-applications";
import { useWishlist } from "@/hooks/use-wishlist";
import { useAuth } from "@/hooks/use-auth";
import { JobsHeader } from "./JobsHeader";
import { JobsSearchBar } from "./JobsSearchBar";
import { JobsFilters } from "./JobsFilters";
import { JobsList } from "./JobsList";
import { useJobsFilter } from "@/hooks/use-jobs-filter";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  matchScore: number;
  skills: string[];
  description: string;
  experienceLevel?: string;
}

interface JobsContainerProps {
  jobs: Job[];
}

export const JobsContainer = ({ jobs }: JobsContainerProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  
  const { isJobSeeker, isFreelancer } = useAuth();
  
  // Allow both job seekers and freelancers to view and apply for jobs
  const canApplyForJobs = isJobSeeker() || isFreelancer();
  
  const { getApplicationForJob } = canApplyForJobs 
    ? useJobApplications() 
    : { getApplicationForJob: () => null };
    
  const { addToWishlist, removeFromWishlist, isJobInWishlist } = useWishlist();
  
  const {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    salaryRange,
    setSalaryRange,
    selectedSkills,
    setSelectedSkills,
    locationFilters,
    setLocationFilters,
    jobTypeFilters,
    setJobTypeFilters,
    filtersVisible,
    setFiltersVisible,
    filteredJobs,
    activeFiltersCount,
    resetFilters
  } = useJobsFilter(jobs);
  
  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setApplicationDialogOpen(true);
  };

  const handleSaveJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    if (isJobInWishlist(jobId)) {
      removeFromWishlist(jobId);
    } else {
      addToWishlist(job);
    }
  };

  const isJobApplied = (jobId: string) => {
    return !!getApplicationForJob(jobId);
  };

  const isJobSaved = (jobId: string) => {
    return isJobInWishlist(jobId);
  };

  return (
    <>
      <JobsHeader />
      
      <JobsSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filtersVisible={filtersVisible}
        setFiltersVisible={setFiltersVisible}
        activeFiltersCount={activeFiltersCount}
        locationFilters={locationFilters}
        setLocationFilters={setLocationFilters}
        jobTypeFilters={jobTypeFilters}
        setJobTypeFilters={setJobTypeFilters}
      />
      
      {filtersVisible && (
        <div className="animate-fade-in">
          <JobsFilters
            filter={filter}
            setFilter={setFilter}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            resetFilters={resetFilters}
          />
        </div>
      )}
      
      <JobsList
        jobs={filteredJobs}
        isJobApplied={isJobApplied}
        isJobSaved={isJobSaved}
        onApply={handleApply}
        onSave={handleSaveJob}
      />

      <JobApplicationDialog
        job={selectedJob}
        open={applicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
      />
    </>
  );
};

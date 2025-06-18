
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Briefcase, TrendingUp } from "lucide-react";

interface JobListingsFiltersProps {
  searchTerm: string;
  filters: any;
  onSearch: (value: string) => void;
  onJobTypeFilter: (type: string) => void;
  onDateRangeFilter: (days: string) => void;
  onBoostedFilter: (boostedOnly: boolean) => void;
}

export const JobListingsFilters = ({
  searchTerm,
  filters,
  onSearch,
  onJobTypeFilter,
  onDateRangeFilter,
  onBoostedFilter,
}: JobListingsFiltersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search & Filter Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search jobs by title, location, or description..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          
          {/* Filter Controls */}
          <div className="flex gap-3">
            <Select onValueChange={onJobTypeFilter} defaultValue="all">
              <SelectTrigger className="w-40">
                <Briefcase className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={onDateRangeFilter} defaultValue="all">
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date Posted" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant={filters.boostedOnly ? "default" : "outline"}
              onClick={() => onBoostedFilter(!filters.boostedOnly)}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Boosted Only
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import { Card, CardContent } from "@/components/ui/card";

interface JobListingsStatsProps {
  stats: {
    total: number;
    boosted: number;
    active: number;
    totalApplicants: number;
    totalViews: number;
  };
}

export const JobListingsStats = ({ stats }: JobListingsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-sm text-gray-600">Total Jobs</div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="text-2xl font-bold text-green-600">{stats.boosted}</div>
        <div className="text-sm text-gray-600">Boosted Jobs</div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="text-2xl font-bold text-purple-600">{stats.totalApplicants}</div>
        <div className="text-sm text-gray-600">Total Applicants</div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="text-2xl font-bold text-orange-600">{stats.totalViews}</div>
        <div className="text-sm text-gray-600">Total Views</div>
      </div>
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="text-2xl font-bold text-red-600">
          {stats.totalViews > 0 ? ((stats.totalApplicants / stats.totalViews) * 100).toFixed(1) : 0}%
        </div>
        <div className="text-sm text-gray-600">Conversion Rate</div>
      </div>
    </div>
  );
};

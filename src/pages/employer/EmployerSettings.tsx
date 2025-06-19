
import DashboardLayout from "@/components/admin/DashboardLayout";
import { EmployerSettingsProvider } from "@/hooks/use-employer-settings";
import { EmployerSettingsContent } from "@/components/employer/settings/EmployerSettingsContent";

const EmployerSettings = () => {
  return (
    <DashboardLayout title="Employer Settings" role="employer">
      <EmployerSettingsProvider>
        <EmployerSettingsContent />
      </EmployerSettingsProvider>
    </DashboardLayout>
  );
};

export default EmployerSettings;

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormSettings from "../_components/form-settings";

const SettingsPage = () => {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <FormSettings />
      </CardContent>
    </Card>
  );
};

export default SettingsPage;

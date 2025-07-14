
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useFreelancers } from "@/hooks/use-freelancers";
import { useToast } from "@/hooks/use-toast";
import { FreelancerProfile } from "@/types/freelancer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Eye, Edit, Trash2, Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminFreelancers = () => {
  const { toast } = useToast();
  const { freelancers, updateFreelancer, deleteFreelancer, isLoading } = useFreelancers();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFreelancer, setSelectedFreelancer] = useState<FreelancerProfile | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredFreelancers = freelancers.filter((freelancer) =>
    freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    freelancer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    freelancer.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewClick = (freelancer: FreelancerProfile) => {
    setSelectedFreelancer(freelancer);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (freelancer: FreelancerProfile) => {
    setSelectedFreelancer(freelancer);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteFreelancer = async () => {
    if (!selectedFreelancer?.id) return;
    
    const success = await deleteFreelancer(selectedFreelancer.id);
    if (success) {
      setIsDeleteDialogOpen(false);
      toast({
        title: "Success",
        description: "Freelancer deleted successfully",
      });
    }
  };

  const handleToggleStatus = async (freelancer: FreelancerProfile) => {
    const success = await updateFreelancer(freelancer.id, { isActive: !freelancer.isActive });
    if (success) {
      toast({
        title: "Success",
        description: `Freelancer ${freelancer.isActive ? 'deactivated' : 'activated'}`,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Freelancer Management</h1>
            <p className="text-muted-foreground">
              Manage freelancer profiles, portfolios, and services
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search freelancers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFreelancers.map((freelancer) => (
            <Card key={freelancer.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={freelancer.profileImage} />
                    <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{freelancer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground truncate">{freelancer.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{freelancer.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({freelancer.completedProjects} projects)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {freelancer.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {freelancer.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{freelancer.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant={freelancer.isActive ? "default" : "secondary"}>
                      {freelancer.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(freelancer)}
                      >
                        {freelancer.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewClick(freelancer)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(freelancer)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Freelancer Profile Details</DialogTitle>
            </DialogHeader>
            {selectedFreelancer && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedFreelancer.profileImage} />
                    <AvatarFallback>{selectedFreelancer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedFreelancer.name}</h3>
                    <p className="text-muted-foreground">{selectedFreelancer.title}</p>
                    <p className="text-sm text-muted-foreground">{selectedFreelancer.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{selectedFreelancer.rating}</span>
                      <span className="text-muted-foreground">
                        ({selectedFreelancer.completedProjects} projects completed)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedFreelancer.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFreelancer.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Portfolio ({selectedFreelancer.portfolio.length} items)</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedFreelancer.portfolio.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />
                          <h5 className="font-medium">{item.title}</h5>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Pricing Tiers</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    {selectedFreelancer.pricing.map((tier) => (
                      <Card key={tier.id}>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <Badge className="mb-2 capitalize">{tier.tier}</Badge>
                            <h5 className="font-medium">{tier.title}</h5>
                            <div className="text-2xl font-bold my-2">${tier.price}</div>
                            <p className="text-sm text-muted-foreground mb-3">{tier.description}</p>
                            <div className="text-xs space-y-1">
                              <div>Delivery: {tier.deliveryDays} days</div>
                              <div>Revisions: {tier.revisions}</div>
                              <ul className="mt-2 space-y-1">
                                {tier.features.map((feature, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <div className="h-1 w-1 bg-green-500 rounded-full" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the freelancer profile
                and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteFreelancer}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminFreelancers;

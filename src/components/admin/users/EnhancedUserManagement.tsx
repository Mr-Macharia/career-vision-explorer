
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { useRealtimeSync } from "@/hooks/use-realtime-sync";
import { useAuth } from "@/hooks/use-auth";
import { 
  Users, 
  UserCheck, 
  UserX, 
  MessageSquare, 
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Mail
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending' | 'banned';
  joinDate: string;
  lastActive: string;
  profileComplete: number;
}

export const EnhancedUserManagement = () => {
  const { triggerAdminUpdate, isConnected } = useRealtimeSync();
  const { impersonateUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock user data - in real app this would come from API
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      role: "jobseeker",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      profileComplete: 85
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "employer",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19",
      profileComplete: 100
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike@example.com",
      role: "jobseeker",
      status: "pending",
      joinDate: "2024-01-18",
      lastActive: "2024-01-18",
      profileComplete: 45
    }
  ]);

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    banned: users.filter(u => u.status === 'banned').length,
  };

  const handleUserAction = async (action: string, userId: string) => {
    console.log(`${action} user:`, userId);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      triggerAdminUpdate('user_update', { action, userId });
      
      toast.success("Action Completed", {
        description: `User ${action} successfully`,
      });
    } catch (error) {
      toast.error("Action Failed", {
        description: "Please try again",
      });
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedUsers.length === 0) {
      toast.error("No users selected");
      return;
    }

    console.log(`Bulk ${action}:`, selectedUsers);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      triggerAdminUpdate('user_update', { action: `bulk_${action}`, userIds: selectedUsers });
      
      toast.success("Bulk Action Completed", {
        description: `${action} applied to ${selectedUsers.length} users`,
      });
      
      setSelectedUsers([]);
    } catch (error) {
      toast.error("Bulk Action Failed", {
        description: "Please try again",
      });
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      banned: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.inactive}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-600">
            {isConnected ? 'Real-time sync active' : 'Sync disconnected'}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <UserX className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Banned</p>
                <p className="text-2xl font-bold text-red-600">{stats.banned}</p>
              </div>
              <Ban className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="banned">Banned</option>
              </select>
              
              <select 
                value={roleFilter} 
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Roles</option>
                <option value="jobseeker">Job Seekers</option>
                <option value="employer">Employers</option>
                <option value="admin">Admins</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-800">
                  {selectedUsers.length} users selected
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                    Activate
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('deactivate')}>
                    Deactivate
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction('message')}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map(u => u.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                    />
                  </th>
                  <th className="text-left p-2">User</th>
                  <th className="text-left p-2">Role</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Profile</th>
                  <th className="text-left p-2">Last Active</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <input 
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user.id]);
                          } else {
                            setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                          }
                        }}
                      />
                    </td>
                    <td className="p-2">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline">{user.role}</Badge>
                    </td>
                    <td className="p-2">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="p-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${user.profileComplete}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{user.profileComplete}%</span>
                    </td>
                    <td className="p-2 text-sm text-gray-600">
                      {user.lastActive}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => console.log('View user:', user.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => impersonateUser(user as any)}>
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleUserAction('message', user.id)}>
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>User Actions</DialogTitle>
                              <DialogDescription>
                                Choose an action for {user.name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-2">
                              <Button className="w-full justify-start" variant="outline" onClick={() => handleUserAction('edit', user.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </Button>
                              <Button className="w-full justify-start" variant="outline" onClick={() => handleUserAction('activate', user.id)}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activate User
                              </Button>
                              <Button className="w-full justify-start" variant="outline" onClick={() => handleUserAction('ban', user.id)}>
                                <Ban className="h-4 w-4 mr-2" />
                                Ban User
                              </Button>
                              <Button className="w-full justify-start" variant="destructive" onClick={() => handleUserAction('delete', user.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

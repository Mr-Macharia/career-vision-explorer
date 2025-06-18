
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Filter,
  FileText,
  Calendar
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  lastModified: string;
  views?: number;
}

interface ContentListProps {
  onEdit: (item: ContentItem) => void;
  onCreate: () => void;
}

export const ContentList = ({ onEdit, onCreate }: ContentListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - in real app this would come from API
  const contentItems: ContentItem[] = [
    {
      id: "1",
      title: "Homepage Hero Section",
      type: "hero",
      status: "published",
      author: "Admin User",
      lastModified: "2024-03-14",
      views: 1250
    },
    {
      id: "2", 
      title: "About Us Page",
      type: "page",
      status: "published",
      author: "Content Manager",
      lastModified: "2024-03-13",
      views: 890
    },
    {
      id: "3",
      title: "Career Tips Blog Post",
      type: "blog",
      status: "draft",
      author: "Writer",
      lastModified: "2024-03-12",
      views: 0
    },
    {
      id: "4",
      title: "FAQ Section",
      type: "faq",
      status: "published",
      author: "Support Team",
      lastModified: "2024-03-10",
      views: 567
    },
    {
      id: "5",
      title: "Contact Form Labels",
      type: "form",
      status: "archived",
      author: "Developer",
      lastModified: "2024-03-08",
      views: 234
    }
  ];

  const filteredItems = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "page":
      case "article":
      case "blog":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleDelete = (item: ContentItem) => {
    // In real app, this would call an API
    console.log("Delete content:", item.id);
  };

  const handleDuplicate = (item: ContentItem) => {
    // In real app, this would create a copy
    console.log("Duplicate content:", item.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-gray-600">Manage all your website content from one place</p>
        </div>
        <Button onClick={onCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Content
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search content by title or type..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Table */}
      <Card>
        <CardHeader>
          <CardTitle>Content Items ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[250px]">Title</TableHead>
                  <TableHead className="min-w-[120px]">Type</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[150px]">Author</TableHead>
                  <TableHead className="min-w-[120px]">Modified</TableHead>
                  <TableHead className="min-w-[100px]">Views</TableHead>
                  <TableHead className="min-w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(item.type)}
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500">ID: {item.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm">{item.author}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        {new Date(item.lastModified).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="text-sm">{item.views?.toLocaleString() || 'N/A'}</div>
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(item)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(item)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "Get started by creating your first piece of content"
                }
              </p>
              {(!searchTerm && statusFilter === "all") && (
                <Button onClick={onCreate} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Content
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

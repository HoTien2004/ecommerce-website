import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Helmet } from "react-helmet-async";
import { Search, Eye, Shield, Ban, UserCheck } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

const mockUsers = [
  { id: "1", name: "Nguyễn Văn A", email: "a@email.com", phone: "0912 345 678", role: "user", status: "active", orders: 5, createdAt: "2024-01-01" },
  { id: "2", name: "Trần Thị B", email: "b@email.com", phone: "0923 456 789", role: "user", status: "active", orders: 3, createdAt: "2024-01-05" },
  { id: "3", name: "Lê Văn C", email: "c@email.com", phone: "0934 567 890", role: "user", status: "banned", orders: 1, createdAt: "2024-01-10" },
  { id: "4", name: "Phạm Thị D", email: "d@email.com", phone: "0945 678 901", role: "moderator", status: "active", orders: 12, createdAt: "2023-12-15" },
  { id: "5", name: "Admin", email: "admin@apple.vn", phone: "0900 000 000", role: "admin", status: "active", orders: 0, createdAt: "2023-01-01" },
];

const roleColors: Record<string, string> = {
  admin: "bg-red-500",
  moderator: "bg-blue-500",
  user: "bg-gray-500",
};

const AdminUsers = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = mockUsers.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (userId: string, newRole: string) => {
    toast({ title: `Đã thay đổi quyền thành "${newRole}"` });
  };

  const handleToggleBan = (userId: string, currentStatus: string) => {
    const action = currentStatus === "banned" ? "mở khóa" : "khóa";
    toast({ title: `Đã ${action} tài khoản` });
  };

  return (
    <>
      <Helmet>
        <title>Quản lý người dùng - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Người dùng</h1>
          <p className="text-muted-foreground">{mockUsers.length} người dùng</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo tên hoặc email..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Điện thoại</TableHead>
                    <TableHead className="text-center">Đơn hàng</TableHead>
                    <TableHead className="text-center">Vai trò</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell className="text-center">{user.orders}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={roleColors[user.role]}>{user.role}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={user.status === "active" ? "outline" : "destructive"}>
                          {user.status === "active" ? "Hoạt động" : "Đã khóa"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-background">
                              <DialogHeader>
                                <DialogTitle>Chi tiết người dùng</DialogTitle>
                              </DialogHeader>
                              {selectedUser && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Họ tên</p>
                                      <p className="font-medium">{selectedUser.name}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Email</p>
                                      <p className="font-medium">{selectedUser.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Điện thoại</p>
                                      <p className="font-medium">{selectedUser.phone}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Ngày đăng ký</p>
                                      <p className="font-medium">{new Date(selectedUser.createdAt).toLocaleDateString("vi-VN")}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-2">Phân quyền</p>
                                    <Select 
                                      defaultValue={selectedUser.role}
                                      onValueChange={(v) => handleRoleChange(selectedUser.id, v)}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="moderator">Moderator</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleToggleBan(user.id, user.status)}
                          >
                            {user.status === "active" ? (
                              <Ban className="w-4 h-4 text-destructive" />
                            ) : (
                              <UserCheck className="w-4 h-4 text-green-500" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminUsers;

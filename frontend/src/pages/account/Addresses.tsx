import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { useToast } from "../../hooks/use-toast";
import { useAuth, type Address } from "../../contexts/AuthContext";
import { Plus, Edit, Trash2 } from "lucide-react";

const Addresses = () => {
  const { toast } = useToast();
  const { user, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();

  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    isDefault: false,
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      updateAddress(editingAddress.id, addressForm);
      toast({ title: "Cập nhật địa chỉ thành công" });
    } else {
      addAddress(addressForm);
      toast({ title: "Thêm địa chỉ thành công" });
    }
    setAddressDialogOpen(false);
    setEditingAddress(null);
    setAddressForm({ name: "", phone: "", address: "", city: "", district: "", ward: "", isDefault: false });
  };

  const openEditAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressForm({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      district: address.district,
      ward: address.ward,
      isDefault: address.isDefault,
    });
    setAddressDialogOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    deleteAddress(id);
    toast({ title: "Đã xóa địa chỉ" });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Sổ địa chỉ</CardTitle>
          <CardDescription>Quản lý địa chỉ giao hàng</CardDescription>
        </div>
        <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingAddress(null);
                setAddressForm({ name: "", phone: "", address: "", city: "", district: "", ward: "", isDefault: false });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm địa chỉ
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background">
            <DialogHeader>
              <DialogTitle>{editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Họ tên</Label>
                  <Input
                    value={addressForm.name}
                    onChange={(e) => setAddressForm((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Số điện thoại</Label>
                  <Input
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm((p) => ({ ...p, phone: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Địa chỉ</Label>
                <Input
                  value={addressForm.address}
                  onChange={(e) => setAddressForm((p) => ({ ...p, address: e.target.value }))}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tỉnh/Thành</Label>
                  <Input
                    value={addressForm.city}
                    onChange={(e) => setAddressForm((p) => ({ ...p, city: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phường/Xã</Label>
                  <Input
                    value={addressForm.ward}
                    onChange={(e) => setAddressForm((p) => ({ ...p, ward: e.target.value }))}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm((p) => ({ ...p, isDefault: e.target.checked }))}
                />
                <span className="text-sm">Đặt làm địa chỉ mặc định</span>
              </label>
              <Button type="submit" className="w-full">
                {editingAddress ? "Cập nhật" : "Thêm địa chỉ"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {user?.addresses.map((address) => (
            <div
              key={address.id}
              className={`p-4 border rounded-xl ${
                address.isDefault ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{address.name}</p>
                    {address.isDefault && <Badge variant="secondary">Mặc định</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{address.phone}</p>
                  <p className="text-sm mt-2">
                    {address.address}, {address.ward}, {address.city}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditAddress(address)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  {!address.isDefault && (
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
              {!address.isDefault && (
                <Button
                  variant="link"
                  className="p-0 h-auto mt-2 text-primary"
                  onClick={() => {
                    setDefaultAddress(address.id);
                    toast({ title: "Đã đặt làm địa chỉ mặc định" });
                  }}
                >
                  Đặt làm mặc định
                </Button>
              )}
            </div>
          ))}
          {(!user?.addresses || user.addresses.length === 0) && (
            <p className="text-muted-foreground text-center py-8">Chưa có địa chỉ nào</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Addresses;

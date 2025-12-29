import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Helmet } from "react-helmet-async";

const mockPayments = [
  { id: "PAY001", orderId: "ORD001", customer: "Nguyễn Văn A", amount: 25990000, method: "COD", status: "completed", date: "2024-01-15" },
  { id: "PAY002", orderId: "ORD002", customer: "Trần Thị B", amount: 45990000, method: "VNPay", status: "completed", date: "2024-01-14" },
  { id: "PAY003", orderId: "ORD003", customer: "Lê Văn C", amount: 8990000, method: "Momo", status: "pending", date: "2024-01-13" },
  { id: "PAY004", orderId: "ORD004", customer: "Phạm Thị D", amount: 12990000, method: "PayPal", status: "refunded", date: "2024-01-12" },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  completed: { label: "Hoàn thành", variant: "outline" },
  pending: { label: "Đang xử lý", variant: "secondary" },
  refunded: { label: "Hoàn tiền", variant: "destructive" },
};

const AdminPayments = () => (
  <>
    <Helmet><title>Giao dịch thanh toán - Admin</title></Helmet>
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">Giao dịch thanh toán</h1></div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã GD</TableHead>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Phương thức</TableHead>
                <TableHead className="text-right">Số tiền</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead>Ngày</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.id}</TableCell>
                  <TableCell>#{p.orderId}</TableCell>
                  <TableCell>{p.customer}</TableCell>
                  <TableCell>{p.method}</TableCell>
                  <TableCell className="text-right font-semibold">{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p.amount)}</TableCell>
                  <TableCell className="text-center"><Badge variant={statusMap[p.status].variant}>{statusMap[p.status].label}</Badge></TableCell>
                  <TableCell>{new Date(p.date).toLocaleDateString("vi-VN")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </>
);

export default AdminPayments;

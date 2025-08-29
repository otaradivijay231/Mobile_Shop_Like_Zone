import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Trash2,
  Calculator,
  FileText,
  Printer,
  Download,
  Search,
  ShoppingCart,
} from "lucide-react";

interface BillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

const products = [
  { id: "PRD-001", name: "iPhone 15 Pro", price: 99999, stock: 12 },
  { id: "PRD-002", name: "Samsung Galaxy S24", price: 79999, stock: 8 },
  { id: "PRD-003", name: "OnePlus 12", price: 64999, stock: 15 },
  { id: "PRD-004", name: "MacBook Air M3", price: 134900, stock: 3 },
  { id: "PRD-005", name: "AirPods Pro 2", price: 24900, stock: 25 },
];

export default function Billing() {
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [billType, setBillType] = useState<"gst" | "non-gst">("gst");
  const [discountPercent, setDiscountPercent] = useState(0);

  const addItem = () => {
    if (!selectedProduct) return;
    
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const existingItem = billItems.find(item => item.id === selectedProduct);
    if (existingItem) {
      setBillItems(billItems.map(item => 
        item.id === selectedProduct 
          ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.price }
          : item
      ));
    } else {
      setBillItems([...billItems, {
        id: selectedProduct,
        name: product.name,
        price: product.price,
        quantity,
        total: product.price * quantity
      }]);
    }
    
    setSelectedProduct("");
    setQuantity(1);
  };

  const removeItem = (id: string) => {
    setBillItems(billItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) return;
    setBillItems(billItems.map(item =>
      item.id === id 
        ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
        : item
    ));
  };

  const subtotal = billItems.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = billType === "gst" ? (taxableAmount * 18) / 100 : 0; // 18% GST
  const grandTotal = taxableAmount + gstAmount;

  const generateBill = () => {
    // This would typically save the bill and generate invoice
    console.log("Generating bill:", {
      customer: { name: customerName, phone: customerPhone },
      items: billItems,
      billType,
      subtotal,
      discount: discountAmount,
      gst: gstAmount,
      total: grandTotal
    });
    
    // Reset form
    setBillItems([]);
    setCustomerName("");
    setCustomerPhone("");
    setDiscountPercent(0);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing System</h1>
          <p className="text-muted-foreground">Create invoices with or without GST</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Recent Bills
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bill Creation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-shop-primary" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone Number</Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Bill Type</Label>
                <Tabs value={billType} onValueChange={(value) => setBillType(value as "gst" | "non-gst")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="gst">With GST</TabsTrigger>
                    <TabsTrigger value="non-gst">Without GST</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Add Products */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Add Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label>Select Product</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(product => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - ₹{product.price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-24 space-y-2">
                  <Label>Qty</Label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
                <Button onClick={addItem} className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bill Items */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Bill Items</CardTitle>
            </CardHeader>
            <CardContent>
              {billItems.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>₹{item.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell className="font-semibold">₹{item.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No items added yet. Start by selecting a product above.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bill Summary */}
        <div className="space-y-6">
          <Card className="shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-shop-primary" />
                Bill Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Discount (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                
                {discountPercent > 0 && (
                  <div className="flex justify-between text-shop-profit">
                    <span>Discount ({discountPercent}%):</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                {billType === "gst" && (
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{gstAmount.toLocaleString()}</span>
                  </div>
                )}

                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total:</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Button 
                  onClick={generateBill}
                  disabled={billItems.length === 0 || !customerName}
                  className="w-full bg-gradient-success"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Bill
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bill Type Info */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-sm">Bill Type Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                {billType === "gst" ? (
                  <>
                    <Badge variant="default" className="mb-2">GST Bill</Badge>
                    <p>• 18% GST will be added</p>
                    <p>• Tax invoice will be generated</p>
                    <p>• Required for business customers</p>
                  </>
                ) : (
                  <>
                    <Badge variant="secondary" className="mb-2">Regular Bill</Badge>
                    <p>• No GST charges</p>
                    <p>• Simple receipt format</p>
                    <p>• Suitable for retail customers</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
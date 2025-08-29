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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Package,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  Search,
  Filter,
  Warehouse,
} from "lucide-react";

const stockData = [
  {
    id: "PRD-001",
    name: "iPhone 15 Pro",
    sku: "APL-IP15P-128",
    currentStock: 12,
    minStock: 5,
    maxStock: 50,
    reorderLevel: 10,
    location: "A-001",
    lastUpdated: "2024-01-15",
    movements: [
      { type: "in", quantity: 20, date: "2024-01-10", reason: "Purchase" },
      { type: "out", quantity: 8, date: "2024-01-12", reason: "Sale" },
    ]
  },
  {
    id: "PRD-002", 
    name: "Samsung Galaxy S24",
    sku: "SAM-GS24-256",
    currentStock: 3,
    minStock: 5,
    maxStock: 40,
    reorderLevel: 8,
    location: "A-002",
    lastUpdated: "2024-01-14",
    movements: [
      { type: "in", quantity: 15, date: "2024-01-08", reason: "Purchase" },
      { type: "out", quantity: 12, date: "2024-01-14", reason: "Sale" },
    ]
  },
  {
    id: "PRD-003",
    name: "OnePlus 12",
    sku: "ONP-12-256",
    currentStock: 25,
    minStock: 10,
    maxStock: 60,
    reorderLevel: 15,
    location: "A-003",
    lastUpdated: "2024-01-13",
    movements: [
      { type: "in", quantity: 30, date: "2024-01-05", reason: "Purchase" },
      { type: "out", quantity: 5, date: "2024-01-13", reason: "Sale" },
    ]
  },
];

export default function Stock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isAdjustmentOpen, setIsAdjustmentOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [adjustmentType, setAdjustmentType] = useState<"in" | "out">("in");
  const [adjustmentQuantity, setAdjustmentQuantity] = useState(1);
  const [adjustmentReason, setAdjustmentReason] = useState("");

  const getStockStatus = (current: number, min: number, reorder: number) => {
    if (current === 0) return { status: "out", label: "Out of Stock", color: "destructive" };
    if (current <= min) return { status: "critical", label: "Critical", color: "destructive" };
    if (current <= reorder) return { status: "low", label: "Low Stock", color: "secondary" };
    return { status: "good", label: "Good", color: "default" };
  };

  const filteredStock = stockData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    
    const stockStatus = getStockStatus(item.currentStock, item.minStock, item.reorderLevel);
    return matchesSearch && stockStatus.status === selectedFilter;
  });

  const stockSummary = {
    total: stockData.length,
    outOfStock: stockData.filter(item => item.currentStock === 0).length,
    lowStock: stockData.filter(item => {
      const status = getStockStatus(item.currentStock, item.minStock, item.reorderLevel);
      return status.status === "low" || status.status === "critical";
    }).length,
    goodStock: stockData.filter(item => {
      const status = getStockStatus(item.currentStock, item.minStock, item.reorderLevel);
      return status.status === "good";
    }).length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stock Management</h1>
          <p className="text-muted-foreground">Monitor and manage your inventory levels</p>
        </div>
        
        <Dialog open={isAdjustmentOpen} onOpenChange={setIsAdjustmentOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all">
              <Package className="w-4 h-4 mr-2" />
              Stock Adjustment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Stock Adjustment</DialogTitle>
              <DialogDescription>
                Add or remove stock for inventory management.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="product">Select Product</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {stockData.map(item => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} (Current: {item.currentStock})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Adjustment Type</Label>
                  <Tabs value={adjustmentType} onValueChange={(value) => setAdjustmentType(value as "in" | "out")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="in" className="text-shop-profit">Stock In</TabsTrigger>
                      <TabsTrigger value="out" className="text-shop-loss">Stock Out</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={adjustmentQuantity}
                    onChange={(e) => setAdjustmentQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Select value={adjustmentReason} onValueChange={setAdjustmentReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">New Purchase</SelectItem>
                    <SelectItem value="return">Customer Return</SelectItem>
                    <SelectItem value="damaged">Damaged/Lost</SelectItem>
                    <SelectItem value="transfer">Store Transfer</SelectItem>
                    <SelectItem value="audit">Stock Audit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAdjustmentOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-success">Apply Adjustment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stock Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Warehouse className="w-8 h-8 text-shop-primary" />
              <div>
                <p className="text-2xl font-bold">{stockSummary.total}</p>
                <p className="text-sm text-muted-foreground">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-shop-profit" />
              <div>
                <p className="text-2xl font-bold">{stockSummary.goodStock}</p>
                <p className="text-sm text-muted-foreground">Good Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8 text-shop-pending" />
              <div>
                <p className="text-2xl font-bold">{stockSummary.lowStock}</p>
                <p className="text-sm text-muted-foreground">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingDown className="w-8 h-8 text-shop-loss" />
              <div>
                <p className="text-2xl font-bold">{stockSummary.outOfStock}</p>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Table */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <CardTitle className="text-lg">Stock Levels</CardTitle>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search stock..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="good">Good Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="out">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min Stock</TableHead>
                <TableHead>Reorder Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStock.map((item) => {
                const stockStatus = getStockStatus(item.currentStock, item.minStock, item.reorderLevel);
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <span className={`font-bold ${
                        item.currentStock <= item.minStock ? 'text-shop-loss' : 
                        item.currentStock <= item.reorderLevel ? 'text-shop-pending' : 
                        'text-foreground'
                      }`}>
                        {item.currentStock}
                      </span>
                    </TableCell>
                    <TableCell>{item.minStock}</TableCell>
                    <TableCell>{item.reorderLevel}</TableCell>
                    <TableCell>
                      <Badge variant={stockStatus.color as any}>
                        {stockStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-shop-profit">
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-shop-loss">
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
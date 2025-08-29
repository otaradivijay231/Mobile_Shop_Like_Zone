import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Users,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹2,45,890",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "shop-profit"
  },
  {
    title: "Products Sold",
    value: "1,245",
    change: "+8.2%", 
    trend: "up",
    icon: ShoppingCart,
    color: "shop-primary"
  },
  {
    title: "Total Products",
    value: "2,890",
    change: "+5.1%",
    trend: "up",
    icon: Package,
    color: "shop-secondary"
  },
  {
    title: "Low Stock Items",
    value: "23",
    change: "+3",
    trend: "warning",
    icon: AlertTriangle,
    color: "shop-pending"
  }
];

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", amount: "₹12,450", status: "completed", items: 3 },
  { id: "ORD-002", customer: "Jane Smith", amount: "₹8,900", status: "pending", items: 2 },
  { id: "ORD-003", customer: "Mike Johnson", amount: "₹15,670", status: "processing", items: 5 },
  { id: "ORD-004", customer: "Sarah Wilson", amount: "₹7,800", status: "completed", items: 1 },
];

const topProducts = [
  { name: "iPhone 15 Pro", sold: 45, revenue: "₹67,500", stock: 12 },
  { name: "Samsung Galaxy S24", sold: 38, revenue: "₹45,600", stock: 8 },
  { name: "OnePlus 12", sold: 32, revenue: "₹38,400", stock: 15 },
  { name: "Pixel 8", sold: 28, revenue: "₹33,600", stock: 6 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all">
          <BarChart3 className="w-4 h-4 mr-2" />
          View Reports
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card shadow-card hover:shadow-elevated transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 text-${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <Badge 
                  variant={stat.trend === "up" ? "default" : stat.trend === "warning" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{order.amount}</p>
                    <Badge 
                      variant={
                        order.status === "completed" ? "default" :
                        order.status === "pending" ? "secondary" : 
                        "outline"
                      }
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Top Selling Products</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full bg-gradient-${index % 2 === 0 ? 'primary' : 'success'} flex items-center justify-center text-white font-bold text-sm`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sold} sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{product.revenue}</p>
                    <p className={`text-sm ${product.stock < 10 ? 'text-shop-loss' : 'text-muted-foreground'}`}>
                      {product.stock} in stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
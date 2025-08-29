import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
} from "lucide-react";

const monthlyRevenue = [
  { month: "Jan", revenue: 185000, profit: 45000 },
  { month: "Feb", revenue: 220000, profit: 55000 },
  { month: "Mar", revenue: 195000, profit: 48000 },
  { month: "Apr", revenue: 245000, profit: 62000 },
  { month: "May", revenue: 280000, profit: 71000 },
  { month: "Jun", revenue: 325000, profit: 89000 },
];

const topCategories = [
  { name: "Smartphones", value: 65, color: "#3B82F6" },
  { name: "Laptops", value: 20, color: "#10B981" },
  { name: "Accessories", value: 12, color: "#8B5CF6" },
  { name: "Tablets", value: 3, color: "#F59E0B" },
];

const dailySales = [
  { day: "Mon", sales: 45 },
  { day: "Tue", sales: 52 },
  { day: "Wed", sales: 38 },
  { day: "Thu", sales: 61 },
  { day: "Fri", sales: 75 },
  { day: "Sat", sales: 89 },
  { day: "Sun", sales: 67 },
];

const profitMargins = [
  { product: "iPhone 15 Pro", margin: 15.5, sales: 245 },
  { product: "Samsung Galaxy S24", margin: 18.2, sales: 180 },
  { product: "OnePlus 12", margin: 22.1, sales: 156 },
  { product: "MacBook Air M3", margin: 12.8, sales: 89 },
  { product: "AirPods Pro 2", margin: 28.5, sales: 167 },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Business insights and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-foreground">₹3,25,000</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-shop-profit" />
                  <span className="text-shop-profit text-sm font-medium">+15.2%</span>
                </div>
              </div>
              <DollarSign className="w-10 h-10 text-shop-primary opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-foreground">1,247</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-shop-profit" />
                  <span className="text-shop-profit text-sm font-medium">+8.4%</span>
                </div>
              </div>
              <ShoppingCart className="w-10 h-10 text-shop-secondary opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Customers</p>
                <p className="text-3xl font-bold text-foreground">892</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-shop-profit" />
                  <span className="text-shop-profit text-sm font-medium">+12.1%</span>
                </div>
              </div>
              <Users className="w-10 h-10 text-shop-accent opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Average Order</p>
                <p className="text-3xl font-bold text-foreground">₹2,607</p>
                <div className="flex items-center space-x-1 mt-2">
                  <TrendingDown className="w-4 h-4 text-shop-loss" />
                  <span className="text-shop-loss text-sm font-medium">-2.3%</span>
                </div>
              </div>
              <Package className="w-10 h-10 text-shop-profit opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Revenue & Profit Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="revenue" fill="hsl(var(--shop-primary))" />
                <Bar dataKey="profit" fill="hsl(var(--shop-profit))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {topCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {topCategories.map((category) => (
                <div key={category.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm">{category.name}: {category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Sales */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Daily Sales (This Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySales}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--shop-secondary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--shop-secondary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Profit Margins */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Profit Margins by Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profitMargins.map((item, index) => (
                <div key={item.product} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-${index % 2 === 0 ? 'primary' : 'success'} flex items-center justify-center text-white font-bold text-sm`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.product}</p>
                      <p className="text-sm text-muted-foreground">{item.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={item.margin > 20 ? "default" : item.margin > 15 ? "secondary" : "outline"}
                      className="text-sm"
                    >
                      {item.margin}% margin
                    </Badge>
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
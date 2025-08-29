import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, TrendingUp, Calendar, Filter } from "lucide-react";

export default function Sales() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Management</h1>
          <p className="text-muted-foreground">Track and manage your sales orders</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow">
          <ShoppingCart className="w-4 h-4 mr-2" />
          New Sale
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Today's Sales</p>
                <p className="text-3xl font-bold">₹45,670</p>
                <Badge className="bg-shop-profit text-white mt-2">+12.5%</Badge>
              </div>
              <TrendingUp className="w-10 h-10 text-shop-profit" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Orders Today</p>
                <p className="text-3xl font-bold">127</p>
                <Badge className="bg-shop-secondary text-white mt-2">+8.2%</Badge>
              </div>
              <ShoppingCart className="w-10 h-10 text-shop-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Avg Order Value</p>
                <p className="text-3xl font-bold">₹3,594</p>
                <Badge className="bg-shop-primary text-white mt-2">+5.1%</Badge>
              </div>
              <Calendar className="w-10 h-10 text-shop-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Sales Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Sales order management interface will be displayed here with order tracking, status updates, and customer information.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
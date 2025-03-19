import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { 
  Users, 
  PlusCircle, 
  LayoutDashboard, 
  LogOut, 
  Shield, 
  TrendingUp, 
  LineChart, 
  PieChart, 
  Calendar, 
  DollarSign
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";

const Dashboard = () => {
  const { user, logout } = useAuth();

  // Datos simulados para los gráficos
  const lineChartData = [
    { month: "Ene", ventas: 120, renovaciones: 80 },
    { month: "Feb", ventas: 130, renovaciones: 85 },
    { month: "Mar", ventas: 145, renovaciones: 90 },
    { month: "Abr", ventas: 160, renovaciones: 95 },
    { month: "May", ventas: 150, renovaciones: 100 },
    { month: "Jun", ventas: 180, renovaciones: 110 },
    { month: "Jul", ventas: 200, renovaciones: 120 },
  ];

  const barChartData = [
    { categoria: "Auto", valor: 120 },
    { categoria: "Hogar", valor: 75 },
    { categoria: "Vida", valor: 45 },
    { categoria: "Salud", valor: 90 },
    { categoria: "Viaje", valor: 30 },
  ];

  const pieChartData = [
    { name: "Auto", value: 35 },
    { name: "Hogar", value: 25 },
    { name: "Vida", value: 15 },
    { name: "Salud", value: 20 },
    { name: "Viaje", value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const recientesData = [
    { id: 1, cliente: "Ana Rodríguez", poliza: "Auto - Premium", fecha: "10/06/2023", valor: "$350" },
    { id: 2, cliente: "Carlos López", poliza: "Hogar - Completo", fecha: "08/06/2023", valor: "$280" },
    { id: 3, cliente: "María González", poliza: "Vida - Familiar", fecha: "05/06/2023", valor: "$520" },
    { id: 4, cliente: "Juan Martínez", poliza: "Salud - Total", fecha: "03/06/2023", valor: "$420" },
  ];

  const clientesValiosos = [
    { id: 1, cliente: "Empresas Unidas S.A.", polizas: 12, valor: "$9,850" },
    { id: 2, cliente: "Construcciones XYZ", polizas: 8, valor: "$7,650" },
    { id: 3, cliente: "Distribuidora ABC", polizas: 6, valor: "$5,920" },
    { id: 4, cliente: "Hotel Estrella", polizas: 5, valor: "$4,830" },
  ];

  const kpis = [
    { title: "Pólizas Activas", value: "2,456", icon: Shield, trend: "+5%", color: "text-blue-500" },
    { title: "Nuevos Clientes", value: "128", icon: Users, trend: "+12%", color: "text-green-500" },
    { title: "Ingresos Mensuales", value: "$125,400", icon: DollarSign, trend: "+8%", color: "text-purple-500" },
    { title: "Renovaciones", value: "87%", icon: Calendar, trend: "+2%", color: "text-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900">Seguros Protección Total</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Bienvenido, {user?.name}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <LayoutDashboard className="h-6 w-6 mr-2 text-blue-600" />
              Dashboard
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {kpis.map((kpi, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                        <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                        <p className="text-sm font-medium text-green-500 mt-1">{kpi.trend} vs. mes anterior</p>
                      </div>
                      <div className={`p-3 rounded-full bg-opacity-10 ${kpi.color.replace('text', 'bg')}`}>
                        <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="graficos" className="mt-8">
              <TabsList className="mb-6">
                <TabsTrigger value="graficos" className="text-sm">
                  <LineChart className="h-4 w-4 mr-2" />
                  Gráficos
                </TabsTrigger>
                <TabsTrigger value="clientes" className="text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Clientes
                </TabsTrigger>
                <TabsTrigger value="ventas" className="text-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Ventas
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="graficos" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gráfico de líneas - Ventas y Renovaciones */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Ventas y Renovaciones</CardTitle>
                      <CardDescription>Evolución mensual durante 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <ChartContainer>
                            <RechartsLineChart data={lineChartData}>
                              <ChartTooltip 
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                          <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                              Ventas
                                            </span>
                                            <span className="font-bold text-blue-500">
                                              {payload[0].value}
                                            </span>
                                          </div>
                                          <div className="flex flex-col">
                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                              Renovaciones
                                            </span>
                                            <span className="font-bold text-purple-500">
                                              {payload[1].value}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }
                                  return null
                                }}
                              />
                              <Line
                                type="monotone"
                                dataKey="ventas"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="renovaciones"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                              />
                            </RechartsLineChart>
                          </ChartContainer>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Gráfico de pie - Distribución de Pólizas */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Distribución de Pólizas</CardTitle>
                      <CardDescription>Por tipo de seguro</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <ChartContainer>
                            <RechartsPieChart>
                              <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {pieChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </RechartsPieChart>
                          </ChartContainer>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Gráfico de barras - Ventas por Categoría */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Ventas por Categoría</CardTitle>
                      <CardDescription>Total acumulado en 2023</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <ChartContainer>
                            <BarChart data={barChartData}>
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar
                                dataKey="valor"
                                fill="#3b82f6"
                                radius={4}
                                label={{ position: 'top', fill: '#666' }}
                              />
                            </BarChart>
                          </ChartContainer>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="clientes" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Clientes valiosos */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Clientes más valiosos</CardTitle>
                      <CardDescription>Basado en valor total de pólizas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Pólizas</TableHead>
                            <TableHead>Valor total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {clientesValiosos.map((cliente) => (
                            <TableRow key={cliente.id}>
                              <TableCell className="font-medium">{cliente.cliente}</TableCell>
                              <TableCell>{cliente.polizas}</TableCell>
                              <TableCell>{cliente.valor}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Gestión de Clientes */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Gestión de Clientes</CardTitle>
                      <CardDescription>Acciones rápidas</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Link to="/new-client">
                        <Button className="w-full flex items-center gap-2">
                          <PlusCircle className="h-4 w-4" />
                          Registrar Nuevo Cliente
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Ver Todos los Clientes
                      </Button>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Gestionar Pólizas
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="ventas" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Ventas Recientes */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Ventas Recientes</CardTitle>
                      <CardDescription>Últimas pólizas emitidas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Póliza</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Valor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recientesData.map((venta) => (
                            <TableRow key={venta.id}>
                              <TableCell className="font-medium">{venta.cliente}</TableCell>
                              <TableCell>{venta.poliza}</TableCell>
                              <TableCell>{venta.fecha}</TableCell>
                              <TableCell>{venta.valor}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Proyección de Ventas */}
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg">Proyección de Ventas</CardTitle>
                      <CardDescription>Próximo trimestre</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Meta mensual</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Meta trimestral</span>
                            <span className="text-sm font-medium">62%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "62%" }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Meta anual</span>
                            <span className="text-sm font-medium">47%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: "47%" }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;

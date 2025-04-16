
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trash2, Clock, Calendar as CalendarIcon, 
  User, Phone, Check, Search, Filter 
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const HOURS = Array.from({ length: 24 }, (_, i) => 
  i.toString().padStart(2, '0') + ":00"
);

const RESERVATION_TYPES = [
  "Limpieza dental",
  "Revisión",
  "Tratamiento de conducto",
  "Extracción",
  "Ortodoncia",
  "Prótesis",
  "Otros"
];

// Datos de ejemplo para el histórico y métricas
const RESERVATIONS_SAMPLE = [
  { id: 1, date: new Date(2025, 3, 10), startTime: "09:00", endTime: "10:00", name: "Carlos Rodríguez", phone: "612345678", type: "Limpieza dental", status: "completed", document: "12345678A" },
  { id: 2, date: new Date(2025, 3, 12), startTime: "11:00", endTime: "12:00", name: "María López", phone: "623456789", type: "Revisión", status: "upcoming", document: "23456789B" },
  { id: 3, date: new Date(2025, 3, 15), startTime: "16:00", endTime: "17:30", name: "Jorge Martín", phone: "634567890", type: "Tratamiento de conducto", status: "upcoming", document: "34567890C" },
  { id: 4, date: new Date(2025, 3, 8), startTime: "10:00", endTime: "11:00", name: "Ana Sánchez", phone: "645678901", type: "Extracción", status: "cancelled", document: "45678901D" },
  { id: 5, date: new Date(2025, 3, 5), startTime: "15:00", endTime: "16:00", name: "Pablo Gómez", phone: "656789012", type: "Ortodoncia", status: "completed", document: "56789012E" },
];

// Métricas para el dashboard
const METRICS = [
  { title: "Citas Totales", value: "128", description: "Este mes" },
  { title: "Tratamientos", value: "43", description: "En progreso" },
  { title: "Disponibilidad", value: "68%", description: "Sillas disponibles" },
  { title: "Satisfacción", value: "97%", description: "De pacientes" },
];

const Reservas = () => {
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [document, setDocument] = useState("");
  const [activeTab, setActiveTab] = useState("create");
  const [reservations, setReservations] = useState(RESERVATIONS_SAMPLE);
  
  // Filtros
  const [filterType, setFilterType] = useState("");
  const [filterDocument, setFilterDocument] = useState("");
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime || !endTime || !name || !phone || !type) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (startTime >= endTime) {
      toast.error("La hora de inicio debe ser anterior a la hora de fin");
      return;
    }
    
    // Agregar nueva reserva al listado
    const newReservation = {
      id: reservations.length + 1,
      date: date,
      startTime,
      endTime,
      name,
      phone,
      type,
      document,
      status: "upcoming"
    };
    
    setReservations([...reservations, newReservation]);
    toast.success("¡Reserva creada con éxito!");
    
    // Limpiar formulario
    setDate(undefined);
    setStartTime("");
    setEndTime("");
    setName("");
    setPhone("");
    setType("");
    setDocument("");
  };

  const handleCancelReservation = (id: number) => {
    setReservations(
      reservations.map(reservation => 
        reservation.id === id 
          ? { ...reservation, status: "cancelled" } 
          : reservation
      )
    );
    toast.success("Reserva cancelada correctamente");
  };

  const resetFilters = () => {
    setFilterType("");
    setFilterDocument("");
    setFilterDate(undefined);
  };

  // Filtrado de reservas según la pestaña y los filtros aplicados
  const filteredReservations = reservations.filter(reservation => {
    // Filtro por pestaña
    if (activeTab === "upcoming" && reservation.status !== "upcoming") return false;
    if (activeTab === "history" && (reservation.status !== "completed" && reservation.status !== "cancelled")) return false;
    
    // Filtros adicionales
    if (filterType && reservation.type !== filterType) return false;
    if (filterDocument && !reservation.document?.toLowerCase().includes(filterDocument.toLowerCase())) return false;
    if (filterDate && filterDate.toDateString() !== reservation.date.toDateString()) return false;
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Logo y Métricas */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-primary mr-2" />
                <h1 className="text-2xl font-bold">Dental Care Plus</h1>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {METRICS.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="p-4 pb-2">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
            Sistema de Reservas
          </h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="create">Crear Reserva</TabsTrigger>
              <TabsTrigger value="upcoming">Próximas Citas</TabsTrigger>
              <TabsTrigger value="history">Historial</TabsTrigger>
            </TabsList>
            
            {/* Pestaña: Crear Reserva */}
            <TabsContent value="create">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calendario */}
                <Card className="p-4">
                  <CardHeader className="pb-2">
                    <CardTitle>Selecciona una fecha</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md pointer-events-auto"
                      disabled={(date) => date < new Date()}
                      weekStartsOn={1}
                      view="week"
                    />
                  </CardContent>
                </Card>
                
                {/* Formulario */}
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0 pb-4">
                    <CardTitle>Detalles de la cita</CardTitle>
                  </CardHeader>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre del Paciente</Label>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nombre completo"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="document">Cédula / Documento</Label>
                      <Input
                        id="document"
                        value={document}
                        onChange={(e) => setDocument(e.target.value)}
                        placeholder="Número de documento"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono de Contacto</Label>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Número de teléfono"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tipo de tratamiento</Label>
                      <Select value={type} onValueChange={setType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de tratamiento" />
                        </SelectTrigger>
                        <SelectContent>
                          {RESERVATION_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Hora de inicio</Label>
                        <Select value={startTime} onValueChange={setStartTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Inicio" />
                          </SelectTrigger>
                          <SelectContent>
                            {HOURS.map((hour) => (
                              <SelectItem key={hour} value={hour}>
                                {hour}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Hora de fin</Label>
                        <Select value={endTime} onValueChange={setEndTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Fin" />
                          </SelectTrigger>
                          <SelectContent>
                            {HOURS.map((hour) => (
                              <SelectItem key={hour} value={hour}>
                                {hour}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Fecha seleccionada</Label>
                      <p className="text-muted-foreground">
                        {date ? date.toLocaleDateString() : "Selecciona una fecha"}
                      </p>
                    </div>
                    
                    <Button type="submit" className="w-full bg-primary">
                      <Check className="mr-2 h-4 w-4" /> Confirmar reserva
                    </Button>
                  </form>
                </Card>
              </div>
            </TabsContent>
            
            {/* Pestaña: Próximas Citas */}
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Próximas citas</CardTitle>
                    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <Filter className="h-4 w-4" />
                          Filtrar
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <h3 className="font-medium">Filtros de búsqueda</h3>
                          <div className="space-y-2">
                            <Label htmlFor="filter-type">Tipo de tratamiento</Label>
                            <Select value={filterType} onValueChange={setFilterType}>
                              <SelectTrigger>
                                <SelectValue placeholder="Todos los tipos" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">Todos</SelectItem>
                                {RESERVATION_TYPES.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="filter-document">Cédula/Documento</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="filter-document"
                                placeholder="Buscar por documento"
                                value={filterDocument}
                                onChange={(e) => setFilterDocument(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="filter-date">Fecha específica</Label>
                            <Calendar
                              mode="single"
                              selected={filterDate}
                              onSelect={setFilterDate}
                              className="rounded-md"
                              weekStartsOn={1}
                            />
                          </div>
                          
                          <div className="flex justify-between">
                            <Button
                              variant="outline"
                              onClick={resetFilters}
                            >
                              Resetear filtros
                            </Button>
                            <Button onClick={() => setIsFilterOpen(false)}>
                              Aplicar filtros
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredReservations.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No hay citas programadas</p>
                  ) : (
                    <div className="grid gap-4">
                      {filteredReservations.map((reservation) => (
                        <Card key={reservation.id} className="p-4 bg-accent/30">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{reservation.name}</h3>
                              <div className="text-sm text-muted-foreground space-y-1 mt-1">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                                  {reservation.date.toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                                  {reservation.startTime} - {reservation.endTime}
                                </div>
                                <p>{reservation.type}</p>
                                {reservation.document && (
                                  <p className="text-xs">Doc: {reservation.document}</p>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelReservation(reservation.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Pestaña: Historial */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Historial de citas</CardTitle>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <Filter className="h-4 w-4" />
                          Filtrar
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <h3 className="font-medium">Filtros de búsqueda</h3>
                          <div className="space-y-2">
                            <Label htmlFor="filter-type">Tipo de tratamiento</Label>
                            <Select value={filterType} onValueChange={setFilterType}>
                              <SelectTrigger>
                                <SelectValue placeholder="Todos los tipos" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">Todos</SelectItem>
                                {RESERVATION_TYPES.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="filter-document">Cédula/Documento</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="filter-document"
                                placeholder="Buscar por documento"
                                value={filterDocument}
                                onChange={(e) => setFilterDocument(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="filter-date">Fecha específica</Label>
                            <Calendar
                              mode="single"
                              selected={filterDate}
                              onSelect={setFilterDate}
                              className="rounded-md"
                              weekStartsOn={1}
                            />
                          </div>
                          
                          <div className="flex justify-between">
                            <Button
                              variant="outline"
                              onClick={resetFilters}
                            >
                              Resetear filtros
                            </Button>
                            <Button onClick={() => setIsFilterOpen(false)}>
                              Aplicar filtros
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredReservations.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No hay historial de citas</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 text-left font-medium">Paciente</th>
                            <th className="py-3 text-left font-medium">Documento</th>
                            <th className="py-3 text-left font-medium">Fecha</th>
                            <th className="py-3 text-left font-medium">Hora</th>
                            <th className="py-3 text-left font-medium">Tratamiento</th>
                            <th className="py-3 text-left font-medium">Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredReservations.map((reservation) => (
                            <tr key={reservation.id} className="border-b">
                              <td className="py-3">{reservation.name}</td>
                              <td className="py-3">{reservation.document}</td>
                              <td className="py-3">{reservation.date.toLocaleDateString()}</td>
                              <td className="py-3">{reservation.startTime} - {reservation.endTime}</td>
                              <td className="py-3">{reservation.type}</td>
                              <td className="py-3">
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  reservation.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {reservation.status === 'completed' ? 'Completada' : 'Cancelada'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Reservas;

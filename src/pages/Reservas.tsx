
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trash2, Clock, Calendar as CalendarIcon, 
  User, Phone, Check, Search, Filter, X, ChevronLeft, ChevronRight 
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
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { format, isSameDay, addDays, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

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

const RESERVATIONS_SAMPLE = [
  { id: 1, date: new Date(2025, 3, 10), startTime: "09:00", endTime: "10:00", name: "Carlos Rodríguez", phone: "612345678", type: "Limpieza dental", status: "completed", document: "12345678A" },
  { id: 2, date: new Date(2025, 3, 12), startTime: "11:00", endTime: "12:00", name: "María López", phone: "623456789", type: "Revisión", status: "upcoming", document: "23456789B" },
  { id: 3, date: new Date(2025, 3, 15), startTime: "16:00", endTime: "17:30", name: "Jorge Martín", phone: "634567890", type: "Tratamiento de conducto", status: "upcoming", document: "34567890C" },
  { id: 4, date: new Date(2025, 3, 8), startTime: "10:00", endTime: "11:00", name: "Ana Sánchez", phone: "645678901", type: "Extracción", status: "cancelled", document: "45678901D" },
  { id: 5, date: new Date(2025, 3, 5), startTime: "15:00", endTime: "16:00", name: "Pablo Gómez", phone: "656789012", type: "Ortodoncia", status: "completed", document: "56789012E" },
  { id: 6, date: new Date(), startTime: "08:00", endTime: "09:00", name: "Elena Castillo", phone: "667890123", type: "Limpieza dental", status: "upcoming", document: "67890123F" },
  { id: 7, date: new Date(), startTime: "10:30", endTime: "11:30", name: "Miguel Torres", phone: "678901234", type: "Revisión", status: "upcoming", document: "78901234G" },
  { id: 8, date: addDays(new Date(), 1), startTime: "14:00", endTime: "15:00", name: "Laura Ruiz", phone: "689012345", type: "Prótesis", status: "upcoming", document: "89012345H" },
  { id: 9, date: addDays(new Date(), 1), startTime: "16:30", endTime: "17:30", name: "David Soto", phone: "690123456", type: "Extracción", status: "upcoming", document: "90123456I" },
];

const METRICS = [
  { title: "Citas Totales", value: "128", description: "Este mes" },
  { title: "Tratamientos", value: "43", description: "En progreso" },
  { title: "Disponibilidad", value: "68%", description: "Sillas disponibles" },
  { title: "Satisfacción", value: "97%", description: "De pacientes" },
];

const Reservas = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [document, setDocument] = useState("");
  const [activeTab, setActiveTab] = useState("create");
  const [reservations, setReservations] = useState(RESERVATIONS_SAMPLE);
  
  const [filterType, setFilterType] = useState("");
  const [filterDocument, setFilterDocument] = useState("");
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("day");
  const [dayViewDate, setDayViewDate] = useState(new Date());
  const form = useForm();

  useEffect(() => {
    if (date) {
      setDayViewDate(date);
    }
  }, [date]);

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
    
    setDate(new Date());
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
    setIsFilterOpen(false);
    toast.success("Filtros resetados");
  };

  const applyFilters = () => {
    setIsFilterOpen(false);
    toast.success("Filtros aplicados");
  };

  const nextDay = () => {
    setDayViewDate(addDays(dayViewDate, 1));
  };

  const prevDay = () => {
    setDayViewDate(addDays(dayViewDate, -1));
  };

  const filteredReservations = reservations.filter(reservation => {
    if (activeTab === "upcoming" && reservation.status !== "upcoming") return false;
    if (activeTab === "history" && (reservation.status !== "completed" && reservation.status !== "cancelled")) return false;
    
    if (filterType && reservation.type !== filterType) return false;
    if (filterDocument && !reservation.document?.toLowerCase().includes(filterDocument.toLowerCase())) return false;
    if (filterDate && !isSameDay(filterDate, reservation.date)) return false;
    
    return true;
  });

  const dayReservations = reservations.filter(reservation => 
    reservation.status === "upcoming" && isSameDay(reservation.date, dayViewDate)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navbar />
      
      <main className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-purple-600 mr-2" />
                <h1 className="text-2xl font-bold">Dental Care Plus</h1>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {METRICS.map((metric, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
                  <CardHeader className="p-4 pb-2">
                    <p className="text-sm text-purple-600 font-medium">{metric.title}</p>
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
            
            <TabsContent value="create">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <Card className="p-4 border-none shadow-md">
                    <CardHeader className="pb-2">
                      <CardTitle>Selecciona una fecha</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md pointer-events-auto"
                        disabled={(date) => date < startOfDay(new Date())}
                        weekStartsOn={1}
                      />
                    </CardContent>
                  </Card>
                  
                  {date && (
                    <Card className="p-4 border-none shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle>Vista del día</CardTitle>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={prevDay}
                              className="h-8 w-8"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={nextDay}
                              className="h-8 w-8"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {format(dayViewDate, "EEEE, d 'de' MMMM", { locale: require('date-fns/locale/es') })}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {HOURS.map((hour) => {
                            const reservationsAtHour = dayReservations.filter(
                              res => res.startTime === hour
                            );
                            
                            return (
                              <div key={hour} className="flex items-start">
                                <div className="text-sm font-medium w-12 text-gray-500 pt-1">
                                  {hour}
                                </div>
                                <div className="flex-1 min-h-[40px] border-l pl-2 ml-2">
                                  {reservationsAtHour.length > 0 ? (
                                    reservationsAtHour.map((res) => (
                                      <div 
                                        key={res.id}
                                        className="bg-purple-100 border-l-4 border-purple-600 p-2 text-sm rounded mb-1"
                                      >
                                        <div className="font-medium">{res.name}</div>
                                        <div className="text-xs text-gray-500">
                                          {res.startTime} - {res.endTime} | {res.type}
                                        </div>
                                      </div>
                                    ))
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <Card className="p-6 border-none shadow-md">
                  <CardHeader className="px-0 pt-0 pb-4">
                    <CardTitle>Detalles de la cita</CardTitle>
                  </CardHeader>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre del Paciente</Label>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-purple-600" />
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nombre completo"
                          required
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
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
                        className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono de Contacto</Label>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-purple-600" />
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Número de teléfono"
                          required
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tipo de tratamiento</Label>
                      <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
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
                          <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
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
                          <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
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
                      <p className="text-purple-600 font-medium">
                        {date ? format(date, "EEEE, d 'de' MMMM, yyyy", { locale: require('date-fns/locale/es') }) : "Selecciona una fecha"}
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Check className="mr-2 h-4 w-4" /> Confirmar reserva
                    </Button>
                  </form>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Próximas citas</CardTitle>
                    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                      <SheetTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="gap-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50"
                        >
                          <Filter className="h-4 w-4 text-purple-600" />
                          Filtrar
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="bg-white">
                        <SheetHeader>
                          <SheetTitle className="text-xl font-bold text-purple-800">Filtros de búsqueda</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="filter-type" className="text-gray-700">Tipo de tratamiento</Label>
                            <Select value={filterType} onValueChange={setFilterType}>
                              <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
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
                            <Label htmlFor="filter-document" className="text-gray-700">Cédula/Documento</Label>
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                id="filter-document"
                                placeholder="Buscar por documento"
                                value={filterDocument}
                                onChange={(e) => setFilterDocument(e.target.value)}
                                className="pl-8 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="filter-date" className="text-gray-700">Fecha específica</Label>
                            <Calendar
                              mode="single"
                              selected={filterDate}
                              onSelect={setFilterDate}
                              className="rounded-md border p-3 pointer-events-auto"
                              weekStartsOn={1}
                            />
                          </div>
                          
                          <div className="flex justify-between mt-10">
                            <Button
                              variant="outline"
                              onClick={resetFilters}
                              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Resetear
                            </Button>
                            <Button 
                              onClick={applyFilters}
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Aplicar
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredReservations.length === 0 ? (
                    <div className="text-center py-12">
                      <CalendarIcon className="mx-auto h-12 w-12 text-gray-300" />
                      <p className="mt-4 text-lg text-muted-foreground">No hay citas que coincidan con los filtros aplicados</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredReservations.map((reservation) => (
                        <Card 
                          key={reservation.id} 
                          className="p-4 bg-gradient-to-r from-purple-50 to-white border-l-4 border-purple-500 hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-purple-800">{reservation.name}</h3>
                              <div className="text-sm text-muted-foreground space-y-1 mt-1">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
                                  {format(reservation.date, "EEEE, d 'de' MMMM", { locale: require('date-fns/locale/es') })}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1.5 text-purple-400" />
                                  {reservation.startTime} - {reservation.endTime}
                                </div>
                                <div className="inline-block px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 mt-1">
                                  {reservation.type}
                                </div>
                                {reservation.document && (
                                  <p className="text-xs mt-1">Doc: {reservation.document}</p>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelReservation(reservation.id)}
                              className="border-red-200 text-red-500 hover:text-red-700 hover:bg-red-50"
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
            
            <TabsContent value="history">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Historial de citas</CardTitle>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="gap-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50"
                        >
                          <Filter className="h-4 w-4 text-purple-600" />
                          Filtrar
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="bg-white">
                        <SheetHeader>
                          <SheetTitle className="text-xl font-bold text-purple-800">Filtros de búsqueda</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="filter-type" className="text-gray-700">Tipo de tratamiento</Label>
                            <Select value={filterType} onValueChange={setFilterType}>
                              <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
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
                            <Label htmlFor="filter-document" className="text-gray-700">Cédula/Documento</Label>
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                id="filter-document"
                                placeholder="Buscar por documento"
                                value={filterDocument}
                                onChange={(e) => setFilterDocument(e.target.value)}
                                className="pl-8 border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="filter-date" className="text-gray-700">Fecha específica</Label>
                            <Calendar
                              mode="single"
                              selected={filterDate}
                              onSelect={setFilterDate}
                              className="rounded-md border p-3 pointer-events-auto"
                              weekStartsOn={1}
                            />
                          </div>
                          
                          <div className="flex justify-between mt-10">
                            <Button
                              variant="outline"
                              onClick={resetFilters}
                              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Resetear
                            </Button>
                            <Button 
                              onClick={applyFilters}
                              className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Aplicar
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredReservations.length === 0 ? (
                    <div className="text-center py-12">
                      <CalendarIcon className="mx-auto h-12 w-12 text-gray-300" />
                      <p className="mt-4 text-lg text-muted-foreground">No hay historial de citas que coincidan con los filtros aplicados</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-purple-100">
                            <th className="py-3 text-left font-medium text-purple-800">Paciente</th>
                            <th className="py-3 text-left font-medium text-purple-800">Documento</th>
                            <th className="py-3 text-left font-medium text-purple-800">Fecha</th>
                            <th className="py-3 text-left font-medium text-purple-800">Hora</th>
                            <th className="py-3 text-left font-medium text-purple-800">Tratamiento</th>
                            <th className="py-3 text-left font-medium text-purple-800">Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredReservations.map((reservation) => (
                            <tr key={reservation.id} className="border-b border-gray-100 hover:bg-purple-50">
                              <td className="py-3">{reservation.name}</td>
                              <td className="py-3">{reservation.document}</td>
                              <td className="py-3">{format(reservation.date, "dd/MM/yyyy")}</td>
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

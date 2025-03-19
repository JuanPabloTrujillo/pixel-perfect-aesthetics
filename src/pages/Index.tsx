
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TestimonialCard from '../components/TestimonialCard';
import { Code, Bot, Database, LineChart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const services = [
    {
      id: 1,
      title: "Desarrollo de Software a Medida",
      description: "Creamos soluciones de software personalizadas que se adaptan perfectamente a tus necesidades empresariales.",
      icon: Code,
    },
    {
      id: 2,
      title: "Automatización Inteligente",
      description: "Automatizamos tareas repetitivas y optimizamos procesos para aumentar la eficiencia y reducir costos.",
      icon: Bot,
    },
    {
      id: 3,
      title: "Análisis y Visualización de Datos",
      description: "Transformamos tus datos en información valiosa para la toma de decisiones estratégicas.",
      icon: Database,
    },
    {
      id: 4,
      title: "Inteligencia Artificial Aplicada",
      description: "Implementamos soluciones de IA para mejorar la experiencia del cliente, optimizar operaciones y descubrir nuevas oportunidades.",
      icon: LineChart,
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Carlos Pérez",
      company: "Innovación S.A.",
      testimonial: "La automatización de procesos que implementaron mejoró nuestra eficiencia en un 40%. ¡Altamente recomendables!",
    },
    {
      id: 2,
      name: "Laura Gómez",
      company: "Soluciones Integrales",
      testimonial: "El análisis de datos que realizaron nos permitió identificar nuevas oportunidades de mercado. ¡Un servicio excelente!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-blue-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-blue-900 opacity-50"></div>
        <div className="absolute inset-0 bg-[url(/bg-pattern.png)] bg-repeat opacity-10"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              🚀 Impulsamos el crecimiento empresarial con IA, automatización y datos.
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              📊 Optimizamos procesos, mejoramos decisiones y fortalecemos tu negocio con tecnología innovadora.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg">
                    Ir al Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                ref={ref}
                variants={cardVariants}
                initial="hidden"
                animate={controls}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Testimonios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                ref={ref}
                variants={cardVariants}
                initial="hidden"
                animate={controls}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para revolucionar tu negocio?</h2>
            <p className="text-xl text-blue-100 mb-8">Únete a las empresas que ya están transformando su futuro con nuestras soluciones tecnológicas.</p>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg">
                  Acceder al Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg">
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} TuEmpresa. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

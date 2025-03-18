
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Index = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] text-white">
      <Navbar />
      
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-[40%] right-[15%] w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
          
          {/* Digital nodes */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[80%] max-w-5xl">
              <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-5">
                <circle cx="400" cy="400" r="200" stroke="white" strokeWidth="0.5"/>
                <circle cx="400" cy="400" r="300" stroke="white" strokeWidth="0.5"/>
                <circle cx="400" cy="400" r="400" stroke="white" strokeWidth="0.5"/>
                {Array.from({ length: 20 }).map((_, i) => (
                  <circle 
                    key={i} 
                    cx={Math.random() * 800} 
                    cy={Math.random() * 800} 
                    r="2" 
                    fill="white"
                  />
                ))}
                {Array.from({ length: 15 }).map((_, i) => (
                  <line 
                    key={i}
                    x1={Math.random() * 800} 
                    y1={Math.random() * 800} 
                    x2={Math.random() * 800} 
                    y2={Math.random() * 800} 
                    stroke="white" 
                    strokeWidth="0.5"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative"
          >
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-300"
              >
                Innovación tecnológica
              </motion.span>
            </div>
            
            {/* Hero Text */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 mb-6 leading-tight"
            >
              🚀 Impulsamos el crecimiento empresarial con IA, automatización y datos.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl max-w-3xl mx-auto text-blue-100/80"
            >
              📊 Optimizamos procesos, mejoramos decisiones y fortalecemos tu negocio con tecnología innovadora.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-4 justify-center"
            >
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-1">
                Comenzar ahora
              </button>
              <button className="px-8 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10 font-medium transition-all duration-300 transform hover:-translate-y-1">
                Conocer más
              </button>
            </motion.div>
          </motion.div>
          
          {/* Features section */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 px-4"
          >
            <ServiceCard 
              icon="Brain"
              title="Inteligencia Artificial"
              description="Implementamos soluciones de IA adaptadas a tu negocio para automatizar tareas complejas y potenciar la toma de decisiones."
              delay={0.1}
            />
            <ServiceCard 
              icon="Workflow"
              title="Automatización Inteligente"
              description="Optimizamos tus flujos de trabajo con procesos automatizados que reducen costos y mejoran la eficiencia operativa."
              delay={0.2}
            />
            <ServiceCard 
              icon="BarChart"
              title="Analítica Avanzada"
              description="Convertimos tus datos en insights accionables con herramientas de visualización y análisis predictivo de última generación."
              delay={0.3}
            />
          </motion.div>
          
          {/* Visual section */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="relative mx-auto mt-16 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/10"
          >
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm bg-gradient-to-b from-indigo-900/30 to-purple-900/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/311ddc8a-8caa-476b-bb80-f25d06c0d59e.png" 
                  alt="AI Business Growth" 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 transition-transform duration-300 hover:scale-110 group">
                    <svg className="w-8 h-8 text-white fill-current transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Stats section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">98%</h3>
              <p className="text-blue-100/60 mt-2">Satisfacción cliente</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">250+</h3>
              <p className="text-blue-100/60 mt-2">Proyectos completados</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">35%</h3>
              <p className="text-blue-100/60 mt-2">Aumento en eficiencia</p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">24/7</h3>
              <p className="text-blue-100/60 mt-2">Soporte técnico</p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;

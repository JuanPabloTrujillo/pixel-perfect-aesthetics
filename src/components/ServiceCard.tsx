
import { motion } from 'framer-motion';
import { 
  Brain, 
  BarChart, 
  Workflow, 
  LucideIcon,
  Code,
  Bot,
  Database,
  LineChart
} from 'lucide-react';

type IconName = 'Brain' | 'BarChart' | 'Workflow' | 'Code' | 'Bot' | 'Database' | 'LineChart';

interface ServiceCardProps {
  icon: IconName;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard = ({ icon, title, description, delay = 0 }: ServiceCardProps) => {
  const icons: Record<IconName, LucideIcon> = {
    Brain,
    BarChart,
    Workflow,
    Code,
    Bot,
    Database,
    LineChart
  };

  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-blue-100/70">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;

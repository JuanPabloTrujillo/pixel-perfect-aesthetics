
import Navbar from '../components/Navbar';
import VideoSection from '../components/VideoSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-foreground/10 text-accent-foreground">
              Actualizada
            </span>
          </div>
          
          {/* Hero Text */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Tu próxima gran aventura
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Descubre un nuevo mundo de posibilidades con nuestra plataforma innovadora.
            </p>
          </div>
          
          {/* Video Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <VideoSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

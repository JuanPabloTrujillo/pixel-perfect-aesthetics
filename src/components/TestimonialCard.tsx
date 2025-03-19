
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    company: string;
    testimonial: string;
  }
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="mb-4">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.7693 27.6922H5.38461C4.44079 27.6922 3.53582 27.3215 2.86735 26.6531C2.19889 25.9846 1.8282 25.0796 1.8282 24.1358V20.5128C1.8282 18.6252 2.57658 16.8152 3.91351 15.4783C5.25044 14.1414 7.06039 13.393 8.94768 13.393H10.7693C11.2411 13.393 11.6936 13.5784 12.0279 13.9126C12.362 14.2468 12.5474 14.6993 12.5474 15.1711V16.9485C12.5474 17.4203 12.362 17.8728 12.0279 18.2069C11.6936 18.5411 11.2411 18.7265 10.7693 18.7265H8.94768C8.47584 18.7265 8.02334 18.9119 7.68917 19.2461C7.355 19.5802 7.16961 20.0327 7.16961 20.5046V24.1276C7.16961 24.5994 7.355 25.0519 7.68917 25.3861C8.02334 25.7202 8.47584 25.9056 8.94768 25.9056H10.7693C11.2411 25.9056 11.6936 26.091 12.0279 26.4252C12.362 26.7594 12.5474 27.2119 12.5474 27.6837V29.461C12.5474 29.9329 12.362 30.3854 12.0279 30.7195C11.6936 31.0537 11.2411 31.2391 10.7693 31.2391H8.94768C7.06039 31.2391 5.25044 30.4907 3.91351 29.1538C2.57658 27.8169 1.8282 26.0069 1.8282 24.1193V20.5046" stroke="url(#paint0_linear_42_2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M29.2321 27.6922H23.8475C22.9036 27.6922 21.9987 27.3215 21.3302 26.6531C20.6617 25.9846 20.291 25.0796 20.291 24.1358V20.5128C20.291 18.6252 21.0394 16.8152 22.3763 15.4783C23.7132 14.1414 25.5232 13.393 27.4105 13.393H29.2321C29.704 13.393 30.1565 13.5784 30.4907 13.9126C30.8248 14.2468 31.0102 14.6993 31.0102 15.1711V16.9485C31.0102 17.4203 30.8248 17.8728 30.4907 18.2069C30.1565 18.5411 29.704 18.7265 29.2321 18.7265H27.4105C26.9387 18.7265 26.4862 18.9119 26.152 19.2461C25.8178 19.5802 25.6324 20.0327 25.6324 20.5046V24.1276C25.6324 24.5994 25.8178 25.0519 26.152 25.3861C26.4862 25.7202 26.9387 25.9056 27.4105 25.9056H29.2321C29.704 25.9056 30.1565 26.091 30.4907 26.4252C30.8248 26.7594 31.0102 27.2119 31.0102 27.6837V29.461C31.0102 29.9329 30.8248 30.3854 30.4907 30.7195C30.1565 31.0537 29.704 31.2391 29.2321 31.2391H27.4105C25.5232 31.2391 23.7132 30.4907 22.3763 29.1538C21.0394 27.8169 20.291 26.0069 20.291 24.1193V20.5046" stroke="url(#paint1_linear_42_2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="paint0_linear_42_2" x1="7.18782" y1="13.393" x2="7.18782" y2="31.2391" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8"/>
              <stop offset="1" stopColor="#A78BFA"/>
            </linearGradient>
            <linearGradient id="paint1_linear_42_2" x1="25.6506" y1="13.393" x2="25.6506" y2="31.2391" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818CF8"/>
              <stop offset="1" stopColor="#A78BFA"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <p className="text-blue-100/80 mb-6 italic">{testimonial.testimonial}</p>
      
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-medium text-white">{testimonial.name}</h4>
          <p className="text-sm text-blue-100/60">{testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;

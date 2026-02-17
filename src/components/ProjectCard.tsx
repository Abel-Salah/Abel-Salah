import { motion } from "framer-motion";

interface ProjectCardProps {
  number: string;
  title: string;
  context: string;
  action: string;
  result: string;
  index: number;
}

const ProjectCard = ({ number, title, context, action, result, index }: ProjectCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border-t border-border py-16 group"
    >
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-2">
          <span className="heading-display text-6xl text-muted-foreground/30 group-hover:text-primary transition-colors duration-500">
            {number}
          </span>
        </div>
        
        <div className="col-span-10 space-y-8">
          <h3 className="heading-display text-4xl md:text-5xl group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          
          <div className="grid grid-cols-3 gap-8 text-lg">
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">
                Context
              </span>
              <p className="text-foreground">{context}</p>
            </div>
            
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">
                Action
              </span>
              <p className="text-foreground">{action}</p>
            </div>
            
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">
                Result
              </span>
              <p className="text-primary font-semibold text-xl">{result}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;

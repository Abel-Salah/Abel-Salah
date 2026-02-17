import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="heading-display text-[clamp(3rem,10vw,10rem)] leading-[0.85] mb-8">
            Contact
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Have a project in mind? Let's talk about how strategic copy can
            drive your results.
          </p>
        </motion.div>

        <div className="grid grid-cols-12 gap-16">
          {/* Form */}
          <div className="col-span-12 md:col-span-7">
            <ContactForm />
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-12 md:col-span-5"
          >
            <div className="space-y-12">
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  Response time
                </span>
                <p className="text-2xl text-foreground">Within 24 hours</p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  What to include
                </span>
                <ul className="space-y-2 text-lg text-muted-foreground">
                  <li>• Brief project description</li>
                  <li>• Timeline expectations</li>
                  <li>• Budget range (optional)</li>
                </ul>
              </div>

              <div className="border-t border-border pt-12">
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-4">
                  Not ready to commit?
                </span>
                <p className="text-lg text-foreground">
                  That's fine. Send a message anyway. 
                  <br />
                  <span className="text-primary">Let's just talk.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;

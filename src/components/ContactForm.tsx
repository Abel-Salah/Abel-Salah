import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent.",
      description: "I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-8 max-w-xl"
    >
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-xs uppercase tracking-wider text-muted-foreground"
        >
          Name
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-14 text-lg"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-xs uppercase tracking-wider text-muted-foreground"
        >
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-14 text-lg"
          placeholder="your@email.com"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-xs uppercase tracking-wider text-muted-foreground"
        >
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground min-h-[200px] text-lg resize-none"
          placeholder="Tell me about your project..."
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-16 text-lg font-semibold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </motion.form>
  );
};

export default ContactForm;

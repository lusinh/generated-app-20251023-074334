import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Feather, BookOpen, MessageSquare, Star, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api-client';
import type { Lead } from '@shared/types';
const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];
const leadSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});
type LeadFormData = z.infer<typeof leadSchema>;
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={cn(
      "sticky top-0 z-50 transition-colors duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-transparent">
          <a href="#home" className="flex items-center gap-2 text-xl font-bold font-mono uppercase tracking-wider">
            <Feather className="w-6 h-6 text-foreground" />
            GrowthPad
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors uppercase">
                {link.name}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-6 mt-8">
                  {navLinks.map((link) => (
                    <a key={link.name} href={link.href} className="text-lg font-mono text-foreground hover:text-primary-foreground/80 transition-colors uppercase">
                      {link.name}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
const HeroSection = () => {
  return (
    <section id="home" className="pt-24 pb-32 md:pt-32 md:pb-48 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-medium text-foreground leading-tight text-balance">
            Your Personal Content Catalyst.
          </h1>
          <p className="mt-6 max-w-3xl text-base md:text-lg text-muted-foreground text-balance">
            Unlock your potential with personalized content tutoring. From essays to creative writing, I'll help you find your voice and craft compelling narratives that stand out.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="default" className="rounded-none font-mono uppercase tracking-wider text-base px-8 py-6 transition-all hover:bg-foreground/80 active:scale-95">
              <a href="#contact">Get Started</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-none font-mono uppercase tracking-wider text-base px-8 py-6 transition-all hover:bg-secondary active:scale-95">
              <a href="#services">Learn More</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
const services = [
  { icon: BookOpen, title: "Academic Writing", description: "Master essays, research papers, and dissertations with structured guidance and critical feedback." },
  { icon: Feather, title: "Creative Storytelling", description: "Develop your unique voice in fiction, poetry, or screenwriting through creative exercises and mentorship." },
  { icon: MessageSquare, title: "Content Strategy", description: "Learn to create engaging blog posts, articles, and social media content that captivates your audience." },
];
const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left space-y-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-display font-medium">How I Can Help</h2>
          <p className="text-lg text-muted-foreground">Tailored tutoring to elevate your writing skills, no matter your goal.</p>
        </div>
        <div className="mt-16 grid gap-px md:grid-cols-3 bg-border">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-8"
            >
              <service.icon className="w-8 h-8 text-foreground mb-4" />
              <h3 className="text-xl font-semibold font-sans mb-2">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const testimonials = [
  { name: "Sarah L.", role: "University Student", text: "My grades improved dramatically. The feedback was insightful and helped me understand not just what to fix, but why." },
  { name: "Michael B.", role: "Aspiring Author", text: "I finally finished my first novel! The guidance on plot and character development was invaluable. I couldn't have done it without this support." },
  { name: "Jessica P.", role: "Marketing Manager", text: "Our blog engagement has skyrocketed. Learning how to write for our audience has been a game-changer for our business." },
];
const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left space-y-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-display font-medium">What My Clients Say</h2>
          <p className="text-lg text-muted-foreground">Real stories from writers who have found their stride.</p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border p-6 rounded-none"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-foreground fill-current" />)}
              </div>
              <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold font-sans">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&grayscale=1" alt="Tutor" className="aspect-[4/3] object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-display font-medium">About Me</h2>
            <p className="text-lg text-muted-foreground">
              Hi, I'm Alex. With over a decade of experience in professional writing and editing, I've dedicated my career to helping others unlock their storytelling potential. I believe that everyone has a unique voice, and my mission is to provide the tools and confidence to make that voice heard.
            </p>
            <p className="text-lg text-muted-foreground">
              My approach is collaborative and encouraging. We'll work together to identify your strengths, overcome challenges, and develop a writing process that works for you.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
const ContactSection = () => {
  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", message: "" },
  });
  const { formState: { isSubmitting } } = form;
  const onSubmit: SubmitHandler<LeadFormData> = async (data) => {
    try {
      await api<Lead>('/api/leads', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      toast.success("Message sent!", {
        description: "Thanks for reaching out. I'll get back to you shortly.",
      });
      form.reset();
    } catch (error) {
      toast.error("Something went wrong.", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    }
  };
  return (
    <section id="contact" className="py-16 md:py-24 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left space-y-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-display font-medium">Ready to Start Writing?</h2>
          <p className="text-lg text-muted-foreground">Send me a message and let's discuss how I can help you achieve your goals.</p>
        </div>
        <div className="mt-12 max-w-xl">
          <div className="border p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono uppercase text-xs">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} className="rounded-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono uppercase text-xs">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} className="rounded-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono uppercase text-xs">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell me about your writing goals..." {...field} rows={5} className="rounded-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full rounded-none font-mono uppercase tracking-wider" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};
const Footer = () => {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="https://twitter.com/cloudflare" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground"><span className="sr-only">Twitter</span><Twitter className="h-6 w-6" /></a>
            <a href="https://www.linkedin.com/company/cloudflare/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground"><span className="sr-only">LinkedIn</span><Linkedin className="h-6 w-6" /></a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm text-muted-foreground">&copy; {new Date().getFullYear()} GrowthPad. All rights reserved.</p>
            <p className="text-center text-xs text-muted-foreground/80 mt-1">Built with ❤️ at Cloudflare</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export function HomePage() {
  return (
    <div className="bg-background text-foreground font-sans antialiased">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
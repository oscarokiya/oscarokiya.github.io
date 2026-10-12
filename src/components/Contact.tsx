import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";

export const Contact = () => {
  return (
    <section 
      id="contact" 
      className="px-4 min-h-screen flex items-center justify-center py-20 bg-muted/20"
    >
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">
              Let's discuss your project or just say hello. I'd love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">oscarokiya35@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+254 797 127750</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/oscarrobert-star"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4"
                  >
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Github className="h-5 w-5 text-primary" />
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/oscar-robert-okiya/"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4"
                  >
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Linkedin className="h-5 w-5 text-primary" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-6 p-8 md:p-10 rounded-lg border border-border/50 backdrop-blur-sm bg-card/80">
              <h3 className="text-2xl font-semibold">Ready to get started?</h3>
              <p className="text-muted-foreground">
                For project inquiries or collaborations, the best way to reach me is directly.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="mailto:oscarokiya35@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Me
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:+254797127750">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Me
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
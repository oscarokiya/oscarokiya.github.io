import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, Database, Layers } from "lucide-react";

export const About = () => {
  const skills = [
    "Microservices", "Event-Driven Architecture", "CQRS", "Domain-Driven Design", "API Gateway", 
    "Load Balancing", "Distributed Systems", "Kubernetes", "AWS", "System Integration"
  ];

  return (
    <section id="about" className="py-20 px-4 bg-muted/20 circuit-pattern relative">
      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&crop=center" 
          alt="Technology infrastructure and system architecture" 
          className="w-full h-full object-cover opacity-8"
        />
      </div> */}

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">About Me</h2>
          <p className="text-lg text-muted-foreground">
            I'm a solutions architect with extensive experience in designing and defining architectural patterns for distributed systems. 
            I specialize in transforming complex business requirements into scalable, maintainable, and resilient designs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="relative overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border border-border/50 hover:border-primary/20 bg-card/80 backdrop-blur-sm">
            {/* <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
              <img 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=200&fit=crop&crop=center" 
                alt="Network visualization" 
                className="w-full h-full object-cover"
              />
            </div> */}
            <CardContent className="p-6 text-center relative z-10">
              <Network className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Distributed Systems</h3>
              <p className="text-muted-foreground">
                Designing resilient, scalable architectures with microservices, event-driven patterns, and fault tolerance.
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border border-border/50 hover:border-primary/20 bg-card/80 backdrop-blur-sm">
            {/* <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
              <img 
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&h=200&fit=crop&crop=center" 
                alt="Data visualization" 
                className="w-full h-full object-cover"
              />
            </div> */}
            <CardContent className="p-6 text-center relative z-10">
              <Database className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Data Architecture</h3>
              <p className="text-muted-foreground">
                Implementing CQRS, event sourcing, and polyglot persistence patterns for optimal data management.
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border border-border/50 hover:border-primary/20 bg-card/80 backdrop-blur-sm">
            {/* <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
              <img 
                src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=200&h=200&fit=crop&crop=center" 
                alt="System integration" 
                className="w-full h-full object-cover"
              />
            </div> */}
            <CardContent className="p-6 text-center relative z-10">
              <Layers className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">System Integration</h3>
              <p className="text-muted-foreground">
                Creating seamless integrations between systems using API gateways, message brokers, and orchestration patterns.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">Architecture Patterns & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
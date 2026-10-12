import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Mic, FolderGit2, ExternalLink } from "lucide-react";

export const Highlights = () => {
  const certifications = [
    "AWS Certified Solutions Architect – Professional",
    "AWS Certified DevOps Engineer – Professional",
    "AWS Certified Machine Learning – Specialty",
  ];

  const talks = [
    {
      title: "System Design for DevOps Engineers",
      event: "Africa DevOps Summit 2.0",
      year: "2025",
      description: "Hands-on session for 500+ attendees covering requirements, microservices, API and database design, and full cloud deployment of a resilient e-commerce platform.",
    },
    {
      title: "CI/CD Fundamentals",
      event: "Catholic University of Eastern Africa",
      year: "2025",
      description: "Guest lecture on modern deployment practices, automation and DevOps principles for computer science students.",
    },
  ];

  const project = {
    title: "Resilient E-Commerce Platform on AWS",
    description: "A microservice-based e-commerce platform designed from a business case through to deployment: CloudFront and WAF at the edge, API Gateway, Cognito, ElastiCache, SNS for events and Stripe for payments. It's the reference project from my Africa DevOps Summit talk, and the design decisions are written up as a series on my blog.",
    technologies: ["AWS", "Microservices", "Python", "API Gateway", "Cognito", "Stripe"],
    repo: "https://github.com/oscarrobert-star/ecommerce-project",
  };

  const cardClass = "h-full group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/20";

  return (
    <section id="highlights" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center gradient-text">Highlights</h2>

          <Card className={`${cardClass} mb-8`}>
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <FolderGit2 className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">Featured project</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                ))}
              </div>
              <Button asChild>
                <a href={project.repo} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className={cardClass}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Certifications</h3>
                </div>
                <ul className="space-y-3">
                  {certifications.map((cert) => (
                    <li key={cert} className="text-muted-foreground">{cert}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className={cardClass}>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mic className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Speaking</h3>
                </div>
                <div className="space-y-5">
                  {talks.map((talk) => (
                    <div key={talk.title}>
                      <p className="font-medium">{talk.title}</p>
                      <p className="text-sm text-primary mb-1">{talk.event} · {talk.year}</p>
                      <p className="text-sm text-muted-foreground">{talk.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Trophy } from "lucide-react";

export const Experience = () => {
  const [visibleWinsIndex, setVisibleWinsIndex] = useState(null);

  const experiences = [
    {
      title: "Lead Solutions Architect",
      company: "4G Capital",
      period: "2022 - Present",
      description: "Architected and led the implementation of scalable, cost-effective cloud infrastructure and CI/CD pipelines.",
      technologies: ["AWS", "GCP", "Terraform", "Kubernetes", "Python"],
      wins: [
        "Led a cross-cloud migration from AWS to GCP, architecting the infrastructure with Terraform to achieve a 20% reduction in operational overhead and improved cost efficiency.",
        "Collaborated with finance to design and implement a payment validation system, reducing reconciliation errors by 90% and significantly improving financial accuracy.",
        "Optimized USSD platform performance by identifying and resolving networking and latency bottlenecks, reducing latencies to under 10 seconds and enhancing customer experience.",
        "Mentored and guided a team of 4 junior engineers, leading to a 40% improvement in team productivity and onboarding efficiency."
      ]
    },
    {
      title: "Devops & Cloud Engineer",
      company: "AJUA",
      period: "2021 - 2022",
      description: "Spearheaded the migration of monolithic systems to containerized, cloud-based microservices, enhancing scalability.",
      technologies: ["AWS", "Docker", "Kubernetes", "Linux", "Java"],
      wins: [
        "Championed the adoption of containerization, leading to a 40% reduction in infrastructure costs and significantly improved application scalability.",
        "Executed a strategic migration to a closer AWS region (Ireland) from N. Virginia, reducing user-facing latency by 75%.",
        "Automated deployment processes by implementing robust CI/CD pipelines using AWS CodePipeline, which reduced manual intervention by 80%."
      ]
    },
    {
      title: "Cloud Engineer",
      company: "Recon AI",
      period: "2021 - 2021",
      description: "Built scalable and resilient cloud infrastructure and automated deployment workflows for AI applications.",
      technologies: ["AWS", "CloudFormation", "GitLab CI", "Linux", "Python"],
      wins: [
        "Leveraged AWS CloudFormation to automate the creation of a scalable and resilient cloud infrastructure, including ECS, load balancers, and auto-scaling groups.",
        "Successfully integrated GitLab with AWS to fully automate the deployment process, reducing manual effort and accelerating delivery times."
      ]
    }
  ];

  const handleToggleWins = (index) => {
    setVisibleWinsIndex(visibleWinsIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Career Roadmap</h2>

          <div className="relative">
            {/* Vertical Roadmap Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 dark:bg-gray-800 rounded-full"></div>

            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`
                  mb-12 flex flex-col items-center w-full relative
                  md:flex-row md:justify-center md:items-start
                `}
              >
                {/* Roadmap Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10"></div>
                
                {/* Main Experience Card */}
                <Card 
                  className={`
                    relative w-full md:w-[45%] z-0 
                    ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto md:order-last'}
                    group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/20
                  `}
                >
                  <CardContent className="p-6">
                    <CardTitle 
                      className="text-xl group-hover:text-primary transition-colors duration-300"
                    >
                      {exp.title}
                    </CardTitle>
                    <p className="text-lg text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* View/Hide Wins Button */}
                    <div className="mt-4 flex items-center justify-end">
                      <Button 
                        variant="ghost" 
                        className="p-2 h-auto text-muted-foreground hover:bg-transparent hover:text-primary/80 transition-colors"
                        onClick={() => handleToggleWins(index)}
                      >
                        <span className="text-xs mr-1">
                          {visibleWinsIndex === index ? 'Hide Wins' : 'View Wins'}
                        </span>
                        <Trophy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Conditional rendering of Wins Card */}
                {visibleWinsIndex === index && (
                  <Card 
                    className={`
                      w-full md:w-[45%] mt-4 md:mt-0 z-0
                      group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/20
                      ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}
                    `}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center text-lg font-bold mb-2">
                        <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                        Key Accomplishments
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {exp.wins.map((win, i) => (
                          <li key={i}>{win}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" asChild>
              <a href={`${import.meta.env.BASE_URL}CV_Oscar_Okiya.pdf`} download>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
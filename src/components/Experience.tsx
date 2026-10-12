import { useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Trophy } from "lucide-react";

export const Experience = () => {
  const [visibleWinsIndex, setVisibleWinsIndex] = useState(null);

  const experiences = [
    {
      title: "Senior DevOps Engineer (Acting Infrastructure Solution Architect)",
      company: "4G Capital, Nairobi",
      period: "Mar 2022 – Present",
      description: "Co-lead architect on two end-to-end infrastructure modernisation programmes for fintech systems serving 800,000+ customers.",
      technologies: ["GCP", "AWS", "Terraform", "Cloud Run", "Kubernetes", "OpenSearch"],
      wins: [
        "Scoped and co-led two modernisation programmes: AWS ECS to serverless (AWS SAM/CloudFormation), then a full cross-cloud migration to GCP Cloud Run with Terraform, cutting cloud costs by 30% and eliminating manual (ClickOps) changes.",
        "Accelerated software delivery by 50% with a unified CI/CD architecture across AWS and GCP and a shift from GitFlow to trunk-based development.",
        "Designed a payment validation solution that reduced reconciliation errors by 90%.",
        "Architected a high-concurrency messaging platform delivering to 200,000+ customers within a 5-minute window, with capacity planning and cost-per-broadcast reporting.",
        "Built the platform observability practice from scratch: SLIs, SLOs, SLAs, DORA metrics and OpenSearch dashboards that inform capacity planning.",
        "Introduced Terraform Cloud so every infrastructure change is reviewed, versioned and audited.",
        "Mentored 4 junior engineers, improving onboarding speed by 40%."
      ]
    },
    {
      title: "DevOps Engineer",
      company: "Ajua, Nairobi",
      period: "Jun 2021 – Jun 2022",
      description: "Modernised the infrastructure platform, moving services from EC2 to containers on AWS ECS with Terraform-managed infrastructure.",
      technologies: ["AWS", "ECS", "Terraform", "Vault", "Consul", "PostgreSQL"],
      wins: [
        "Consolidated multi-region infrastructure (N. Virginia and Oregon into Ireland) and introduced CloudFront, cutting latency by 75% and infrastructure spend by 40%.",
        "Migrated all services from EC2 to AWS ECS, standardising deployments and automating rollbacks.",
        "Configured HashiCorp Vault and Consul for secrets management and service discovery, and adopted Terraform for all provisioning.",
        "Migrated PostgreSQL from self-managed EC2 to AWS RDS with replication, and consolidated client VPN connectivity."
      ]
    },
    {
      title: "AWS Cloud Consultant",
      company: "Recon AI, Helsinki (Remote)",
      period: "Jan 2021 – Mar 2021",
      description: "Migrated an international client's infrastructure from a contractor-managed GCP environment to AWS.",
      technologies: ["AWS", "CloudFormation", "GitLab CI", "EC2", "Auto Scaling"],
      wins: [
        "Gathered requirements and architected a scalable, resilient AWS solution (CloudFormation, EC2, ALB, Auto Scaling Groups), presenting the migration design and trade-offs to client stakeholders.",
        "Integrated GitLab with AWS to automate CI/CD, and implemented backup and disaster recovery using S3 and EBS snapshots."
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
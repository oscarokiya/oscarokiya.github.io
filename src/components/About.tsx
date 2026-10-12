import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, GitBranch, Activity } from "lucide-react";

export const About = () => {
  const services = [
    {
      icon: Cloud,
      title: "Cloud Migration & Cost",
      description: "Moving workloads between AWS and GCP, or from VMs to containers and serverless, planned around risk and rolled out with Terraform.",
      result: "Cut cloud costs by 30% in an AWS-to-GCP migration",
    },
    {
      icon: GitBranch,
      title: "Delivery & Infrastructure as Code",
      description: "CI/CD across clouds, trunk-based development and Terraform Cloud, so every infrastructure change is reviewed, versioned and audited.",
      result: "Shipped software 50% faster",
    },
    {
      icon: Activity,
      title: "Reliability & Observability",
      description: "SLIs, SLOs, DORA metrics and dashboards that show how a platform is really performing and where capacity is needed next.",
      result: "Messaging to 200,000+ customers within 5 minutes",
    },
  ];

  const skills = [
    "AWS", "GCP", "Kubernetes (EKS, GKE)", "Terraform", "Cloud Run", "Docker",
    "GitHub Actions", "GitLab CI", "Prometheus", "Grafana", "OpenSearch", "HashiCorp Vault", "Python", "Bash"
  ];

  return (
    <section id="about" className="py-20 px-4 bg-muted/20 circuit-pattern relative">
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">About Me</h2>
          <p className="text-lg text-muted-foreground mb-4">
            I'm a Nairobi-based cloud infrastructure engineer with 5+ years building platforms for fintech,
            where downtime and payment errors cost real money. I take infrastructure work from requirements
            and risk assessment through design, migration and rollout.
          </p>
          <p className="text-lg text-muted-foreground">
            I also explain the trade-offs: I've presented migration plans to client stakeholders,
            written the proposals that won buy-in from leadership, and taught system design to 500+ engineers.
          </p>
        </div>

        <h3 className="text-2xl font-semibold mb-8 text-center">What I Can Help With</h3>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map(({ icon: Icon, title, description, result }) => (
            <Card key={title} className="relative overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 border border-border/50 hover:border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center relative z-10 flex flex-col h-full">
                <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{title}</h4>
                <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
                <p className="text-sm font-medium text-primary">{result}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">Tools I Work With</h3>
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

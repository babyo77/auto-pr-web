import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Alex Turner",
    role: "Lead Developer at Stripe",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    quote:
      "Auto-PR has revolutionized how we handle code reviews. The AI catches edge cases we might miss and has significantly improved our code quality.",
  },
  {
    name: "Maria Garcia",
    role: "Engineering Manager at Shopify",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    quote:
      "We've reduced our PR review time by 60% since implementing Auto-PR. The automated suggestions are spot-on and help our team maintain high standards.",
  },
  {
    name: "John Smith",
    role: "Senior Software Engineer at Airbnb",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    quote:
      "The AI's ability to understand our codebase context is impressive. It's like having a senior developer who knows our entire codebase reviewing every PR.",
  },
  {
    name: "Priya Patel",
    role: "Tech Lead at MongoDB",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    quote:
      "Auto-PR has become indispensable for our team. It catches potential bugs early and provides educational feedback that helps junior developers grow.",
  },
  {
    name: "Thomas Anderson",
    role: "DevOps Lead at Docker",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    quote:
      "Integration with our CI/CD pipeline was seamless. Auto-PR's automated checks have helped us maintain consistent code quality across all our repositories.",
  },
  {
    name: "Sophie Zhang",
    role: "Full Stack Developer at Vercel",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    quote:
      "As part of a small team, Auto-PR acts like an additional senior developer. Its suggestions have helped us maintain enterprise-grade code quality.",
  },
  {
    name: "Daniel Lee",
    role: "CTO at Scale AI",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    quote:
      "Auto-PR's machine learning capabilities are remarkable. It learns from our codebase and provides increasingly relevant suggestions over time.",
  },
  {
    name: "Emma Wilson",
    role: "Open Source Maintainer at React",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    quote:
      "Managing our open source project became much more efficient with Auto-PR. It helps us maintain quality standards across hundreds of contributors.",
  },
  {
    name: "Ryan Martinez",
    role: "Software Architect at Databricks",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    quote:
      "The depth of Auto-PR's code analysis is outstanding. It identifies architectural patterns and suggests improvements that truly matter for long-term maintainability.",
  },
];

const chunkArray = (
  array: Testimonial[],
  chunkSize: number
): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const testimonialChunks = chunkArray(
  testimonials,
  Math.ceil(testimonials.length / 3)
);

export default function WallOfLoveSection() {
  return (
    <section>
      <div className=" py-14 md:py-20 pb-0">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-title text-4xl lg:text-5xl font-semibold">
              Trusted by Developers Worldwide
            </h2>
            <p className="text-body mt-4">
              See how Auto-PR is transforming code review processes and
              improving development workflows across teams.
            </p>
          </div>
          <div className="mt-8 grid gap-3 [--color-card:var(--color-muted)] sm:grid-cols-2 md:mt-12 lg:grid-cols-3 [--color-muted:var(--color-zinc-900)]">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className="space-y-3 *:border-none *:shadow-none"
              >
                {chunk.map(({ name, role, quote, image }, index) => (
                  <Card key={index} className="bg-zinc-300/10">
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                      <Avatar className="size-9">
                        <AvatarImage
                          alt={name}
                          src={image}
                          loading="lazy"
                          width="120"
                          height="120"
                        />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">{name}</h3>

                        <span className="text-muted-foreground block text-sm tracking-wide">
                          {role}
                        </span>

                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            {quote}
                          </p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

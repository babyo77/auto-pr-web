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
    name: "Miraya",
    role: "Design Engineer",
    image: "https://avatars.githubusercontent.com/u/71933266?v=4",
    quote:
      "Auto-PR automatically writes pull requests that document my design and technical changes. I can focus on creating beautiful applications instead of writing PR descriptions.",
  },
  {
    name: "Meyank Singh",
    role: "DevOps Engineer",
    image: "https://avatars.githubusercontent.com/u/111943685?v=4",
    quote:
      "Auto-PR automatically writes my pull requests with detailed explanations of infrastructure changes. No manual writing needed.",
  },
  {
    name: "Ami",
    role: "Full-Stack Developer",
    image: "https://avatars.githubusercontent.com/u/55032197?v=4",
    quote:
      "Auto-PR automatically documents my TypeScript changes in Next.js projects. It saves me time to focus on creating stunning user experiences.",
  },
  {
    name: "Zade",
    role: "Creator of vouz",
    image: "https://avatars.githubusercontent.com/u/78777405?v=4",
    quote:
      "I just commit my code and Auto-PR writes perfect PR descriptions instantly. It saves me from explaining technical changes.",
  },

  {
    name: "Naman Rai",
    role: "Full-stack Developer",
    image: "https://avatars.githubusercontent.com/u/88327184?v=4",
    quote:
      "Auto-PR writes my pull requests automatically based on my code changes. No more struggling to document what I've changed.",
  },

  {
    name: "Arsdeep",
    role: "Data Scientist",
    image: "https://avatars.githubusercontent.com/u/61946367?v=4",
    quote:
      "Auto-PR documents my Python data analysis code changes perfectly. It understands NumPy and Pandas dependencies without me explaining anything.",
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
              Loved by Developers Everywhere
            </h2>
            <p className="text-body mt-4">
              Perfect PR titles and descriptions, generated automatically.
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
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3">
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

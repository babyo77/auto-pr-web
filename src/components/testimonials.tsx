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
      "Honestly, this has been a lifesaver for me. I used to dread writing PR descriptions, but now I can just focus on my actual design work. Such a relief!",
  },
  {
    name: "Meyank Singh",
    role: "DevOps Engineer",
    image: "https://avatars.githubusercontent.com/u/111943685?v=4",
    quote:
      "I was skeptical at first, but wow - it actually gets my infrastructure changes right! Saves me at least an hour each day of tedious documentation.",
  },
  {
    name: "Ami",
    role: "Full-Stack Developer",
    image: "https://avatars.githubusercontent.com/u/55032197?v=4",
    quote:
      "My team kept complaining about my vague PR descriptions. Not anymore! Now they're comprehensive and clear without me spending extra time on them.",
  },
  {
    name: "Zade",
    role: "Creator of vouz",
    image: "https://avatars.githubusercontent.com/u/78777405?v=4",
    quote:
      "As someone who builds tools myself, I appreciate good automation. This is exactly what I needed - it just works, and the descriptions are spot on.",
  },
  {
    name: "Naman Rai",
    role: "Full-stack Developer",
    image: "https://avatars.githubusercontent.com/u/88327184?v=4",
    quote:
      "Look, I'm not great at explaining my code changes. Never have been. This tool gets it though, and somehow puts it in better words than I ever could.",
  },
  {
    name: "Arsdeep",
    role: "Data Scientist",
    image: "https://avatars.githubusercontent.com/u/61946367?v=4",
    quote:
      "Working with data means constant iteration. I was drowning in PR documentation until I found this. Even catches the nuances in my Python dependencies!",
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
      <div className=" py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-title text-4xl lg:text-5xl font-semibold">
              Loved by Developers Everywhere
            </h2>
            <p className="text-body mt-4">What other developers are saying.</p>
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

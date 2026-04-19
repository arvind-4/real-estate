import type { ComponentType } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@src/components/ui/button";
import { MedalIcon, SparklesIcon, StarIcon, TargetIcon } from "lucide-react";
import Image from "next/image";

type StatItem = {
  icon: ComponentType;
  value: string;
  description: string;
}[];

const AboutUs = ({ stats }: { stats: StatItem }) => {
  return (
    <section className="bg-muted py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center md:mb-16 lg:mb-24">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
            About Us
          </h2>
          <p className="text-muted-foreground text-xl">
            Our achievement story stands as a powerful testament to teamwork and perseverance.
            United, we have faced challenges, celebrated victories, and woven a narrative of growth
            and success.
          </p>

          <Button size="lg" asChild className="group rounded-lg text-base has-[>svg]:px-6">
            <a href="#">
              Read more
              <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>

        <div className="relative mb-8 w-full max-lg:space-y-6 sm:mb-16 lg:mb-24">
          <div className="relative w-full h-[400px] sm:h-[500px]">
            <Image
              src="/about-us.webp"
              alt="About us illustration"
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 1024px) 100vw, 75vw"
            />
          </div>
          <div className="bg-background grid gap-10 rounded-md border p-8 sm:max-lg:grid-cols-2 lg:absolute lg:-bottom-25 lg:left-1/2 lg:w-3/4 lg:-translate-x-1/2 lg:grid-cols-4 lg:px-10 xl:w-max">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2.5 text-center"
              >
                <div className="flex size-7 items-center justify-center [&>svg]:size-7">
                  <stat.icon />
                </div>
                <span className="text-2xl font-semibold">{stat.value}</span>
                <p className="text-muted-foreground text-lg">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const stats = [
  {
    icon: SparklesIcon,
    value: "20+",
    description: "Years of Experience",
  },
  {
    icon: TargetIcon,
    value: "70+",
    description: "Successful Projects",
  },
  {
    icon: StarIcon,
    value: "550+",
    description: "Customer Reviews",
  },
  {
    icon: MedalIcon,
    value: "25",
    description: "Achieve Awards",
  },
];

const AboutUsPage = () => {
  return <AboutUs stats={stats} />;
};

export default AboutUsPage;

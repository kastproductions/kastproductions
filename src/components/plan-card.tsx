import type { ComponentProps, ReactNode } from "react";
import type { Price } from "@/app/content";
import { UnitBody } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/*
 * One way to buy, as a card: what it is, what it costs, what it includes,
 * and the one link that asks for it. The home page, the custom door, a job
 * page and a product page all print prices this way, so the card lives here
 * rather than in four page files. `lead` sets the card in the signature
 * blue, which is how the price list marks the plan it leads with, and makes
 * its link the filled one.
 */
export function PlanCard({
  title,
  body,
  prices,
  includes = [],
  href,
  cta,
  lead = false,
}: {
  title: ReactNode;
  body: ReactNode;
  prices: Price[];
  includes?: string[];
  href: string;
  cta: ReactNode;
  lead?: boolean;
}) {
  return (
    <Card className={cn(lead && "dark border-transparent")} size="lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <p>{body}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-col gap-1 border-t border-hairline pt-4">
          {prices.map((price) => (
            <div
              className="font-heading text-[1.9rem] leading-tight font-extrabold tracking-[-0.04em]"
              key={price.per}
            >
              {price.amount}{" "}
              <span className="mt-0.5 block font-sans text-[0.84rem] font-medium tracking-normal text-faint">
                {price.per}
              </span>
            </div>
          ))}
        </div>
        {includes.length > 0 ? (
          <ul className="mt-4 grid gap-2 text-[0.88rem] leading-normal text-prose *:relative *:pl-4 *:before:absolute *:before:top-[0.7em] *:before:left-0 *:before:h-px *:before:w-2 *:before:bg-foreground">
            {includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </CardContent>
      <CardFooter>
        <a
          className={cn(buttonVariants({ variant: lead ? "default" : "outline" }), "w-full")}
          href={href}
        >
          {cta}
        </a>
      </CardFooter>
    </Card>
  );
}

/* The price cards, side by side where they fit, as a section's body column.
 * A note under them spans the row. */
export function Plans({ className, ...props }: ComponentProps<"div">) {
  return (
    <UnitBody
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(min(100%,17rem),1fr))] items-stretch gap-4 [&>p]:col-span-full",
        className,
      )}
      {...props}
    />
  );
}

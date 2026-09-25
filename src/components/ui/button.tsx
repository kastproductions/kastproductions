import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/*
 * Every call to action on the site is a link, so pages use `buttonVariants`
 * on an <a> or a <Link> and keep it a server-rendered anchor. The pill, the
 * heading face and the lift on hover are the brand's; `default` is the one
 * action a reader can take, `outline` the one beside it.
 */
const buttonStyles = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding font-heading leading-tight font-semibold whitespace-nowrap no-underline transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-settle outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-250 [&_svg:not([class*='size-'])]:size-[0.9em]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_8px_18px_-12px_rgb(21_20_15/0.7)] hover:-translate-y-px hover:bg-signal hover:shadow-[0_12px_22px_-12px_rgb(226_98_78/0.8)] hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5",
        outline:
          "border-border bg-transparent text-foreground hover:border-foreground hover:bg-accent aria-expanded:border-foreground aria-expanded:bg-primary aria-expanded:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 gap-2.5 px-6 text-[0.95rem]",
        xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-2 px-4 text-[0.88rem]",
        lg: "h-12 gap-2.5 px-7 text-base",
        icon: "size-11",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/* The variant classes, merged, so a variant's border or colour replaces the
 * base one on a plain anchor exactly as it does inside <Button>. */
function buttonVariants(props?: VariantProps<typeof buttonStyles>) {
  return cn(buttonStyles(props))
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonStyles>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }

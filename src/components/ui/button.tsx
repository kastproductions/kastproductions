import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/*
 * Every call to action on the site is a link, so pages use `buttonVariants`
 * on an <a> or a <Link> and keep it a server-rendered anchor. `default` is
 * the one action a reader can take, filled in the signature blue; `outline`
 * is the one beside it, drawn with a grey edge.
 */
const buttonStyles = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding font-semibold whitespace-nowrap no-underline transition-[background-color,color,border-color] duration-150 ease-settle outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 [&_svg:not([class*='size-'])]:size-[0.95em]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5",
        outline:
          "border-border bg-card text-foreground hover:border-input hover:bg-accent aria-expanded:bg-foreground aria-expanded:text-background",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-accent aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 gap-2 px-5 text-note",
        xs: "h-6 gap-1 px-2 text-label-sm [&_svg:not([class*='size-'])]:size-3",
        sm: "h-10 gap-1.5 px-4 text-small",
        lg: "h-12 gap-2 px-6 text-body",
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

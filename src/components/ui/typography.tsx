import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const typographyVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        h4: "scroll-m-20 text-xl font-semibold tracking-tight",
        h5: "scroll-m-20 text-lg font-semibold tracking-tight",
        h6: "scroll-m-20 text-base font-semibold tracking-tight",
        p: "leading-7 [&:not(:first-child)]:mt-6",
        blockquote: "mt-6 border-l-2 pl-6 italic",
        table: "my-6 w-full overflow-y-auto",
        list: "my-6 ml-6 list-disc [&>li]:mt-2",
        inlineCode: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium",
        lead: "text-xl text-muted-foreground",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-sm text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "p",
    },
  }
)

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean
  as?: string
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, asChild = false, as, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(typographyVariants({ variant, className }))}
          ref={ref}
          {...props}
        />
      )
    }

    const element = as || getDefaultElement(variant)
    
    return React.createElement(
      element,
      {
        className: cn(typographyVariants({ variant, className })),
        ref,
        ...props
      }
    )
  }
)

function getDefaultElement(variant: TypographyProps["variant"]): string {
  switch (variant) {
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "h4":
      return "h4"
    case "h5":
      return "h5"
    case "h6":
      return "h6"
    case "blockquote":
      return "blockquote"
    case "table":
      return "table"
    case "list":
      return "ul"
    case "inlineCode":
      return "code"
    case "lead":
    case "large":
    case "small":
    case "muted":
    case "p":
    default:
      return "p"
  }
}

Typography.displayName = "Typography"

export { Typography, typographyVariants }

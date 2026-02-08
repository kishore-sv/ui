import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getDocData, getAllDocSlugs } from "@/lib/mdx"
import { ComponentPreview, CodeBlock, PropsTable } from "@/components/mdx-components"
import { TextGenerateEffect } from "@/components/text-generate-effect"
import { HoverBorderGradient } from "@/components/hover-border-gradient"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AntigravityCanvas } from "@/components/antigravity-canvas"

interface DocPageProps {
    params: Promise<{
        slug?: string[]
    }>
}

const components = {
    ComponentPreview,
    CodeBlock,
    TextGenerateEffect,
    HoverBorderGradient,
    Badge,
    Separator,
    AntigravityCanvas,
    PropsTable,
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className={"scroll-m-20 text-4xl font-bold tracking-tight mb-4"}
            {...props}
        />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className={"scroll-m-20 border-b border-border/40 pb-2 text-2xl font-semibold tracking-tight first:mt-0 mt-10 mb-4"}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className={"scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-4"}
            {...props}
        />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className={"leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground"}
            {...props}
        />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={"my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground"} {...props} />
    ),
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 w-full overflow-y-auto">
            <table className={"w-full border-collapse border border-border/40 text-sm"} {...props} />
        </div>
    ),
    th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className={"border border-border/40 bg-muted/50 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"}
            {...props}
        />
    ),
    td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className={"border border-border/40 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"}
            {...props}
        />
    ),
}

export default async function DocPage({ params }: DocPageProps) {
    const resolvedParams = await params
    const slug = resolvedParams.slug || ["introduction"]
    const doc = await getDocData(slug)

    if (!doc) {
        notFound()
    }

    return (
        <div className="max-w-3xl">
            <div className="mb-8 space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{doc.frontmatter.title}</h1>
                {doc.frontmatter.description && (
                    <p className="text-xl text-muted-foreground">{doc.frontmatter.description}</p>
                )}
            </div>
            <Separator className="my-8" />
            <div className="prose prose-zinc dark:prose-invert max-w-none">
                <MDXRemote source={doc.content} components={components} />
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const slugs = await getAllDocSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

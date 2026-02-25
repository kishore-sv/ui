export interface NavItem {
    title: string
    href?: string
    items?: NavItem[]
}

export interface NavSection {
    title: string
    items: NavItem[]
}

export const docsConfig: NavSection[] = [
    {
        title: "Getting Started",
        items: [
            {
                title: "Introduction",
                href: "/docs",
            },
            {
                title: "Installation",
                href: "/docs/installation",
            },
        ],
    },
    {
        title: "Components",
        items: [
            {
                title: "Text",
                items: [
                    {
                        title: "Text Generate Effect",
                        href: "/docs/components/text-generate-effect",
                    },
                    {
                        title: "Hover Text",
                        href: "/docs/components/hover-text",
                    },
                ]
            },
            {
                title: "Background",
                items: [
                    {
                        title: "AntiGravityField",
                        href: "/docs/components/anti-gravity-field"
                    },
                    {
                        title: "Background Beams",
                        href: "/docs/components/background-beams",
                    },
                    {
                        title: "Background Gradient",
                        href: "/docs/components/background-gradient",
                    },
                    {
                        title: "Grid Background",
                        href: "/docs/components/grid-background",
                    },
                ]
            },
            {
                title: "Borders",
                items: [
                    {
                        title: "Hover Border Gradient",
                        href: "/docs/components/hover-border-gradient",
                    },
                    {
                        title: "Moving Border",
                        href: "/docs/components/moving-border",
                    },
                    {
                        title: "Animated border",
                        href: "/docs/components/animated-border",
                    },
                ]
            },
            {
                title: "Animations",
                items: [
                    {
                        title: "Tracing Beam",
                        href: "/docs/components/tracing-beam",
                    },
                    {
                        title: "Evervault Card",
                        href: "/docs/components/evervault-card",
                    },
                    {
                        title: "Animated lines",
                        href: "/docs/components/animated-lines",
                    },
                    {
                        title: "Animated background",
                        href: "/docs/components/animated-background",
                    },
                    {
                        title: "Animated gradient",
                        href: "/docs/components/animated-gradient",
                    },
                    {
                        title: "Animated tracing beam",
                        href: "/docs/components/animated-tracing-beam",
                    },
                    {
                        title: "Animated tracing background",
                        href: "/docs/components/animated-tracing-background",
                    },
                ]
            },
            {
                title: "Layout",
                items: [
                    {
                        title: "Swapy",
                        href: "/docs/components/swapy",
                    },
                    {
                        title: "Grid Generator",
                        href: "/docs/components/grid-generator",
                    },
                ]
            }
        ],
    },
]

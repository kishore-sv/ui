import fs from "fs"
import path from "path"
import matter from "gray-matter"

const DOCS_PATH = path.join(process.cwd(), "content/docs")

export async function getDocData(slug: string[]) {
    const fullPath = path.join(DOCS_PATH, `${slug.join("/")}.mdx`)

    if (!fs.existsSync(fullPath)) {
        // Fallback for debugging
        return {
            slug: slug.join("/"),
            frontmatter: { title: "Debug Page", description: `Path searched: ${fullPath}` },
            content: "The file was not found. Please check the file system.",
        }
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
        slug: slug.join("/"),
        frontmatter: data,
        content,
    }
}

export async function getAllDocSlugs() {
    return [
        ["introduction"],
        ["installation"],
        ["components", "text-generate-effect"],
        ["components", "hover-border-gradient"],
    ]
}

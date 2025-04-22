import { Client } from "@notionhq/client";
import { notFound } from "next/navigation";
import moment from "moment";
import { TypeNotionBlogs } from "../notion-fetch-blog";
import * as HeroIcons from "@heroicons/react/16/solid";
import * as DeveloperIons from "developer-icons";
import Link from "next/link";

type BlogDetailProps = {
  params: {
    title: string;
  };
};

type BlogDetail = TypeNotionBlogs & {
  content: string;
};

async function fetchBlogDetail(title: string): Promise<BlogDetail | null> {
  try {
    const decodedTitle = decodeURIComponent(title);

    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });

    // First try to get all blog posts and then filter on the client side
    // This is more reliable than using exact title matching on the Notion API
    const blogList = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
    });

    if (blogList.results.length === 0) {
      console.error("No blog posts found in the database");
      return null;
    }

    // Filter blogs to find one with a matching title (case insensitive)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchingBlog = blogList.results.find((blog: any) => {
      const blogTitle = blog.properties.Name.title[0]?.plain_text || "";
      return blogTitle.toLowerCase() === decodedTitle.toLowerCase();
    });

    if (!matchingBlog) {
      console.error(`Blog post with title "${decodedTitle}" not found`);
      return null;
    }

    // Fetch the page content
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blockId = (matchingBlog as any).id;
    const response = await notion.blocks.children.list({
      block_id: blockId,
    });

    // Extract content from blocks (enhanced implementation)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = response.results.map((block: any) => {
      if (block.type === 'paragraph') {
        if (block.paragraph.rich_text.length > 0) {
          return block.paragraph.rich_text.map((text: any) => text.plain_text).join('');
        }
        return '';
      } else if (block.type === 'heading_1') {
        return `# ${block.heading_1.rich_text.map((text: any) => text.plain_text).join('')}`;
      } else if (block.type === 'heading_2') {
        return `## ${block.heading_2.rich_text.map((text: any) => text.plain_text).join('')}`;
      } else if (block.type === 'heading_3') {
        return `### ${block.heading_3.rich_text.map((text: any) => text.plain_text).join('')}`;
      } else if (block.type === 'bulleted_list_item') {
        return `• ${block.bulleted_list_item.rich_text.map((text: any) => text.plain_text).join('')}`;
      } else if (block.type === 'numbered_list_item') {
        return `1. ${block.numbered_list_item.rich_text.map((text: any) => text.plain_text).join('')}`;
      }
      return '';
    }).join('\n\n');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {
      created_time: moment((matchingBlog as any).created_time).format("YYYY-MM-DD HH:mm"),
      title: (matchingBlog as any).properties.Name.title[0].plain_text,
      icons: (matchingBlog as any).properties.Icons.multi_select.map(({ name }: { name: string; }) => name),
      platform: (matchingBlog as any).properties.Platform.rich_text[0].plain_text,
      content
    };
  } catch (error) {
    console.error("Error fetching blog detail:", error);
    return null;
  }
}

export default async function BlogDetail({ params }: BlogDetailProps) {
  const blog = await fetchBlogDetail(params.title);

  if (!blog) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PlatformComponent = DeveloperIons[blog.platform as keyof typeof DeveloperIons] as any;

  return (
    <main className="max-w-3xl mx-auto px-4 pt-8 pb-32">
      <Link href="/blog" className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6">
        <HeroIcons.ArrowLeftIcon className="size-4" />
        <span>Back to blog list</span>
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="bg-transparent dark:bg-white p-3 rounded-md">
          <PlatformComponent className="size-10" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">{blog.created_time}</p>
            <div className="flex gap-2">
              {blog.icons.map((icon: string) => {
                const IconComponent = HeroIcons[icon as keyof typeof HeroIcons];
                return (
                  <div key={icon}>
                    <IconComponent className="size-4" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <article className="prose dark:prose-invert max-w-none">
        {blog.content.split('\n\n').map((paragraph, index) => {
          // Handle basic formatting with Tailwind classes
          if (paragraph.startsWith('# ')) {
            return <div key={index} className="text-3xl font-bold mt-6 mb-4">{paragraph.substring(2)}</div>;
          } else if (paragraph.startsWith('## ')) {
            return <div key={index} className="text-2xl font-bold mt-5 mb-3">{paragraph.substring(3)}</div>;
          } else if (paragraph.startsWith('### ')) {
            return <div key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.substring(4)}</div>;
          } else if (paragraph.startsWith('• ')) {
            return <div key={index} className="pl-4 my-2 flex"><span className="mr-2">•</span>{paragraph.substring(2)}</div>;
          } else if (/^\d+\.\s/.test(paragraph)) {
            const num = paragraph.substring(0, paragraph.indexOf('.'));
            return (
              <div key={index} className="pl-4 my-2 flex">
                <span className="mr-2 font-medium">{num}.</span>
                {paragraph.substring(paragraph.indexOf(' ') + 1)}
              </div>
            );
          }
          return <p key={index} className="my-3">{paragraph}</p>;
        })}
      </article>
    </main>
  );
} 
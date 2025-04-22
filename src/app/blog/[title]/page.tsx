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

// Type definitions for Notion API responses
interface NotionRichText {
  plain_text: string;
  annotations?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    code?: boolean;
    color?: string;
  };
  href?: string | null;
}

interface NotionTitle {
  title: NotionRichText[];
}

interface NotionMultiSelect {
  multi_select: Array<{ name: string; }>;
}

interface NotionRichTextProperty {
  rich_text: NotionRichText[];
}

interface NotionProperties {
  Name: NotionTitle;
  Icons: NotionMultiSelect;
  Platform: NotionRichTextProperty;
  [key: string]: unknown;
}

interface NotionPage {
  id: string;
  created_time: string;
  properties: NotionProperties;
}

interface NotionBlock {
  type: string;
  paragraph?: { rich_text: NotionRichText[]; };
  heading_1?: { rich_text: NotionRichText[]; };
  heading_2?: { rich_text: NotionRichText[]; };
  heading_3?: { rich_text: NotionRichText[]; };
  bulleted_list_item?: { rich_text: NotionRichText[]; };
  numbered_list_item?: { rich_text: NotionRichText[]; };
}

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
    const matchingBlog = blogList.results.find((blog) => {
      const blogPage = blog as unknown as NotionPage;
      const titleArr = blogPage.properties.Name.title;
      const blogTitle = titleArr.length > 0 ? titleArr[0].plain_text : "";
      return blogTitle.toLowerCase() === decodedTitle.toLowerCase();
    }) as unknown as NotionPage | undefined;

    if (!matchingBlog) {
      console.error(`Blog post with title "${decodedTitle}" not found`);
      return null;
    }

    // Fetch the page content
    const blockId = matchingBlog.id;
    const response = await notion.blocks.children.list({
      block_id: blockId,
    });

    // Extract content from blocks (enhanced implementation)
    const content = response.results.map((block) => {
      const typedBlock = block as unknown as NotionBlock;

      const extractText = (richTextArr: NotionRichText[] | undefined): string => {
        if (!richTextArr || richTextArr.length === 0) return '';
        return richTextArr.map(text => text.plain_text).join('');
      };

      if (typedBlock.type === 'paragraph') {
        return extractText(typedBlock.paragraph?.rich_text);
      } else if (typedBlock.type === 'heading_1') {
        return `# ${extractText(typedBlock.heading_1?.rich_text)}`;
      } else if (typedBlock.type === 'heading_2') {
        return `## ${extractText(typedBlock.heading_2?.rich_text)}`;
      } else if (typedBlock.type === 'heading_3') {
        return `### ${extractText(typedBlock.heading_3?.rich_text)}`;
      } else if (typedBlock.type === 'bulleted_list_item') {
        return `• ${extractText(typedBlock.bulleted_list_item?.rich_text)}`;
      } else if (typedBlock.type === 'numbered_list_item') {
        return `1. ${extractText(typedBlock.numbered_list_item?.rich_text)}`;
      }
      return '';
    }).filter(Boolean).join('\n\n');

    return {
      created_time: moment(matchingBlog.created_time).format("YYYY-MM-DD HH:mm"),
      title: matchingBlog.properties.Name.title[0].plain_text,
      icons: matchingBlog.properties.Icons.multi_select.map(({ name }) => name),
      platform: matchingBlog.properties.Platform.rich_text[0].plain_text,
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

  // Use type assertion with 'unknown' as intermediate step
  const PlatformComponent = DeveloperIons[blog.platform as keyof typeof DeveloperIons] as React.ComponentType<{ className: string; }>;

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
                const IconComponent = HeroIcons[icon as keyof typeof HeroIcons] as React.ComponentType<{ className: string; }>;
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
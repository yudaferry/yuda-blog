import { Client } from "@notionhq/client";
import { notFound } from "next/navigation";
import moment from "moment";
import { TypeNotionBlogs } from "../notion-fetch-blog";
import * as HeroIcons from "@heroicons/react/16/solid";
import * as DeveloperIons from "developer-icons";
import Link from "next/link";

// Remove custom PageProps interface and use native Next.js types
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
  to_do?: { rich_text: NotionRichText[]; checked: boolean; };
  code?: { rich_text: NotionRichText[]; language: string; };
  image?: {
    type: "file" | "external";
    file?: { url: string; expiry_time?: string; };
    external?: { url: string; };
  };
  divider?: object; // Fixed empty object type
}

export const revalidate = 300; // 5 minutes

async function fetchBlogDetail(title: string): Promise<BlogDetail | null> {
  try {
    const decodedTitle = decodeURIComponent(title);
    console.log("Fetching blog detail for title:", decodedTitle);

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

    console.log(`Found ${blogList.results.length} blog posts in database`);

    // Filter blogs to find one with a matching title (case insensitive)
    const matchingBlog = blogList.results.find((blog) => {
      const blogPage = blog as unknown as NotionPage;
      const titleArr = blogPage.properties.Name.title;
      const blogTitle = titleArr.length > 0 ? titleArr[0].plain_text : "";
      return blogTitle.toLowerCase() === decodedTitle.toLowerCase();
    }) as unknown as NotionPage | undefined;

    if (!matchingBlog) {
      console.error(`Blog post with title "${decodedTitle}" not found`);
      // Log available titles for debugging
      const titles = blogList.results.map((blog: any) => {
        const blogPage = blog as unknown as NotionPage;
        const titleArr = blogPage.properties.Name.title;
        return titleArr.length > 0 ? titleArr[0].plain_text : "Untitled";
      });
      console.log("Available blog titles:", titles);
      return null;
    }

    console.log("Found matching blog:", matchingBlog.properties.Name.title[0].plain_text);

    // Fetch the page content with pagination
    const blockId = matchingBlog.id;
    let allBlocks: unknown[] = [];
    let hasMore = true;
    let nextCursor: string | undefined;

    while (hasMore) {
      const response = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: nextCursor,
        page_size: 100,
      });

      allBlocks = allBlocks.concat(response.results);
      hasMore = response.has_more;
      nextCursor = response.next_cursor || undefined;
    }
    
    // Recursively fetch children for blocks that have them and insert them in the right place
    const processBlocks = async (blocks: any[]): Promise<any[]> => {
      let processedBlocks: any[] = [];
      
      for (const block of blocks) {
        processedBlocks.push(block);
        
        if (block.has_children) {
          let childBlocks: any[] = [];
          let childHasMore = true;
          let childNextCursor: string | undefined;
          
          while (childHasMore) {
            const childResponse = await notion.blocks.children.list({
              block_id: block.id,
              start_cursor: childNextCursor,
              page_size: 100,
            });
            
            childBlocks = childBlocks.concat(childResponse.results);
            childHasMore = childResponse.has_more;
            childNextCursor = childResponse.next_cursor || undefined;
          }
          
          // Process child blocks recursively and add them after the parent
          const processedChildBlocks = await processBlocks(childBlocks);
          processedBlocks = processedBlocks.concat(processedChildBlocks);
        }
      }
      
      return processedBlocks;
    };
    
    // Process all blocks to include children in the correct order
    allBlocks = await processBlocks(allBlocks);

    // Extract content from blocks with enhanced formatting
    const content = allBlocks.map((block) => {
      const typedBlock = block as unknown as NotionBlock;

      // Handle divider blocks
      if (typedBlock.type === 'divider') {
        return '<hr class="my-8 border-t border-gray-200 dark:border-gray-700" />';
      }

      // Handle image blocks
      if (typedBlock.type === 'image') {
        const imageUrl = typedBlock.image?.file?.url || typedBlock.image?.external?.url;
        if (imageUrl) return `![](${imageUrl})`;
        return '';
      }

      const extractRichText = (richTextArr: NotionRichText[] | undefined): string => {
        if (!richTextArr || richTextArr.length === 0) return '';

        return richTextArr.map(text => {
          let content = text.plain_text.replace(/\n/g, '<br>');
          const annotations = text.annotations || {};

          // Apply inline formatting only
          if (Object.values(annotations).some(val => val)) {
            const classes = [];
            if (annotations.bold) classes.push('font-bold');
            if (annotations.italic) classes.push('italic');
            if (annotations.underline) classes.push('underline');
            if (annotations.strikethrough) classes.push('line-through');
            if (annotations.code) classes.push('font-mono bg-gray-100 dark:bg-gray-700 px-1 rounded');

            if (annotations.color && annotations.color !== 'default') {
              classes.push(getColorClass(annotations.color));
            }

            if (classes.length > 0) {
              content = `<span class="${classes.join(' ')}">${content}</span>`;
            }
          }

          if (text.href) {
            content = `[${content}](${text.href})`;
          }

          return content;
        }).join('');
      };

      if (typedBlock.type === 'paragraph') {
        return extractRichText(typedBlock.paragraph?.rich_text);
      } else if (typedBlock.type === 'heading_1') {
        return `# ${extractRichText(typedBlock.heading_1?.rich_text)}`;
      } else if (typedBlock.type === 'heading_2') {
        return `## ${extractRichText(typedBlock.heading_2?.rich_text)}`;
      } else if (typedBlock.type === 'heading_3') {
        return `### ${extractRichText(typedBlock.heading_3?.rich_text)}`;
      } else if (typedBlock.type === 'bulleted_list_item') {
        return `• ${extractRichText(typedBlock.bulleted_list_item?.rich_text)}`;
      } else if (typedBlock.type === 'numbered_list_item') {
        return `1. ${extractRichText(typedBlock.numbered_list_item?.rich_text)}`;
      } else if (typedBlock.type === 'to_do') {
        const checked = typedBlock.to_do?.checked ? '☑' : '☐';
        return `${checked} ${extractRichText(typedBlock.to_do?.rich_text)}`;
      } else if (typedBlock.type === 'code') {
        const language = typedBlock.code?.language || 'text';
        const codeContent = extractRichText(typedBlock.code?.rich_text);
        return `\`\`\`${language}
${codeContent}
\`\`\``;
      } else if (typedBlock.type === 'quote') {
        return `> ${extractRichText(typedBlock.quote?.rich_text)}`;
      }
      return '';
    }).filter(Boolean)
      .join('\n\n');

    // Process ALL formatting here on the server
    const processedContent = processFormattedText(content);

    const result = {
      created_time: moment(matchingBlog.created_time).format("YYYY-MM-DD HH:mm"),
      title: matchingBlog.properties.Name.title[0].plain_text,
      icons: matchingBlog.properties.Icons.multi_select.map(({ name }) => name),
      platform: matchingBlog.properties.Platform.rich_text[0].plain_text,
      content: processedContent
    };
    
    return result;
  } catch (error) {
    console.error("Error fetching blog detail:", error);
    return null;
  }
}

// Add this helper function to process text with formatting
function processFormattedText(text: string) {
  // Process code blocks FIRST to prevent interference
  let processedText = text.replace(/```([^\n]*?)\n([\s\S]*?)\n```/g, (_, language, code) => {
    const lang = language?.trim() || 'text';
    return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // Process headings FIRST to prevent interference
  processedText = processedText
    .replace(/^# (.*$)/gm, '\n<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>\n')
    .replace(/^## (.*$)/gm, '\n<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>\n')
    .replace(/^### (.*$)/gm, '\n<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>\n');

  // Then process other elements
  processedText = processedText
    // Dividers
    .replace(/<div class="divider"><\/div>/g,
      '<hr class="my-8 border-t border-gray-200 dark:border-gray-700" />'
    )
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g,
      '\n<div class="flex justify-center my-4"><img src="$2" alt="$1" class="rounded-lg max-w-full" /></div>\n'
    )
    // Quotes
    .replace(/^> (.*$)/gm,
      '\n<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 text-gray-600 dark:text-gray-300">$1</blockquote>\n'
    )
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>'
    )
    // To-do checkboxes with green checkmark emoji
    .replace(/^☑ (.*$)/gm, '\n<div class="flex items-center my-2"><span class="mr-2 text-green-500 text-lg">✅</span><span>$1</span></div>\n')
    .replace(/^☐ (.*$)/gm, '\n<div class="flex items-center my-2"><span class="mr-2 text-gray-400 text-lg">⬜</span><span>$1</span></div>\n')
    // Lists
    .replace(/^• (.*$)/gm, '\n<li class="pl-4 my-2 flex"><span class="mr-2">•</span><span>$1</span></li>\n')
    .replace(/^\d+\. (.*$)/gm, '\n<li class="pl-4 my-2 flex"><span class="mr-2 font-medium">$&</span></li>\n');

  // Handle paragraphs - skip already processed elements
  processedText = processedText
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => {
      if (line.startsWith('<') &&
        (line.startsWith('<h') ||
          line.startsWith('<li') ||
          line.startsWith('<div') ||
          line.startsWith('<pre') ||
          line.startsWith('<hr'))) {
        return line;
      }
      return `<p class="my-3">${line}</p>`;
    })
    .join('\n');

  return processedText;
}

// Specific color mapping function
function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    'gray': 'text-gray-600 dark:text-gray-400',
    'brown': 'text-amber-600 dark:text-amber-300',
    'orange': 'text-orange-500 dark:text-orange-400',
    'yellow': 'text-yellow-500 dark:text-yellow-400',
    'green': 'text-green-500 dark:text-green-400',
    'blue': 'text-blue-500 dark:text-blue-400',
    'purple': 'text-purple-500 dark:text-purple-400',
    'pink': 'text-pink-500 dark:text-pink-400',
    'red': 'text-red-500 dark:text-red-400'
  };
  return colorMap[color] || '';
}

// Use the proper Next.js 15 page component definition with proper params typing
export default async function BlogDetail({
  params,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}) {
  // Get the title directly - in Next.js 15 this is no longer a Promise
  const { title } = await params;
  const blog = await fetchBlogDetail(title);

  if (!blog) {
    notFound();
  }

  // Use type assertion with 'unknown' as intermediate step
  const PlatformComponent = DeveloperIons[blog.platform as keyof typeof DeveloperIons] as React.ComponentType<{ className: string; }>;

  return (
    <main className="max-w-3xl mx-auto px-4 pt-8">
      <Link href="/blog" className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6">
        <HeroIcons.ArrowLeftIcon className="size-4" />
        <span>Back to blog list</span>
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="bg-transparent dark:bg-white p-3 rounded-md">
          {PlatformComponent ? (
            <PlatformComponent className="size-10" />
          ) : (
            <div className="size-10 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
              <span className="text-sm">?</span>
            </div>
          )}
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
                    {IconComponent ? (
                      <IconComponent className="size-4" />
                    ) : (
                      <div className="size-4 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
                        <span className="text-xs">?</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <article className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
    </main>
  );
}

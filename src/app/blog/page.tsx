import * as HeroIcons from "@heroicons/react/16/solid";
import * as DeveloperIons from "developer-icons";

import notionFetchBlog, { TypeNotionBlogs } from "./notion-fetch-blog";
import Link from "next/link";

export const revalidate = 300; // 5 minutes

export default async function Home() {
  const blogData = await notionFetchBlog();
  return (
    <main className="flex flex-col md:flex-row md:flex-wrap md:h-fit grow">
      {blogData.map((blog: TypeNotionBlogs) => {
        // parse as any, because it detected not jsx component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const PlatformComponent = DeveloperIons[blog.platform as keyof typeof DeveloperIons] as any;

        return (
          <Link
            key={blog.title}
            href={`/blog/${encodeURIComponent(blog.title)}`}
            className="w-screen md:w-fit py-4 px-8 flex gap-4 md:basis-1/3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <div className="bg-transparent dark:bg-white p-2 rounded-md self-center">
              {PlatformComponent ? (
                <PlatformComponent className="size-8" />
              ) : (
                <div className="size-8 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center">
                  <span className="text-xs">?</span>
                </div>
              )}
            </div>
            <div className="border-b border-gray-300 dark:border-gray-700 transition grow flex flex-col justify-between h-20">
              <div className="text-lg font-medium">
                {blog.title}
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">
                  {blog.created_time}
                </p>
                <div>
                  <ArrangeIcons icons={blog.icons} />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </main>
  );
}

function ArrangeIcons({ icons }: { icons: string[]; }) {
  return (
    <div className="flex gap-2">
      {icons.map((icon: string) => {
        const IconComponent = HeroIcons[icon as keyof typeof HeroIcons];

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
  );
}

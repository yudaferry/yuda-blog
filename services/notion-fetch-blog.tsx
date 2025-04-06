import { Client } from "@notionhq/client"
import moment from "moment";

export type TypeNotionBlogs = {
  created_time: string;
  title: string;
  icons: string[];
  platform: string;
}

export default async function notionFetchBlog(): Promise<TypeNotionBlogs[]> {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const blogList = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Release",
      date: {
        on_or_before: moment().format("YYYY-MM-DD"),
      }
    }
  });

  // console.log(JSON.stringify(blogList.results[0].properties, null, 2));

  return blogList.results.map((blog: any) => ({
    created_time: moment(blog.created_time).format("YYYY-MM-DD HH:mm"),
    title: blog.properties.Name.title[0].plain_text,
    icons: blog.properties.Icons.multi_select.map(({ name }: { name: string }) => name),
    platform: blog.properties.Platform.rich_text[0].plain_text,
  }))
}

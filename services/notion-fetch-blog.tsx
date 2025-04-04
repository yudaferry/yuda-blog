import { Client } from "@notionhq/client"

export default async function notionFetchBlog() {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const blogList = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  return blogList.results.map((blog: any) => ({
    created_time: blog.created_time,
    title: blog.properties.Name.title[0].plain_text
  }))
}

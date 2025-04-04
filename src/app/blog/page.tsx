import notionFetchBlog from "../../../services/notion-fetch-blog";

export default async function Home() {

  const blogData = await notionFetchBlog();
  console.log(JSON.stringify(blogData, null, 2));
  return (
    <main className="">
      blog
    </main>
  );
}

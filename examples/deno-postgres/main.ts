import { Client } from "postgres";

import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  listAuthors,
} from "./db/query_sql.ts";

async function main() {
  const sql = new Client(Deno.env.get("DATABASE_URL"));

  // Create an author
  const author = await createAuthor(sql, {
    name: "Seal",
    bio: "Kissed from a rose",
  });
  if (author === null) {
    throw new Error("author not created");
  }
  console.log(author);

  // List the authors
  const authors = await listAuthors(sql);
  console.log(authors);

  // Get that author
  const seal = await getAuthor(sql, { id: author.id });
  if (seal === null) {
    throw new Error("seal not found");
  }
  console.log(seal);

  // Delete the author
  await deleteAuthor(sql, { id: seal.id });
}

(async () => {
  try {
    await main();
    Deno.exit(0);
  } catch (e) {
    console.error(e);
    Deno.exit(1);
  }
})();

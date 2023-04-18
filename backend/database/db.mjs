import pg from "pg";
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
export const cockroachPool = new Pool({
  connectionString,
  application_name: "$ ",
});

// Wrapper for a transaction.  This automatically re-calls the operation with
// the client as an argument as long as the database server asks for
// the transaction to be retried.
export const retryTransaction = async (max, client, operation, callback) => {
  const backoffInterval = 100; // milliseconds
  const maxTries = max;
  let tries = 0;

  while (true) {
    await client.query("BEGIN;");

    tries++;

    try {
      const result = await operation(client, callback);
      await client.query("COMMIT;");
      return result;
    } catch (err) {
      await client.query("ROLLBACK;");

      if (err.code !== "40001" || tries == maxTries) {
        throw err;
      } else {
        console.log("Transaction failed. Retrying.");
        console.log(err.message);
        await new Promise((r) => setTimeout(r, tries * backoffInterval));
      }
    }
  }
};

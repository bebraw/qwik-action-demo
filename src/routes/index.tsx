import { promises as fs } from "fs";
import { component$ } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import Rating from "../components/rating/rating";

export const useLoadRating = loader$(async () => {
  const { rating } = JSON.parse(
    await fs.readFile("db.txt", { encoding: "utf8" })
  );

  console.log("loaded rating", rating);

  return rating;
});

export default component$(() => {
  const signal = useLoadRating();

  return (
    <div>
      <Rating initialRating={signal.value} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Rating demo",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

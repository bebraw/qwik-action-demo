import { promises as fs } from "fs";
import { action$, Form } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";

export const useSetRating = action$(async (form) => {
  console.log("received form", form);

  await fs.writeFile(
    "db.txt",
    JSON.stringify({ rating: form.rating }, null, 2),
    "utf8"
  );

  return {
    success: true,
  };
});

export default component$(({ initialRating }: { initialRating: string }) => {
  const action = useSetRating();

  console.log("received initial rating", initialRating);

  return (
    <Form action={action}>
      <input
        name="rating"
        value={action.formData?.get("rating") || initialRating}
      />
      <button type="submit">Set rating</button>
    </Form>
  );
});

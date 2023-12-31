import { z, defineCollection } from "astro:content";

interface ArticleSchemaParams {
	image: () => any;
}

const validStatuses = ["draft", "preview", "published"] as const;

const articleSchema = ({ image }: ArticleSchemaParams) =>
	z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date().default(new Date()),
		tags: z.array(z.string().toLowerCase()).optional(),
		image: image().optional(),
		status: z.enum(validStatuses),
	});

const project = defineCollection({
	type: "content",
	schema: articleSchema,
});

const blog = defineCollection({
	type: "content",
	schema: articleSchema,
});

export const collections = {
	project,
	blog,
};

export const PAGE_SIZE = 5;

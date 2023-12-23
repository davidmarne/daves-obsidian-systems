import { SerializerBuilder } from "src/common/mdast_serializer";
import { EntertainmentContent } from "src/systems/entertainment/resource_access/entertainment_content";

export const entertainmentSerializer = new SerializerBuilder<EntertainmentContent>()
    .frontMatter({
        get: (entertainmentContent) => ({
            $schema: `entertainment_content.schema.json`,
            kind: entertainmentContent.kind,
            state: entertainmentContent.state,
            anticipation: entertainmentContent.anticipation,
            rating: entertainmentContent.rating,
        }),
        set: (value) => ({
            kind: value.kind,
            state: value.state,
            anticipation: value.anticipation,
            rating: value.rating,
        }),
    })
    .heading2("Description")
    .paragraph({
        get: (data) => data.description,
        set: (value) => ({description: value})
    });

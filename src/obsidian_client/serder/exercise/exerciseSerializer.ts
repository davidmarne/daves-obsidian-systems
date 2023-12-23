import { SerializerBuilder } from "src/common/mdast_serializer";
import { Exercise } from "src/systems/exercise/resource_access/exercise";

export const exerciseSerializer = new SerializerBuilder<Exercise>()
    .frontMatter({
        get: (entertainmentContent) => ({
            $schema: `exercise.schema.json`,
            kind: entertainmentContent.kind,
        }),
        set: (value) => ({
            kind: value.kind,
        }),
    });

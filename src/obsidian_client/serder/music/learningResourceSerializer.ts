import { SerializerBuilder, link } from 'src/common/mdast_serializer';
import { LearningResource } from 'src/systems/music/resource_access/learning_resource';
import { Value } from 'src/systems/gtd/resource_access/value';


export const learningResourceSerializer = new SerializerBuilder<LearningResource>()
        .frontMatter({
            get: (learningResource) => ({ 
                kind: learningResource.kind,
                source: learningResource.source
            }),
            set: (metadata) => ({ 
                kind: metadata.kind,
                source: metadata.source
            }),
        })
        .heading2("description")
        .paragraph({
            get: (learningResource) => learningResource.description,
            set: (value) => ({description: value}),
        });

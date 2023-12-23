import { SerializerBuilder, link } from 'src/common/mdast_serializer';
import { Value } from 'src/systems/gtd/resource_access/value';


export const valueSerializer = new SerializerBuilder<Value>()
        .frontMatter({
            get: (project) => ({ }),
            set: (metadata) => ({ }),
        })
        .heading2("description")
        .paragraph({
            get: (project) => project.description,
            set: (value) => ({description: value}),
        })
        .heading2("why")
        .paragraph({
            get: (project) => project.why,
            set: (value) => ({why: value}),
        });

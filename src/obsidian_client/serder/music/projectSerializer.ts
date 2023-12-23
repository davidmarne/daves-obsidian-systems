import { SerializerBuilder, link } from 'src/common/mdast_serializer';
import { MusicProject } from 'src/systems/music/resource_access/project';

export const musicProjectSerializer = new SerializerBuilder<MusicProject>()
        .frontMatter({
            get: (project) => ({
                kind: project.kind
             }),
            set: (metadata) => ({
                kind: metadata.kind
             }),
        })
        .heading2("description")
        .paragraph({
            get: (project) => project.description,
            set: (value) => ({description: value}),
        });

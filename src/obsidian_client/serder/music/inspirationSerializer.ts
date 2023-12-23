import { SerializerBuilder, link } from 'src/common/mdast_serializer';
import { parseWikiLink } from 'src/common/wiki_link_utils';
import { Inspiration } from 'src/systems/music/resource_access/inspiration';

export const inspirationSerializer = new SerializerBuilder<Inspiration>()
        .frontMatter({
            get: (inspiration) => ({
                kind: inspiration.kind,
                source: inspiration.source,
                projects: inspiration.projects.map(it => link('music/musicProject/', it))
             }),
            set: (metadata) => ({
                kind: metadata.kind, 
                source: metadata.source,
                projects: metadata.projects.map(parseWikiLink)
            }),
        })
        .heading2("description")
        .paragraph({
            get: (inspiration) => inspiration.description,
            set: (value) => ({description: value}),
        });

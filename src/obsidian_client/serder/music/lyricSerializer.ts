import { SerializerBuilder, link } from 'src/common/mdast_serializer';
import { parseWikiLink } from 'src/common/wiki_link_utils';
import { Lyric } from 'src/systems/music/resource_access/lyric';
import { Value } from 'src/systems/gtd/resource_access/value';


export const lyricSerializer = new SerializerBuilder<Lyric>()
        .frontMatter({
            get: (lyric) => ({
                kind: lyric.kind,
                projects: lyric.projects.map(it => link('music/musicProject/', it))
            }),
            set: (metadata) => ({
                kind: metadata.kind,
                projects: metadata.projects.map(parseWikiLink)
            }),
        })
        .heading2("content")
        .paragraph({
            get: (lyric) => lyric.content,
            set: (value) => ({content: value}),
        });

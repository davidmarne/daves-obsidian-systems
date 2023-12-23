import { Project } from '../../../systems/gtd/resource_access/project';
import { parseWikiLink } from 'src/common/wiki_link_utils';
import { SerializerBuilder, link } from 'src/common/mdast_serializer';
import { Goal } from 'src/systems/gtd/resource_access/goal';


export const goalSerializer = new SerializerBuilder<Goal>()
        .frontMatter({
            get: (project) => ({ values: project.values.map(it => link('gtd/value/', it)) }),
            set: (metadata) => ({ values: metadata.values.map(parseWikiLink) }),
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

import { Project } from '../../../systems/gtd/resource_access/project';
import { parseWikiLink } from 'src/common/wiki_link_utils';
import { SerializerBuilder, link } from 'src/common/mdast_serializer';


export const projectSerializer = new SerializerBuilder<Project>()
        .frontMatter({
            get: (project) => ({ goals: project.goals.map(it => link('gtd/goals/', it)) }),
            set: (metadata) => ({ goals: metadata.goals.map(parseWikiLink) }),
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
        })
        .heading2("tasks")
        .list({
            get: (project) => project.tasks,
            set: (value) => ({tasks: value}),
        });

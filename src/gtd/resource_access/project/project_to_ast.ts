import { Heading, List, Node, Paragraph, Root, Yaml } from 'mdast';
import { parseYaml, stringifyYaml } from 'obsidian';
import { Project } from '../project';
import { goalPath } from '../goal';
import { AssertionError } from 'assert';
import { withPartial } from 'src/common/react_util';
import { parseWikiLink } from 'src/common/wiki_link_utils';
import { SerializerBuilder, link } from 'src/common/mdast_serializer';


const projectSerializer = new SerializerBuilder<Project>()
        .frontMatter({
            get: (project) => ({ goals: project.goals.map(it => link(goalPath, it)) }),
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

export const projectToAst2 = (project: Project): Root => {
    return projectSerializer.serialize(project);
}
export const projectFromAst2 = (name: string, root: Root): Project => {
    return projectSerializer.deserialize(root, new Project(name, "", "", [], []));
}

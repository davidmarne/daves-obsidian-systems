import { Project } from '../../../systems/gtd/resource_access/project';
import { parseWikiLink } from 'src/common/wiki_link_utils';
import { SerializerBuilder, link } from 'src/common/mdast_serializer';
import { Inbox } from 'src/systems/gtd/resource_access/inbox';


export const inboxSerializer = new SerializerBuilder<Inbox>()
        .frontMatter({
            get: (project) => ({ }),
            set: (metadata) => ({ }),
        })
        .heading2("tasks")
        .list({
            get: (project) => project.tasks,
            set: (value) => ({tasks: value}),
        });

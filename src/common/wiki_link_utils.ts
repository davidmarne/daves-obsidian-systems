
export const parseWikiLink = (link: string): string  => {
    const linkParts = link.split('|');
    const fileName = linkParts[1].replaceAll("]]", "");
    return fileName;
}
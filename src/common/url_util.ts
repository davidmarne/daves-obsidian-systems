
export const getUrlStringFromClipboard = async (): Promise<string | undefined> => {
    try {
        const clipValue = await navigator.clipboard.readText();
        return new URL(clipValue).toString();
    } catch (err) {
        return undefined;
    }
}
export interface Config {
    portRedirects: Array<{
        prefixes: Array<string>;
        url: string;
    }>;
}

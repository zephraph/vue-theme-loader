declare module 'loader-utils' {
    export function getOptions<T>(loaderContext: T): T | null;
}

declare module 'vue-template-compiler' {

    export interface SFCDescriptor {
        template?: SFCBlock;
        script?: SFCBlock;
        styles: SFCBlock[];
        customBlocks: SFCCustomBlock[];
    }

    export interface SFCBlock {
        type: string;
        content: string;
        start: number;
        end?: number;
        lang?: string;
        src?: string;
        scoped?: boolean;
        module?: string | boolean;
        attrs: {
            [attribute: string]: string
        };
    }

    export interface SFCCustomBlock {
        type: string;
        content: string;
        start: number;
        end?: number;
        src?: string;
        attrs: {
            [attribute: string]: string
        };
    }

    export function parseComponent(content: string, options?: object): SFCDescriptor;
}

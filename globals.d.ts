declare module "loader-utils" {
    export function getOptions<T>(loaderContext: T): T | null;
}

declare module "vue-template-compiler" {

    export type SFCDescriptor = {
        template?: SFCBlock;
        script?: SFCBlock;
        styles: SFCBlock[];
        customBlocks: SFCCustomBlock[];
    }

    export type SFCBlock = {
        type: string;
        content: string;
        start?: number;
        end?: number;
        lang?: string;
        src?: string;
        scoped?: boolean;
        module?: string | boolean;
        attrs: {
            [attribute:string]: string
        };
    }

    export type SFCCustomBlock = {
        type: string;
        content: string;
        start?: number;
        end?: number;
        src?: string;
        attrs: {
            [attribute:string]: string
        };
    }

    export function parseComponent(content: string, options?: object): SFCDescriptor;
}
import {XarusClient} from "@XarusClient";
import {Database} from "@Database";
import {CacheKey} from "@Enums";
import {Snowflake} from "discord.js";

export class CacheManager {
    private readonly client: XarusClient;

    public constructor(client: XarusClient) {
        this.client = client;
    }

    public set(key: Snowflake | undefined, value: string, type: CacheKey) {
        return this.client.redis.set(`${type}${CacheManager.SEPERATOR}${key}`, value);
    }

    public get(key: Snowflake | undefined, type: CacheKey) {
        return this.client.redis.get(`${type}${CacheManager.SEPERATOR}${key}`);
    }

    public async has(key: string, type: CacheKey) {
        const value = await this.get(key, type);
        return value !== null;
    }

    private static checkDataCunks(arr: any) {
        const chunks: any = ["vanity", "role", "base"];
        let chunksData: any = arr;
        chunks.forEach((k: string) => {
            chunksData = CacheManager.createChunkIfNotHas(k, chunksData);
        })
        return chunksData;
    }

    public static readonly SEPERATOR = "_";

}

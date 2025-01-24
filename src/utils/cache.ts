interface CacheItem<T> {
  data: T;
  timestamp: number;
  teamId: string;
}

class Cache {
  private static instance: Cache;
  private cache: Map<string, CacheItem<any>>;
  private readonly TTL = 5 * 60 * 1000; // 5 minutes

  private constructor() {
    this.cache = new Map();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  public set<T>(key: string, data: T, teamId: string): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      teamId
    });
  }

  public get<T>(key: string, teamId: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (item.teamId !== teamId) return null;
    
    const isExpired = Date.now() - item.timestamp > this.TTL;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data as T;
  }

  public clear(): void {
    this.cache.clear();
  }
}

export const cache = Cache.getInstance(); 
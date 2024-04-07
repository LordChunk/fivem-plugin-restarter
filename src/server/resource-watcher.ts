import * as fs from "fs";

class ResourceWatcher {
  private debounceTimer: NodeJS.Timeout | null = null;

  constructor(private readonly resourceName: string) {
    const resourceFolder = GetResourcePath(resourceName);
    const watcher = fs.watch(resourceFolder, { recursive: true });

    watcher.on("change", this.restartResource.bind(this));
    console.log(`Watching ${resourceFolder} for changes.`);    
  }

  async restartResource() {
    if (this.debounceTimer) {
      return;
    }

    console.log(`File change detected in ${this.resourceName}, restarting resource.`);
    ExecuteCommand(`ensure ${this.resourceName}`);

    this.debounceTimer = setTimeout(() => {
      this.debounceTimer = null;
    }, 1000);
  }
}

export { ResourceWatcher };
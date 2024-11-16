import watch from 'node-watch';

class ResourceWatcher {
  private debounceTimer: NodeJS.Timeout | null = null;

  constructor(private readonly resourceName: string, subPath: string = "") {
    const watchedFolder = `${GetResourcePath(resourceName)}/${subPath}`;
    const watcher = watch(watchedFolder, { recursive: true });

    watcher.on("change", this.restartResource.bind(this))
    console.log(`Watching ${watchedFolder} for changes.`);    
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
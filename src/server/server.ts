import { ResourceWatcher } from "./resource-watcher";

console.log('Initializing fivem-plugin-restarter');


const monitoredResources = [
  "fivem-rest-api",
  "fivem-npc-ambulance",
];

onNet("onServerResourceStart", async (resourceName: string) => {  
  // Only run if the resource is this script
  const currentResource = GetCurrentResourceName();

  if (currentResource === resourceName) {
    // Delay the file change detector to prevent it from doing restarts during server startup
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`Starting resource watchers for ${monitoredResources.join(", ")}`);
    for (const resource of monitoredResources) {
      new ResourceWatcher(resource);
    }

    console.log("Resource watchers started.");
  }
});

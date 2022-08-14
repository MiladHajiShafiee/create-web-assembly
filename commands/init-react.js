import { series } from "async";

import { initiateReactProject } from "../utils/index.js";

function initReact() {
  initiateReactProject((startTime) => {
    const packageTasks = [
      (next) => {
        console.log(`\n✨ Done in ${(Date.now() - startTime) / 1000} seconds\n`);
        next();
      },
    ];

    series(packageTasks);
  });
}

export default initReact;

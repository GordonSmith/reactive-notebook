import { NotebookRuntime } from "@hpcc-js/observablehq-compiler/runtime";
import notebook from "./notebook.definition";

import "@hpcc-js/common/font-awesome/css/font-awesome.min.css";

export function test(target: HTMLElement) {
    let runtime = new NotebookRuntime();
    runtime.render(notebook, target);
}

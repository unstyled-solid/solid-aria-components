import {appendFileSync} from 'node:fs';

export default class DiagnosticReporter {
  onTestCaseReady(test) {
    appendFileSync(process.env.TEST_DIAGNOSTICS_LOG, JSON.stringify({attribution: true, id: test.id, name: test.fullName, file: test.module.moduleId, browser: test.project.name}) + '\n');
  }
  onUserConsoleLog(log) {
    appendFileSync(process.env.TEST_DIAGNOSTICS_LOG, JSON.stringify(log) + '\n');
  }
}

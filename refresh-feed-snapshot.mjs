import {existsSync} from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const bundled=path.join(process.env.USERPROFILE||'', '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe');
const python=process.env.GNN_PYTHON||(process.platform==='win32'&&existsSync(bundled)?bundled:process.platform==='win32'?'python':'python3');
const result=spawnSync(python,['scripts/fetch-feeds.py'],{stdio:'inherit'});
if(result.error)console.error(result.error.message);
process.exit(result.status??1);

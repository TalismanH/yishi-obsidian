# Yishi · 一事

A local task workbench for Obsidian desktop. Organize projects across Todo, Doing, and Done columns, with up to three levels of subtasks. Choose 中文 or English in Settings. The selection is remembered without translating your project or task content.

## Features

- Create, reorder, archive, and restore projects.
- Edit task text in place, move entire branches, and preserve each task's status.
- Search within a project, fold branches, and locate matching items across columns.
- Render Markdown and math offline, with keyboard editing and configurable colors, fonts, and text size.
- Import JSON workspaces, export backups, detect conflicting writes, and recover unsaved edits.

## Requirements and installation

Requires Obsidian **1.15.1 or newer on desktop**. Mobile is not supported.

Install from the [Obsidian Community directory](https://community.obsidian.md/plugins/yishi) using **Add to Obsidian**, then enable **Yishi** in Community plugins.

For manual installation, download `main.js`, `manifest.json`, and `styles.css` from a release and place them in your vault's configuration directory under `plugins/yishi/` (normally `.obsidian/plugins/yishi/`). Enable **Yishi** in Community plugins, then use the ribbon icon or **Yishi: 打开工作台** in the command palette.

## Data, privacy, and recovery

New workspaces start empty. This repository and its release files contain source code, offline rendering assets, and synthetic test fixtures. They do not include a user's vault, task database, backups, credentials, or local machine paths.

Tasks are stored as structured JSON in the vault:

```text
Yishi/workspace.json          Current workspace: { state, revision }
Yishi/workspace.json.bak      Previous valid version
Yishi/backups/               Exports and backups made before imports/restores
Yishi/recovery-<id>.json      Recovery copies for unsaved edits
```

The old `Yishi/` folder is copied automatically on first load when no `Yishi/workspace.json` exists. The workspace, revision, previous-version backup, exports, and recovery copies are preserved. Copies are verified before the main file is installed. The old folder remains untouched; existing Yishi workspaces are never overwritten. A busy, corrupt, or failed migration stops without resetting the source.

The old `一事/` folder is copied automatically on first load when no `Yishi/workspace.json` exists. The workspace, revision, previous-version backup, exports, and recovery copies are preserved. Copies are verified before the main file is installed. The old folder remains untouched; existing Yishi workspaces are never overwritten. A busy, corrupt, or failed migration stops without resetting the source.

These files are separate from the plugin installation folder. Uninstalling the plugin leaves task data in place. Appearance preferences use Obsidian's plugin settings storage.

The plugin does not require an account and does not send tasks to a remote service. It includes no telemetry or analytics. Vault synchronization is controlled by the user's chosen sync tool.

**External file access:** JSON import reads only the file the user explicitly chooses, which may be outside the vault. Task data, exports, and recovery files are written inside the vault's `Yishi/` folder. Opening an external Markdown link uses the system browser.

Settings → Yishi provides JSON import, export, previous-version restore, and recovery-copy access. Import accepts either a plain task state or a `{ state, revision }` workspace and backs up the current file before replacement. To migrate from the standalone app, export from the running app and import that fresh file; an older workspace file may contain stale data.

Writes validate the document, check both the revision and original file contents, and use fsync, an exclusive cross-process lock, and atomic replacement. Desktop filesystem access is intentionally retained for these guarantees; the community directory therefore reports that capability. Conflicts stop the write and keep recovery content. Reloading after a failed save exports the current content first. Corrupt files are preserved for explicit recovery. Write payloads are limited to 5 MiB.

The standalone app and this plugin save independently. Imports do not create automatic synchronization. External sync tools do not honor the local write lock, so cross-device edits require manual conflict resolution. If a crash leaves `workspace.lock`, close all Obsidian instances using that vault before removing only the stale lock file.

## Keyboard controls

| Key | Action |
| --- | --- |
| Ctrl/Cmd+B | Toggle bold in task text or project summary |
| Ctrl/Cmd+F | Search the current project |
| Enter | Finish a task and start its next sibling |
| Shift+Enter | Insert a newline |
| Tab / Shift+Tab | Demote / promote a task |
| Ctrl+Shift+Enter | Toggle a task between Todo and Doing |
| Ctrl/Cmd+Enter or Escape | Finish editing |

## Build and tests

```sh
npm ci
npm run check
npm test
npm run build
```

The distributable files are produced in `dist/yishi/` and copied to the repository root for the community build checker. The root manifest and `obsidian/manifest.json` must match.

For desktop integration tests, provide `PLAYWRIGHT_MODULE` pointing to an existing Playwright module and `OBSIDIAN_EXE` pointing to Obsidian's executable, then run `node tests/obsidian-ui.mjs`. Optionally set `OBSIDIAN_ASAR` to an existing versioned update package. These tests create a temporary vault and independent user profile, and clean them up afterward.

## 中文使用说明

启用插件后，点击左侧一事图标打开工作台。顶部「项目 / 归档」切换视图，点击加号新建项目。事项支持三级层级、连续输入、拖动排序、跨列定位和搜索。

通过工作台的设置按钮修改配色、字体和字号；在「设置 → Yishi」中选择中文或 English，并管理导入、导出、备份恢复与未保存内容。新数据目录为 `Yishi/`；旧 `一事/` 目录在安全复制后保留。迁移 exe 数据时，应从正在使用的 exe 导出一份新 JSON，再导入插件。导入前自动保留备份，两端后续修改不会自动同步。

## License

Yishi uses the [Apache License 2.0](LICENSE). Marked and KaTeX retain their MIT licenses. KaTeX fonts and Smiley Sans retain their SIL Open Font License notices. Original copyright notices are preserved in `public/vendor/` and embedded in the standard release files.

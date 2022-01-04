const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(merge|feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(`
      不合法的 commit 消息格式。
      
      请使用提交规范：merge|feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow: XXXXX

      feat: 新功能、新特性
      fix: 修改 bug
      perf: 更改代码，以提高性能
      refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
      docs: 文档修改
      style: 代码格式修改, 注意不是 css 修改（例如分号修改）
      test: 测试用例新增、修改
      build: 影响项目构建或依赖项修改
      revert: 恢复上一次提交
      ci: 持续集成相关文件修改
      chore: 其他修改（不在上述类型中的修改）
      release: 发布新版本
      workflow: 工作流相关文件修改
    `)

  process.exit(1)
}

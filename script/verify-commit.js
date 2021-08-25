const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE = /^(merge|feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(`
      不合法的 commit 消息格式。
      请查看 git commit 提交规范：https://gitee.com/OKGENE_1/dashboard/projects/OKGENE_1/vue2.x-template/wikis/OKGENE_1%2Fvue2.x-template?doc_id=1047366&sort_id=3095531
    `)

  process.exit(1)
}

const tasks = arr => arr.join(' && ')

export default {
  'hooks': {
    'pre-commit': tasks([
      'npm run lint'
    ]),
    'commit-msg': tasks([
      'cat $HUSKY_GIT_PARAMS | npm run commitlint'
    ])
  }
}

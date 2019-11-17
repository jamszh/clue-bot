a = {
  't1_34': {'id': 't1_34', 'parent_id': 't1_35'},
  't1_35': {'id': 't1_35', 'parent_id': 't3_24e'},
  't3_24e': {'id': 't3_24e', 'parent_id': 't_34'},
  't_34': {'id': 't_34', 'parent_id': null}
};

const parent_re = new RegExp(/^t3_\w+$/i);

function getComment(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a[id]);
    }, 300);
  });
}


const e = {'id': 't3_24e', 'parent_id': null};
const c = {'id': 't1_34', 'parent_id': 't1_35'};

getParent(c).then((result) => {
  console.log(result);
})
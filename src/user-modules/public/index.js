import { user, comments } from './rpc.js';

// call user's list
const status = document.querySelector('#status');
const message = document.querySelector('#message');

try {
  const result = await comments.index('12345');
  // const createdUser = await user.create('xx');
  // console.log('create user: ', createdUser);

  status.innerHTML = 'success';
  message.innerHTML = JSON.stringify(result, null, 2);
} catch (err) {
  status.innerHTML = 'failed';
  message.innerHTML = err.message;
}

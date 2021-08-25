import eventBus from '@/methods/eventBus';

export default function (res, title = '更新') {
  if (res.data.success) {
    eventBus.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
    });
  } else {
    const message = typeof res.data.message === 'string'
      ? [res.data.message] : res.data.message;
    eventBus.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、'),
    });
  }
}
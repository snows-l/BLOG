// 光标效果 配置

// new cursoreffects.fairyDustCursor({
//   colors: ['#ff0000', '#00ff00', '#0000ff']
// }); // 彩虹光标
new cursoreffects.clockCursor(); // 时钟光标
// new cursoreffects.bubbleCursor(); // 气泡光标
// new cursoreffects.ghostCursor(); // 幽灵光标
// new cursoreffects.snowflakeCursor(); // 雪花光标
// new cursoreffects.emojiCursor({ emoji: ['🔥', '🐬', '🦆'] }); // 表情光标
// new cursoreffects.springyEmojiCursor({ emoji: '🤷‍♂️' }); // 弹性的表情光标
// new cursoreffects.followingDotCursor({ color: ['#323232a6'] }); // 跟随鼠标移动的小圆点
// new cursoreffects.textFlag({ text: 'snows_l', color: '#ff0000' }); // 文字旗帜
// new cursoreffects.trailingCursor({ color: '#ff0000' }); // 尾随光标
// new cursoreffects.rainbowCursor({
//   length: 3,
//   colors: ['red', 'blue'],
//   size: 4
// });
// new cursoreffects.characterCursor({
//   element: document.querySelector('#character'),
//   characters: ['h', 'e', 'l', 'l', 'o'],
//   font: '15px serif',
//   colors: ['#6622CC', '#A755C2', '#B07C9E', '#B59194', '#D2A1B8'],
//   characterLifeSpanFunction: function () {
//     return Math.floor(Math.random() * 60 + 80);
//   },
//   initialCharacterVelocityFunction: function () {
//     return {
//       x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5,
//       y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5
//     };
//   },
//   characterVelocityChangeFunctions: {
//     x_func: function (age, lifeSpan) {
//       return (Math.random() < 0.5 ? -1 : 1) / 30;
//     },
//     y_func: function (age, lifeSpan) {
//       return (Math.random() < 0.5 ? -1 : 1) / 15;
//     }
//   },
//   characterScalingFunction: function (age, lifeSpan) {
//     let lifeLeft = lifeSpan - age;
//     return Math.max((lifeLeft / lifeSpan) * 2, 0);
//   },
//   characterNewRotationDegreesFunction: function (age, lifeSpan) {
//     let lifeLeft = lifeSpan - age;
//     console.log(age, lifeSpan);
//     return lifeLeft / 5;
//   }
// });

// 销毁光标
// cursoreffects.destroy();

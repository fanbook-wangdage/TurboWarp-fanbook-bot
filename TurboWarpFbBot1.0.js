class StrictEqualityExtension {
    getInfo() {
      return {
        id: 'fanbookbot',
        name: 'Fanbook Bot',
        blocks: [
          {
            opcode: 'sztoken',
            blockType: Scratch.BlockType.COMMAND,
            text: '设置token为[ONE]',
            arguments: {
              ONE: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'hqtoken',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取token',
            arguments: {
            }
          },
          {
            opcode: 'getme',
            blockType: Scratch.BlockType.REPORTER,
            text: '机器人的[FORMAT]信息',
            arguments: {
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'XXM_MENU'
              }
            }
          },
          {
            opcode: 'fsxx',
            blockType: Scratch.BlockType.REPORTER,
            text: '向频道id[pdid]发送消息[text]，并返回该消息id',
            arguments: {
              pdid: {
                type: Scratch.ArgumentType.STRING
              },
              text: {
                type: Scratch.ArgumentType.STRING}
            }},
            {
              opcode: 'getmsg',
              blockType: Scratch.BlockType.COMMAND,
              text: '获取频道id[ONE]中的最后一条消息',
              arguments: {
                ONE: {
                  type: Scratch.ArgumentType.STRING
                }
              }
            },
            {
              opcode: 'getmsgtext',
              blockType: Scratch.BlockType.REPORTER,
              text: '消息的内容',
              arguments: {
              }
            },
            {
              opcode: 'getmsgid',
              blockType: Scratch.BlockType.REPORTER,
              text: '消息的id',
              arguments: {
              }
            },
            {
              opcode: 'delmsg',
              blockType: Scratch.BlockType.COMMAND,
              text: '撤回频道id[ONE]中消息id为[XXID]的消息',
              arguments: {
                ONE: {
                  type: Scratch.ArgumentType.STRING
                },
                XXID: {
                  type: Scratch.ArgumentType.STRING
                }
              }
            }
        ],
        menus: {
          XXM_MENU: {
            acceptReporters: true,
            items: ['名字', 'id','头像图片链接','user_token','原始json']
        }
      }
      };
    }
    sztoken(args) {
      token = args.ONE;
      //return args.ONE === args.TWO;
      return "成功";
    }
    hqtoken(args) {
      return token;
    }
    getme(args) {
      return fetch(`http://1.117.76.68:5000/bot/getme?data=${token}`)
      .then((response) => {
        if (args.FORMAT === '原始json'){
        return response.text();};
        if (args.FORMAT === '名字'){
          //返回json中的username值
        return response.json().then((data) => {
          return data.result.username;
        })};
        if (args.FORMAT === 'id'){
        return response.json().then((data) => {
          return BigInt(data.result.id);
        })};
        if (args.FORMAT === '头像图片链接'){
        return response.json().then((data) => {
          return data.result.avatar;
        })};
        if (args.FORMAT === 'user_token'){
        return response.json().then((data) => {
          return data.result.user_token;
        })}
      })
      .catch((error) => {
        console.error(error);
        return '获取失败';
      });}
      fsxx (args) {
        return fetch(`http://1.117.76.68:5000/bot/sm?token=${token}&chatid=${args.pdid}&text=${args.text}`)
          .then((response) => {
            //返回返回的第8个字符以后的内容
            return response.text().then((data) => {
              return data.substring(8);})
          })
          .catch((error) => {
            console.error(error);
            return '获取失败';
          });
      }
      getmsg (args) {
        return fetch(`http://1.117.76.68:5000/bot/getmsg?token=${token}&pdid=${args.ONE}&type=1`)
          .then((response) => {
            response.json().then((data) => {
            msgdata=data
          })
            return "ok";
          })
          .catch((error) => {
            console.error(error);
            return '获取失败';
          });
      }
      getmsgtext (args){
        return msgdata.text;
      }
      getmsgid (args){
        return msgdata.messageid;
      }
      delmsg (args) {
        return fetch(`http://1.117.76.68:5000/bot/delmsg?token=${token}&chatid=${args.ONE}&msgid=${args.XXID}`)
        .then((response) => {
          return response.text();
        })
        .catch((error) => {
          console.error(error);
          return '失败';
        });
      }
  }
  window.token = "";
  window.msgdata="";
  Scratch.extensions.register(new StrictEqualityExtension());
//王大哥 TurboWarp fbbot 插件 1.0 2024/1/12 17:20 https://in.fanbook.cn/LmgLJF3N 
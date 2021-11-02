/**
 * Created by ldl on 2021/11/1.
 */
const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')

const { app, BrowserWindow, ipcMain } =  electron  // app: electron的整体运行过程

let mainWindow

app.on('ready', ()=> {  // app: 我们监听app; 'ready': 监听的事件; ()=>{}: 监听到事件之后我们执行的方法

  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);  // 1.不能用"",只能用`` 2. __dirname指的是electron项目根目录

})


/*
* ipc
* */
ipcMain.on('video:get_length', (event, path)=> {

  //console.log(path)

  ffmpeg.ffprobe(path, (err, metadata) => {

    console.log('Video duration:', metadata.format.duration)

    mainWindow.webContents.send('video_duration', metadata.format.duration)
  })
})

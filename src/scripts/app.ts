import sStage from './system/sStage';
import sScene from './system/sScene';
import sCoord from './system/sCoord';

class App {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  init() {
    sCoord.init();
    sStage.init("container");
    sScene.init();

    sScene.loadSceneFromUrlParam();
  }

  execute() {
    sScene.update();
    requestAnimationFrame(this.execute);
  }
}


/** メニューの初期化、きったない処理だけどとりあえず動く */
const setupMenu = () => {

  let activeMenuId = "";

  const resetLinkStyle = () => {
    const links = document.querySelectorAll<HTMLElement>("#primary_links a");
    links.forEach((item) => {
      item.style.color = "white";
    })  
  }

  const setMenuStyle = (id:string|null) => {
    const menus = document.querySelectorAll<HTMLElement>("#math-nav > ul");
    menus.forEach((item) => {
      item.style.display = (item.id === id)? "block":"none";
    })
  }
  const links = document.querySelectorAll("#primary_links a");
  
  links.forEach((item) => {

    item.addEventListener('click', (e) => {

      const target = e.target as HTMLElement;
      const id = target.getAttribute('data-id');
      
      resetLinkStyle();
      target.style.color = "blue";
      setMenuStyle(id);

      if (activeMenuId === "" || activeMenuId !== id) {
        activeMenuId = id? id:""
      } 
      else if (activeMenuId === id) {
        activeMenuId = "";
      }

      const nav = document.getElementById('math-nav') as HTMLElement;

      if (activeMenuId) {
        nav.className = "math-nav active";
      } else {
        nav.className = "math-nav";
      }

    })
  })
}

window.addEventListener("load", () => {
  setupMenu();

  const app = new App();
  app.init();
  app.execute();
})

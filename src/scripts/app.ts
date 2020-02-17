import { sStage, sScene, sCoord, sColor } from '~/scripts/system'

class App {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  init() {

    sColor.init();
    sCoord.init();
    sStage.init("container_forJs", sColor.backGround);
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
      target.style.color = "#F6CA06";
      setMenuStyle(id);

      if (activeMenuId === "" || activeMenuId !== id) {
        activeMenuId = id? id:""
      } 
      else if (activeMenuId === id) {
        activeMenuId = "";
      }

      const nav = document.getElementById('math-nav') as HTMLElement;

      if (activeMenuId) {
        nav.className = "main__nav main__nav--active";
      } else {
        nav.className = "main__nav";
      }

    })
  })
}


const app = new App();

window.addEventListener("load", () => {
  setupMenu();
  app.init();
  app.execute();
})

window.addEventListener('orientationchange', () => {
  location.reload();
})
class TestSuite {
    constructor() {
        this.msgArr = [];
        this.ol = document.createElement('ol');
        document.querySelector('body').appendChild(document.createElement('hr'))
        document.querySelector('body').appendChild(this.ol);
    }

    assert(condition, message) {
        const resultMessage = condition
            ? 'sikeresen lefutott 🚀.'
            : `${message} 🫣`;
        this.msgArr.push(resultMessage);
    }

    showResults() {
        this.msgArr.forEach((msg, i) => {
            const li = document.createElement('li');
            li.textContent = `${i + 1}. teszt: ${msg}`;
            this.ol.appendChild(li);
        });
    }

    runTests() {
        this.runHeaderTest();
        this.runTitleTest();
        this.runUListTest();
        this.runGridLayoutTest();
        this.runParagraphTest();
        this.runSubtitleTest();
        this.runFooterTest();
        this.showResults();
    }

    runHeaderTest() {
        const header = document.querySelector('header');
        this.assert(header.classList.contains('justify-content-center'), 'Nincs meg a vízszintes középreigazítása a címsornak!');
        this.assert(header.classList.contains('align-items-center'), 'Nincs meg a függőleges középreigazítása a címsornak!');
        const headerStyle=window.getComputedStyle(header)    
        let path=headerStyle.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/)
        path=path ? path[1].split('/').slice(-2) : []
        this.assert(path[0]=='img' && path[1]=='banner.jpg','Nincs beállítva a háttérkép!')
        this.assert(headerStyle.backgroundSize=='cover','Nem megfelelően van igazítva a header tag háttérképe!')
       
    }
    runTitleTest() {
        const h1 = document.querySelector('h1');
        const h1Style=window.getComputedStyle(h1)
        this.assert(h1Style.color=='rgb(255, 255, 255)','A főcím betűszíne nem megfelelő!')
        this.assert(h1Style.fontSize=='64px','A főcím betűmérete nem megfelelő!')
        this.assert(h1Style.fontWeight=='750','A főcím betűvastagsága nem megfelelő!')
        this.assert(h1Style.letterSpacing=='16px','A főcím betűritkítása nem megfelelő!')
        this.assert(h1Style.paddingBottom=='3px','A főcím belső margója nem megfelelő!')
        this.assert(h1Style.borderBottom=='4.8px dotted rgb(255, 255, 255)','A főcím alsó szegélye nem megfelelő!')
    }

    runUListTest() {
        const p = document.querySelector('.felsorolas');
        const ul=p.nextElementSibling?.tagName
        this.assert(ul=='UL','Nem lett létrehozva az ul tag a megfelelő helyen!')
        const liList=document.querySelectorAll('ul li')
        this.assert(liList?.length==7,'Nem lett létrehozva a megfelelő számú (7) lista elem!')
        const liStyle=liList?.length>0 ? window.getComputedStyle(liList[0]) : null
        this.assert(liStyle?.listStyleType=='square','Nem megfelelőek a listaelemek felsorolás jelei!')
    }

    runGridLayoutTest() {
        const cols = document.querySelectorAll('.trend');
        Array.from(cols).forEach((obj,i)=>{
            this.assert(obj.classList.contains('col-md-6'),`A/az ${i+1}. trend osztályjelölővel ellátott tároló nem megfelelően van formázva!`)
        })
     }

    runParagraphTest() {
        const paragraph = document.querySelector('p');
        const pStyle=window.getComputedStyle(paragraph)
        this.assert(pStyle.textAlign=='justify','Az összes bekezdés nem  sorkizárt!')
        this.assert(pStyle.textIndent=='15px','Az összes bekezdésnek nincs meg a kért első sor behúzása!')
    }

    runSubtitleTest(){
        const subTitle=document.querySelector('h2')
        const subTitleStyle=window.getComputedStyle(subTitle)
        this.assert(subTitleStyle.color=='rgb(19, 76, 253)','Nem megfelelő színű az összes alcím betűszíne!')
        this.assert(subTitleStyle.textAlign=='center','Nem minden alcím van középre igazítva!')
        this.assert(subTitleStyle.borderBottom=='2.4px dotted rgb(19, 76, 253)','Nem minden alcím alsó szegélye van megfelelően beállítva!')
        this.assert(subTitleStyle.margin=='16px','Az összes alcímnek nincs megfelelően állítva a külső margója!')
    } 
    runFooterTest(){
        const link=document.querySelector('footer a')
        this.assert(link?.nodeName == 'A', 'A footer belsejében nincs anchor tag létrehozva!');
        this.assert(link?.textContent=='Forrás:Forbes','Az link szövege nem megfelelő!')
        this.assert(link?.target=='_blank','Az link nem új böngészőablakban nyílik meg!')
    }
}
const testSuite = new TestSuite();
testSuite.runTests();

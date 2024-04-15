"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2689],{2689:(s,x,t)=>{t.r(x),t.d(x,{BuscaPageModule:()=>B});var p=t(655),l=t(2096),F=t(9808),f=t(5649),m=t(4182),z=t(3898),N=t(4150),L=t(1301),d=t(6847),w=t(5907),C=t(8294),I=t(9010),g=t(967),y=t(9265),b=t(7091);let h=class{constructor(n,e,o,r,a,i){this.dbService=n,this.toastController=e,this.cryptoService=o,this.searchService=r,this.router=a,this.utils=i,this.nav=L.k,this.brands=[],this.filteredBrands=[],this.models=[],this.filteredModels=[]}ionViewWillEnter(){this.brands=[],this.filteredBrands=[],this.selectedBrand=null,this.models=[],this.filteredModels=[],this.selectedModel=null,this.getBrands()}getBrands(){const n=this.utils.recoveryCreatedItem("createdBrand");this.showLoader=!0;const e=this.dbService.getItens(g.N.brandsAction).subscribe(o=>{e.closed||e.unsubscribe(),this.brands=[];for(const r of o.brands)r.active&&(!r.review||r.review&&n.find(a=>a._id===r._id))&&this.brands.push(r);this.filteredBrands=this.brands,this.showLoader=!1},o=>{this.showErrorToast(o)})}selectBrand(n){this.selectedBrand=n,this.getModel()}clearBrand(){this.filteredBrands=this.brands,this.selectedBrand=null}searchBrandInput(n){const e=n.target.value.toLowerCase();this.filteredBrands=[],requestAnimationFrame(()=>{this.brands.forEach(o=>{o.name.toLowerCase().indexOf(e)>-1&&this.filteredBrands.push(o)})})}getModel(){const n=this.utils.recoveryCreatedItem("createdModel");this.showLoader=!0;const e={brand:this.selectedBrand._id},o={data:this.cryptoService.encondeJwt(e)},r=this.dbService.filterItem(g.N.filterModelsAction,o).subscribe(a=>{r.closed||r.unsubscribe(),this.models=[];for(const i of a.models)i.active&&(!i.review||i.review&&n.find(c=>c._id===i._id))&&this.models.push(i);this.filteredModels=this.models,this.showLoader=!1},a=>{this.showErrorToast(a)})}searchModelInput(n){const e=n.target.value.toLowerCase();this.filteredModels=[],requestAnimationFrame(()=>{this.models.forEach(o=>{o.name.toLowerCase().indexOf(e)>-1&&this.filteredModels.push(o)})})}clickCarItem(n,e,o){const r=n.target.id,i=`/${!r||r.includes("item-img")||r.includes("item-label")?"opiniao":"opinar"}/${e}/${o}`;this.saveSelectedModel(o),this.clearBrand(),this.router.navigate([i])}saveSelectedModel(n){const e=this.filteredModels.find(o=>o.name.toLowerCase()===n.toLowerCase());this.searchService.saveModel(e)}showErrorToast(n){let e;switch(n.status){case 404:e=d.Hi;break;case 401:e=d.WY;break;default:e=d.tJ}this.showLoader=!1,console.error(n),this.toastController.create({header:"Aten\xe7\xe3o!",message:e,duration:4e3,position:"middle",icon:"warning-outline",color:"danger"}).then(o=>{o.present()})}};h.ctorParameters=()=>[{type:w.T},{type:f.yF},{type:I.$},{type:C.o},{type:b.F0},{type:y.F}],h=(0,p.gn)([(0,l.wA2)({selector:"app-busca",template:z,styles:[N]})],h);var E=t(3529);const A=[{path:"",component:h}];let v=class{};v=(0,p.gn)([(0,l.LVF)({imports:[b.Bz.forChild(A)],exports:[b.Bz]})],v);var S=t(6036),$=t(7615);let u=class{constructor(n,e,o,r,a,i){this.fb=n,this.dbService=e,this.cryptoService=o,this.toastController=r,this.utils=a,this.router=i,this.showLoader=!1}ngOnInit(){this.initForm()}initForm(){this.formModelNotFound=this.fb.group({opinarBrand:this.fb.control("",[m.kI.required]),opinarModel:this.fb.control("",[m.kI.required])}),this.selectedBrand&&this.formModelNotFound.controls.opinarBrand.patchValue(this.selectedBrand.name)}sendFormModelNotFound(){this.showLoader=!0;const n=this.utils.sanitizeText(this.formModelNotFound.value.opinarBrand),e=this.selectedBrand&&this.utils.sanitizeText(this.selectedBrand.name)!==n,o=this.brandList.find(r=>this.utils.sanitizeText(r.name)===n);if(this.selectedBrand&&!e||o)o&&(this.selectedBrand=o),this.createModel(this.selectedBrand);else{const r={name:this.formModelNotFound.value.opinarBrand,image:`${n}.svg`,url:n,active:!0,review:!0},a={data:this.cryptoService.encondeJwt(r)},i=this.dbService.createItem(g.N.brandsAction,a).subscribe(c=>{i.closed||i.unsubscribe(),this.utils.saveCreatedItem(c.saved,"createdBrand"),this.createModel(c.saved)},c=>{this.showErrorToast(c)})}}createModel(n){const e=this.utils.sanitizeText(this.formModelNotFound.value.opinarModel),o={name:this.formModelNotFound.value.opinarModel,category:null,brand:n._id,image:`${e}.png`,thumb:`${e}-thumb.png`,url:e,active:!0,review:!0},r={data:this.cryptoService.encondeJwt(o)},a=this.dbService.createItem(g.N.modelsAction,r).subscribe(i=>{a.closed||a.unsubscribe(),this.utils.saveCreatedItem(i.saved,"createdModel"),this.router.navigate([`/opinar/${n.url}/${i.saved.url}`]),this.showLoader=!1},i=>{this.showErrorToast(i)})}showErrorToast(n){let e;switch(n.status){case 404:e=d.Hi;break;case 401:e=d.WY;break;default:e=d.tJ}this.showLoader=!1,console.error(n),this.toastController.create({header:"Aten\xe7\xe3o!",message:e,duration:4e3,position:"middle",icon:"warning-outline",color:"danger"}).then(o=>{o.present()})}};u.ctorParameters=()=>[{type:m.qu},{type:w.T},{type:I.$},{type:f.yF},{type:y.F},{type:b.F0}],u.propDecorators={selectedBrand:[{type:l.IIB}],brandList:[{type:l.IIB}]},u=(0,p.gn)([(0,l.wA2)({selector:"app-model-not-found",template:S,styles:[$]})],u);let B=class{};B=(0,p.gn)([(0,l.LVF)({imports:[F.ez,m.u5,m.UX,f.Pc,E.m,v],declarations:[h,u]})],B)},7615:s=>{s.exports=".not-found-container {\n  background-color: rgba(var(--ion-color-medium-rgb), 0.3);\n  border-radius: 0.4rem;\n  padding: 1rem;\n  margin: 1rem 0;\n}\n.not-found-container .first-text {\n  font-size: large;\n  padding-bottom: 1rem;\n}\n.not-found-container .first-text strong {\n  font-size: larger;\n}\n.not-found-container ion-button ion-icon {\n  margin: 0 0 0 0.5rem;\n}\n.not-found-container ion-item.input-item::part(native) {\n  background: var(--ion-color-light);\n  background: var(--ion-color-light);\n  border-radius: 0.3rem 0.3rem 0 0;\n}\n.not-found-container .bt-enviar {\n  min-height: 54px;\n  margin: 0;\n}"},4150:s=>{s.exports=".brand-image {\n  max-width: 60px;\n  margin: 0.5rem 1.5rem 0.5rem 0.5rem;\n}\n\n.warning {\n  max-width: 60px;\n  margin: 0.5rem 1rem 0.5rem 0;\n}\n\n.label-name {\n  font-size: larger;\n}\n\n.model-image {\n  max-width: 100px;\n  margin: 0.5rem 1.5rem 0.5rem 0;\n}\n\n.brand-image-title {\n  max-width: 100px;\n  margin: 0.5rem 1.5rem 0.5rem 0;\n}\n\n.brand-label-title {\n  font-size: xx-large;\n  text-transform: capitalize;\n}\n\n.item-button {\n  text-transform: capitalize;\n  --padding-start: 0;\n  --inner-padding-end: 0;\n}\n\nion-searchbar {\n  padding: 1rem 0;\n}\n\nion-item.item-button::part(native) {\n  padding-left: 0 !important;\n}\n\n.selected-brand {\n  --padding-start: 0;\n  --inner-padding-end: 0;\n}\n\n@media (max-width: 576px) {\n  .brand-image-title {\n    max-width: 50px;\n    margin-right: 1rem;\n  }\n\n  .brand-label-title {\n    font-size: x-large;\n  }\n}\n\n@media (max-width: 410px) {\n  .model-image {\n    max-width: 80px;\n    margin-right: 1rem;\n  }\n\n  .selected-brand {\n    margin: 0.5rem 0;\n  }\n\n  .brand-image-title {\n    max-width: 30px;\n    margin-right: 0.5rem;\n  }\n\n  .brand-label-title {\n    font-size: large;\n  }\n}"},6036:s=>{s.exports='<app-loader [showLoader]="showLoader"></app-loader>\r\n<ion-grid slot="content" class="not-found-container">\r\n  <ion-row class="first-text">\r\n    <ion-col size-md="12" size-sm="12" size-xs="12">\r\n      <strong>N\xe3o encontrou a Marca e Modelo que procura?</strong><br>\r\n      N\xe3o se preocupe. Basta digita-los abaixo e prosseguir!\r\n    </ion-col>\r\n  </ion-row>\r\n\r\n  <form [formGroup]="formModelNotFound" (submit)="sendFormModelNotFound()">\r\n\r\n    <ion-row>\r\n      <ion-col size-md="5" size-sm="6" size-xs="12">\r\n        <ion-item class="input-item">\r\n          <ion-label position="floating">Marca</ion-label>\r\n          <ion-input type="text" maxlength="50" formControlName="opinarBrand" (ionInput)="utils.capitalize($event)" placeholder="Ex: Ford"></ion-input>\r\n        </ion-item>\r\n        <ion-note color="danger" *ngIf="formModelNotFound.controls.opinarBrand.touched">\r\n          <span *ngIf="formModelNotFound.controls.opinarBrand.errors?.required">Necess\xe1rio preencher a marca do carro!</span>\r\n          <span *ngIf="formModelNotFound.controls.opinarBrand.errors?.minlength">Campo preenchido incorretamente! Ex: Ford</span>\r\n        </ion-note>\r\n      </ion-col>\r\n\r\n      <ion-col size-md="5" size-sm="6" size-xs="12">\r\n        <ion-item class="input-item">\r\n          <ion-label position="floating">Modelo</ion-label>\r\n          <ion-input type="text" maxlength="50" formControlName="opinarModel" (ionInput)="utils.capitalize($event)" placeholder="Ex: Gol"></ion-input>\r\n        </ion-item>\r\n        <ion-note color="danger" *ngIf="formModelNotFound.controls.opinarModel.touched">\r\n          <span *ngIf="formModelNotFound.controls.opinarModel.errors?.required">Necess\xe1rio preencher o modelo do carro!</span>\r\n          <span *ngIf="formModelNotFound.controls.opinarModel.errors?.pattern">Campo preenchido incorretamente! Ex: Gol</span>\r\n        </ion-note>\r\n      </ion-col>\r\n\r\n      <ion-col size-md="2" size-sm="12" size-xs="12">\r\n        <ion-button size="default" title="Enviar" expand="block" color="success" mode="ios" type="submit" class="bt-enviar" [disabled]="formModelNotFound.status === \'INVALID\'">\r\n          <ion-icon size="small" name="paper-plane-outline"></ion-icon>\r\n          <ion-label slot="start">Enviar</ion-label>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-row>\r\n  </form>\r\n</ion-grid>\r\n'},3898:s=>{s.exports='<ion-content [fullscreen]="true">\r\n  <app-loader [showLoader]="showLoader"></app-loader>\r\n\r\n  <div class="main-container">\r\n    <ion-title size="large" color="primary" class="main-title">\r\n      <ion-icon [name]="nav.search.icon + \'-outline\'" color="secondary"></ion-icon>\r\n      <ion-label>{{nav.search.title}}</ion-label>\r\n    </ion-title>\r\n\r\n    <div class="main-body">\r\n      <ion-searchbar *ngIf="!selectedBrand" mode="ios" placeholder="Digite o nome da marca" (ionInput)="searchBrandInput($event)"></ion-searchbar>\r\n\r\n      <ion-list *ngIf="!selectedBrand">\r\n        <ion-item *ngIf="!filteredBrands?.length && !showLoader" lines="none">\r\n          <ion-icon name="alert-circle" color="medium" size="large" class="warning"></ion-icon>\r\n          <br>\r\n          <ion-label color="medium" class="ion-text-wrap">A marca que voc\xea procura ainda n\xe3o existe em nossa base.</ion-label>\r\n        </ion-item>\r\n\r\n        <ion-item *ngFor="let brand of filteredBrands" (click)="selectBrand(brand)" class="item-button" button>\r\n          <img src="assets/brands/{{brand.image}}" title="{{brand.name}}" alt="{{brand.name}}"\r\n            onerror="if (this.src != \'error.jpg\') this.src = \'assets/brands/no-brand.svg\'" class="brand-image">\r\n          <ion-label class="label-name">{{brand.name}}</ion-label>\r\n        </ion-item>\r\n      </ion-list>\r\n\r\n      <app-model-not-found *ngIf="brands.length && !selectedBrand" [brandList]="brands"></app-model-not-found>\r\n\r\n      <ion-item lines="none" *ngIf="selectedBrand" class="selected-brand">\r\n        <img src="assets/brands/{{selectedBrand.image}}" title="{{selectedBrand.name}}" alt="{{selectedBrand.name}}"\r\n          onerror="if (this.src != \'error.jpg\') this.src = \'assets/brands/no-brand.svg\'" class="brand-image-title">\r\n        <ion-label class="brand-label-title">{{selectedBrand.name}}</ion-label>\r\n        <ion-chip outline title="Alterar marca" color="primary" (click)="clearBrand()">\r\n          <ion-icon [name]="\'chevron-back-outline\'"></ion-icon>\r\n          <ion-label >Alterar marca</ion-label>\r\n        </ion-chip>\r\n      </ion-item>\r\n\r\n\r\n      <ion-searchbar *ngIf="selectedBrand" mode="ios" placeholder="Digite o nome do modelo" (ionInput)="searchModelInput($event)"></ion-searchbar>\r\n\r\n      <ion-list *ngIf="selectedBrand">\r\n        <ion-item *ngIf="!filteredModels?.length && !showLoader" lines="none">\r\n          <ion-icon name="alert-circle" color="medium" size="large" class="warning"></ion-icon>\r\n          <br>\r\n          <ion-label color="medium" class="ion-text-wrap">O modelo que voc\xea procura ainda n\xe3o existe em nossa base.</ion-label>\r\n        </ion-item>\r\n\r\n        <ion-item *ngFor="let model of filteredModels" class="item-button" routerDirection="root" (click)="clickCarItem($event, model.brand.url, model.url)" button>\r\n          <img [id]="\'item-img-\'+model.name" src="assets/models/{{model.thumb}}" title="{{model.name}}" alt="{{model.name}}"\r\n            onerror="if (this.src != \'error.jpg\') this.src = \'assets/models/no-model.png\'" class="model-image">\r\n          <ion-label [id]="\'item-label-\'+model.name" class="label-name">{{model.name}}</ion-label>\r\n          <ion-chip outline slot="end" [id]="\'bt-\'+model.name" title="Opniar sobre esse modelo" color="primary">\r\n            <ion-icon [id]="\'bt-\'+model.name+\'-icon\'" [name]="\'clipboard-outline\'"></ion-icon>\r\n            <ion-label [id]="\'bt-\'+model.name+\'-label\'">Opinar</ion-label>\r\n          </ion-chip>\r\n        </ion-item>\r\n      </ion-list>\r\n\r\n      <app-model-not-found *ngIf="brands.length && selectedBrand" [selectedBrand]="selectedBrand" [brandList]="brands"></app-model-not-found>\r\n    </div>\r\n  </div>\r\n</ion-content>\r\n'}}]);
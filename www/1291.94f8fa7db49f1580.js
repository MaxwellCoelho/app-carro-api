"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1291],{1291:(d,x,i)=>{i.r(x),i.d(x,{OpiniaoPageModule:()=>h});var g=i(655),p=i(2096),M=i(9808),f=i(5649),I=i(4182),O=i(1076),k=i(4569),c=i(7091),z=i(1301),v=i(6847),V=i(5907),C=i(8294),P=i(9010),w=i(967),m=i(6364),S=i(9265);let s=class{constructor(n,e,o,r,a,l,u){this.dbService=n,this.toastController=e,this.cryptoService=o,this.route=r,this.searchService=a,this.router=l,this.utils=u,this.nav=z.k,this.valuation=m.nV.slice(),this.valuationItens=[],this.page=1,this.pagination=20}ngOnInit(){this.utils.getShouldUpdate("opinions")||this.loadModelInfo()}ionViewWillEnter(){this.utils.getShouldUpdate("opinions")&&(this.utils.setShouldUpdate(["opinions"],!1),this.selectedModel=null,this.modelOpinions=null,this.modelAverage=null,this.valuationItens=[],this.page=1,this.pagination=20,this.loadModelInfo())}loadModelInfo(){this.selectedModel=this.searchService.getModel(),this.selectedModel?(this.searchService.clearModel(),this.getModelOpinions()):this.getModel()}getModel(){this.showLoader=!0;const n=this.getUrlParams(),e={url:n.model},o={data:this.cryptoService.encondeJwt(e)},r=this.dbService.filterItem(w.N.filterModelsAction,o).subscribe(a=>{r.closed||r.unsubscribe();const l=a.models.find(t=>t.brand.url===n.brand&&t.active),u=this.utils.recoveryCreatedItem("createdBrand"),F=l&&!l.brand.review||l.brand.review&&u.find(t=>t._id===l.brand._id),E=this.utils.recoveryCreatedItem("createdModel"),R=l&&!l.review||l.review&&E.find(t=>t._id===l._id);l&&F&&R?(this.selectedModel=l,this.getModelOpinions()):this.showErrorToast({status:404})},a=>{this.showErrorToast(a)})}getModelOpinions(){const n=`${w.N.opinionAction}/${this.selectedModel.brand._id}/${this.selectedModel._id}`,e=this.dbService.getItens(n,this.page.toString(),this.pagination.toString()).subscribe(o=>{e.closed||e.unsubscribe(),1===this.page?this.modelOpinions=o:this.modelOpinions.opinions=[...this.modelOpinions.opinions,...o.opinions],this.setModelAverages(o.averages),this.setOpinionValuation(),this.showLoader=!1,this.page++},o=>{this.showErrorToast(o)})}setModelAverages(n){const e=n.average;this.modelAverage=this.getValuationItemByValue(e);const o=[...m.cX];for(const r of o)if(n[r.value]){const a=Object.assign(Object.assign({},r),{valuation:this.getValuationItemByValue(n[r.value])});this.valuationItens.push(a)}}setOpinionValuation(){for(const n of this.modelOpinions.opinions){n.average=this.getValuationItemByValue(n.car_val_average);const e=[...m.cX],o=[];for(const r of e){const a=Object.assign(Object.assign({},r),{valuation:this.getValuationItemByValue(n[`car_val_${r.value}`])});o.push(a)}n.valuationItens=o}}getValuationItemByValue(n){const e=n?parseInt(n,10):0;return this.valuation.find(r=>e===r.value)||m.kj}getUrlParams(){let n,e;return this.route.paramMap.subscribe(o=>{n=o.get("marca"),e=o.get("modelo")}),{brand:n,model:e}}showErrorToast(n){let e;switch(n.status){case 404:e=v.Hi;break;case 401:e=v.WY;break;default:e=v.tJ}this.showLoader=!1,console.error(n),this.toastController.create({header:"Aten\xe7\xe3o!",message:e,duration:4e3,position:"middle",icon:"warning-outline",color:"danger"}).then(o=>{o.present(),this.router.navigate([z.k.search.route])})}goToOpinar(){this.router.navigate(["/opinar/"+this.selectedModel.brand.url+"/"+this.selectedModel.url])}expandDetials(n){document.getElementById(n).querySelector(".details").classList.add("expand-details"),document.getElementById(n).querySelector(".details-button").classList.add("hide-button")}onIonInfinite(n){this.modelOpinions.opinions.length===(this.page-1)*this.pagination&&this.getModelOpinions(),setTimeout(()=>{n.target.complete()},500)}};s.ctorParameters=()=>[{type:V.T},{type:f.yF},{type:P.$},{type:c.gz},{type:C.o},{type:c.F0},{type:S.F}],s=(0,g.gn)([(0,p.wA2)({selector:"app-opiniao",template:O,styles:[k]})],s);var A=i(3529);const B=[{path:"",component:s}];let b=class{};b=(0,g.gn)([(0,p.LVF)({imports:[c.Bz.forChild(B)],exports:[c.Bz]})],b);let h=class{};h=(0,g.gn)([(0,p.LVF)({imports:[M.ez,I.u5,f.Pc,b,A.m],declarations:[s]})],h)},4569:d=>{d.exports=".brand-image-title {\n  max-width: 100px;\n  margin: 0 1.5rem 0 0rem;\n}\n\n.brand-label-title {\n  text-transform: capitalize;\n  font-weight: lighter;\n  font-size: xx-large;\n}\n\n.brand-label-title span {\n  font-weight: bold;\n}\n\n.model-image {\n  margin: auto;\n}\n\n.category-image {\n  margin-top: -0.2rem;\n  vertical-align: middle;\n  transform: scale(0.7);\n}\n\n.selected-model-grid.opinion {\n  padding: 0rem;\n  border: 1px solid #000;\n  border-radius: 0.5rem;\n  margin: 2rem 0.3rem;\n}\n\n.selected-model-grid.opinion.otimo {\n  border-color: var(--ion-color-primary);\n}\n\n.selected-model-grid.opinion.bom {\n  border-color: var(--ion-color-success);\n}\n\n.selected-model-grid.opinion.regular {\n  border-color: var(--ion-color-secondary);\n}\n\n.selected-model-grid.opinion.ruim {\n  border-color: var(--ion-color-danger);\n}\n\n.selected-model-grid.opinion.pessimo {\n  border-color: var(--ion-color-danger-secondary);\n}\n\n.selected-model-grid.opinion .customer-info {\n  padding: 0.25rem;\n}\n\n@media (max-width: 576px) {\n  .selected-model-grid.opinion .customer-info {\n    padding-bottom: 1rem;\n  }\n  .selected-model-grid.opinion .customer-info .col-average {\n    border-top: 1px dashed rgba(var(--ion-color-medium-rgb), 0.3);\n  }\n}\n\n.selected-model-grid.opinion .customer-info .item-title h1 {\n  margin-bottom: -5px;\n  margin-top: 5px;\n  color: var(--ion-color-dark);\n  font-weight: bold;\n}\n\n.selected-model-grid.opinion .car-info ion-icon, .selected-model-grid.opinion .positive-points ion-icon, .selected-model-grid.opinion .negative-points ion-icon, .selected-model-grid.opinion .details-button ion-icon {\n  vertical-align: middle;\n  margin-right: 0.2rem;\n}\n\n.selected-model-grid.opinion .car-info, .selected-model-grid.opinion .points {\n  background-color: rgba(var(--ion-color-medium-rgb), 0.3);\n  border-radius: 0.4rem;\n  padding: 1rem;\n  margin: 0;\n}\n\n.selected-model-grid.opinion .points {\n  margin-top: 0.7rem;\n  padding: 0.5rem;\n}\n\n.selected-model-grid.opinion .points ion-title {\n  padding: 0;\n}\n\n.selected-model-grid.opinion .positive-points span, .selected-model-grid.opinion .negative-points span {\n  font-weight: bolder;\n  margin-left: 1.8rem;\n}\n\n@media (max-width: 576px) {\n  .selected-model-grid.opinion .negative-points {\n    border-top: 1px dashed #fff;\n    padding-top: 0.8rem;\n  }\n  .selected-model-grid.opinion .points {\n    margin-top: 1.2rem;\n  }\n}\n\n.selected-model-grid.opinion .car-info {\n  border-radius: 0.4rem 0.4rem 0 0;\n  padding: 0.5rem 0.8rem;\n}\n\n.selected-model-grid.opinion .car-info ion-label {\n  font-size: medium;\n}\n\n@media (max-width: 1170px) {\n  .selected-model-grid.opinion .car-info ion-label {\n    position: relative;\n    display: block;\n    padding-left: 1.7rem;\n    margin-top: -1.3rem;\n    margin-bottom: 0.3rem;\n    line-height: 1.2;\n  }\n}\n\n@media (min-width: 1170px) {\n  .selected-model-grid.opinion .car-info ion-label {\n    display: inline-flex;\n    padding-right: 1rem;\n    margin-right: 1rem;\n    border-right: 1px solid rgba(var(--ion-color-medium-rgb), 0.3);\n  }\n  .selected-model-grid.opinion .car-info ion-label:last-child {\n    padding-right: 0;\n    margin-right: 0;\n    border-right: 0;\n  }\n}\n\n.selected-model-grid.opinion .opinion-title {\n  text-align: center;\n  padding: 0.2rem;\n  border-top: 1px solid #fff;\n  background-color: var(--ion-color-dark);\n}\n\n.selected-model-grid.opinion .opinion-title h1 {\n  color: var(--ion-color-light);\n  font-style: italic;\n  font-size: x-large;\n}\n\n.selected-model-grid.opinion .opinion-title.otimo {\n  background-color: var(--ion-color-primary);\n}\n\n.selected-model-grid.opinion .opinion-title.bom {\n  background-color: var(--ion-color-success);\n}\n\n.selected-model-grid.opinion .opinion-title.regular {\n  background-color: var(--ion-color-secondary);\n}\n\n.selected-model-grid.opinion .opinion-title.regular h1 {\n  color: var(--ion-color-dark);\n}\n\n.selected-model-grid.opinion .opinion-title.ruim {\n  background-color: var(--ion-color-danger);\n}\n\n.selected-model-grid.opinion .opinion-title.pessimo {\n  background-color: var(--ion-color-danger-secondary);\n}\n\n.selected-model-grid.opinion .details-button {\n  padding: 0.5rem;\n  margin: 0;\n  text-align: center;\n  cursor: pointer;\n}\n\n.selected-model-grid.opinion .details-button ion-icon {\n  margin-left: 0.5rem;\n  margin-right: 0;\n}\n\n.selected-model-grid.opinion .details-button.hide-button {\n  display: none;\n}\n\n.selected-model-grid.opinion .details {\n  overflow-y: hidden;\n  height: 0;\n}\n\n.selected-model-grid.opinion .details.expand-details {\n  height: initial;\n}\n\n.selected-model-grid .model-logo {\n  text-align: right;\n}\n\n.selected-model-grid .model-name {\n  padding-top: 2.2rem;\n}\n\n.selected-model-grid .model-category {\n  text-align: right;\n  padding-top: 2.7rem;\n}\n\n.selected-model-grid .model-opinions {\n  text-align: right;\n}\n\n@media (max-width: 576px) {\n  .selected-model-grid .model-name {\n    text-align: center;\n    padding-top: 0;\n  }\n  .selected-model-grid .model-logo {\n    text-align: center;\n  }\n  .selected-model-grid .model-logo .brand-image-title {\n    margin: 0 0 -1rem 0;\n    max-width: 60px;\n  }\n  .selected-model-grid .model-category {\n    text-align: center;\n    padding: 0.5rem 0 1rem 0;\n  }\n}\n\n.selected-model-grid .average-row {\n  padding: 0.2rem;\n  border: 1px solid #000;\n  border-radius: 0.5rem;\n}\n\n.selected-model-grid .average-row ion-label {\n  font-weight: bold;\n  font-size: x-large;\n}\n\n.selected-model-grid .average-row ion-icon {\n  transform: scale(1);\n  margin-right: 0.8rem;\n  margin-bottom: -0.3rem;\n  vertical-align: sub;\n}\n\n.selected-model-grid .average-row .val-bar {\n  display: flex;\n}\n\n.selected-model-grid .average-row .val-bar div {\n  width: 19%;\n  margin-left: 1%;\n  height: 30px;\n  display: inline-flex;\n  border-radius: 0.4rem;\n  border: 1px dashed rgba(var(--ion-color-medium-rgb), 0.3);\n  border-radius: 0.4rem;\n}\n\n.selected-model-grid .average-row.otimo {\n  border-color: var(--ion-color-primary);\n}\n\n.selected-model-grid .average-row.otimo .val-bar div {\n  background-color: var(--ion-color-primary);\n  border: 0;\n}\n\n.selected-model-grid .average-row.bom {\n  border-color: var(--ion-color-success);\n}\n\n.selected-model-grid .average-row.bom .val-bar div:not(.box5) {\n  background-color: var(--ion-color-success);\n  border: 0;\n}\n\n.selected-model-grid .average-row.regular {\n  border-color: var(--ion-color-secondary);\n}\n\n.selected-model-grid .average-row.regular .val-bar div:not(.box5, .box4) {\n  background-color: var(--ion-color-secondary);\n  border: 0;\n}\n\n.selected-model-grid .average-row.ruim {\n  border-color: var(--ion-color-danger);\n}\n\n.selected-model-grid .average-row.ruim .val-bar div:not(.box5, .box4, .box3) {\n  background-color: var(--ion-color-danger);\n  border: 0;\n}\n\n.selected-model-grid .average-row.pessimo {\n  border-color: var(--ion-color-danger-secondary);\n}\n\n.selected-model-grid .average-row.pessimo .val-bar div:not(.box5, .box4, .box3, .box2) {\n  background-color: var(--ion-color-danger-secondary);\n  border: 0;\n}\n\n.selected-model-grid .average-row.indisponivel {\n  border-color: var(--ion-color-medium);\n}\n\n@media (max-width: 576px) {\n  .selected-model-grid .average-row {\n    padding: 0.5rem;\n  }\n  .selected-model-grid .average-row ion-col:nth-child(1) {\n    text-align: center;\n  }\n  .selected-model-grid .average-row .val-bar div {\n    height: 20px;\n    border-radius: 0.3rem;\n  }\n}\n\n.selected-model-grid .average-small {\n  border: 0px;\n  padding-bottom: 0;\n}\n\n.selected-model-grid .average-small ion-col {\n  padding-bottom: 0px;\n}\n\n.selected-model-grid .average-small .item-title {\n  text-align: right;\n}\n\n.selected-model-grid .average-small .item-title h1 {\n  font-weight: bolder;\n  padding-right: 2rem;\n}\n\n.selected-model-grid .average-small ion-icon {\n  margin-bottom: -0.1rem;\n}\n\n.selected-model-grid .average-small .item-subtitle {\n  text-align: right;\n}\n\n.selected-model-grid .average-small .item-subtitle p {\n  margin-top: -6px;\n  color: var(--ion-color-medium);\n  font-size: large;\n  font-weight: lighter;\n  padding-right: 2rem;\n}\n\n.selected-model-grid .average-small .val-bar {\n  margin-top: 1rem;\n}\n\n.selected-model-grid .average-small .val-bar div {\n  height: 15px;\n  margin-left: 1.5%;\n  border-radius: 0.2rem;\n}\n\n@media (max-width: 576px) {\n  .selected-model-grid .average-small .val-bar {\n    margin-top: 0;\n  }\n  .selected-model-grid .average-small .val-bar div {\n    height: 10px;\n  }\n  .selected-model-grid .average-small .item-title {\n    text-align: center;\n  }\n  .selected-model-grid .average-small .item-title h1 {\n    padding-right: 0;\n  }\n  .selected-model-grid .average-small .item-subtitle {\n    text-align: center;\n  }\n  .selected-model-grid .average-small .item-subtitle p {\n    padding-right: 0;\n  }\n  .selected-model-grid .average-small ion-col:nth-child(1) {\n    text-align: center;\n    padding-bottom: 0rem;\n  }\n}\n\n.box-send-too {\n  background-color: rgba(var(--ion-color-medium-rgb), 0.3);\n  border-radius: 0.4rem;\n  padding: 0.5rem;\n  margin: 1.5rem 0;\n}\n\n.box-send-too ion-item::part(native) {\n  background: transparent;\n}\n\n.box-send-too ion-col {\n  align-items: center;\n  display: flex;\n}\n\n@media (max-width: 576px) {\n  .box-send-too ion-col ion-label {\n    text-align: center;\n  }\n}\n\n.box-send-too ion-chip {\n  margin-left: auto;\n  margin-right: 2rem;\n  background-color: white;\n  border-color: rgba(var(--ion-color-base-rgb), 1);\n  transition: background-color 0.4s;\n  transform: scale(1.2);\n}\n\n.box-send-too ion-chip:hover {\n  background-color: rgba(255, 255, 255, 0.5);\n}\n\n@media (max-width: 576px) {\n  .box-send-too ion-chip {\n    margin-left: 2rem;\n    argin-right: 2rem;\n    width: 100%;\n    text-align: center;\n    display: block;\n  }\n}\n\n.box-send-too .ion-text-wrap strong {\n  font-size: large;\n}"},1076:d=>{d.exports='<ion-content #IonContent [fullscreen]="true" [scrollEvents]="true">\r\n  <app-loader [showLoader]="showLoader"></app-loader>\r\n\r\n  <div class="main-container">\r\n    \x3c!-- <ion-title size="large" color="primary" class="main-title">\r\n      <ion-icon [name]="\'reader-outline\'" color="secondary"></ion-icon>\r\n      <ion-label>Opini\xe3o</ion-label>\r\n    </ion-title> --\x3e\r\n\r\n    <div class="main-body" *ngIf="selectedModel && modelOpinions">\r\n      <ion-grid slot="content" class="selected-model-grid">\r\n        <ion-row>\r\n          <ion-col size-lg="1.5" size-md="2" size-sm="2.7" size-xs="12" class="model-logo">\r\n            <img src="assets/brands/{{selectedModel.brand.image}}" title="{{selectedModel.brand.name}} {{selectedModel.name}}" alt="{{selectedModel.brand.name}} {{selectedModel.name}}"\r\n              onerror="if (this.src != \'error.jpg\') this.src = \'assets/brands/no-brand.svg\'" class="brand-image-title">\r\n          </ion-col>\r\n          <ion-col size-lg="9" size-md="8" size-sm="6.7" size-xs="12" class="model-name">\r\n            <ion-label class="brand-label-title">{{selectedModel.brand.name}} <span>{{selectedModel.name}}</span></ion-label>\r\n          </ion-col>\r\n          \x3c!-- FAVORITOS | COMPARAR --\x3e\r\n          \x3c!-- <ion-col size-lg="1.5" size-md="2" size-sm="2.6" size-xs="12" class="model-category">\r\n            <ion-icon name="git-compare-outline" color="dark" size="large" class="category-image"></ion-icon>\r\n            <ion-label color="dark"> | </ion-label>\r\n            <ion-icon name="heart-outline" color="dark" size="large" class="category-image"></ion-icon>\r\n          </ion-col> --\x3e\r\n        </ion-row>\r\n      </ion-grid>\r\n\r\n      <ion-item lines="none">\r\n        <img src="assets/models/{{selectedModel.image}}" title="{{selectedModel.brand.name}} {{selectedModel.name}}" alt="{{selectedModel.brand.name}} {{selectedModel.name}}"\r\n          onerror="if (this.src != \'error.jpg\') this.src = \'assets/models/no-model.png\'" class="model-image">\r\n      </ion-item>\r\n\r\n      <ion-grid slot="content" class="selected-model-grid">\r\n        <ion-row>\r\n          <ion-col size-md="6" size-sm="6" size-xs="5">\r\n            <ion-icon *ngIf="selectedModel.category" name="car" color="medium" size="large" class="category-image"></ion-icon>\r\n            <ion-label color="medium">{{selectedModel.category?.name}}</ion-label>\r\n          </ion-col>\r\n          <ion-col size-md="6" size-sm="6" size-xs="7" class="model-opinions">\r\n            <ion-icon name="clipboard" color="medium" size="large" class="category-image"></ion-icon>\r\n            <ion-label color="medium" *ngIf="modelOpinions.qtd > 0">{{selectedModel.val_length}} opini{{selectedModel.val_length < 2 ? \'\xe3o\' : \'\xf5es\'}}</ion-label>\r\n            <ion-label color="medium" *ngIf="modelOpinions.qtd === 0">Nenhuma opini\xe3o</ion-label>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n\r\n      <ion-grid slot="content" class="selected-model-grid" *ngIf="modelOpinions.qtd > 0">\r\n        <ion-row class="average-row" [ngClass]="modelAverage.id">\r\n          <ion-col size-md="6" size-sm="6" size-xs="12">\r\n            <ion-icon name="ribbon" color="dark" size="large"></ion-icon>\r\n            <ion-label color="dark" *ngIf="modelOpinions.averages.average">{{selectedModel.average.toFixed(1)}} | {{modelAverage.name}}</ion-label>\r\n            <ion-label color="dark" *ngIf="!modelOpinions.averages.average">{{modelAverage.name}}</ion-label>\r\n          </ion-col>\r\n          <ion-col size-md="6" size-sm="6" size-xs="12">\r\n            <div class="val-bar">\r\n              <div class="box1"></div>\r\n              <div class="box2"></div>\r\n              <div class="box3"></div>\r\n              <div class="box4"></div>\r\n              <div class="box5"></div>\r\n            </div>\r\n          </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-row *ngFor="let item of valuationItens" class="average-row average-small" [ngClass]="item.valuation ? item.valuation.id : \'\'">\r\n          <ion-col size-md="6" size-sm="7" size-xs="12">\r\n            <ion-label color="dark" class="item-title"><h1>{{item.title}}</h1></ion-label>\r\n            <ion-label class="item-subtitle"><p>{{item.subtitle}}</p></ion-label>\r\n          </ion-col>\r\n          <ion-col size-md="4" size-sm="5" size-xs="12">\r\n            <div class="val-bar">\r\n              <div class="box1"></div>\r\n              <div class="box2"></div>\r\n              <div class="box3"></div>\r\n              <div class="box4"></div>\r\n              <div class="box5"></div>\r\n            </div>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n\r\n      <ion-grid slot="content">\r\n        <ion-row class="box-send-too">\r\n          <ion-col size-md="8" size-sm="6.6" size-xs="12">\r\n            <ion-item lines="none">\r\n              <ion-label class="ion-text-wrap" *ngIf="modelOpinions.qtd > 0">Voc\xea tamb\xe9m tem um <strong>{{selectedModel.brand.name}} {{selectedModel.name}}</strong>?</ion-label>\r\n              <ion-label class="ion-text-wrap" *ngIf="modelOpinions.qtd === 0">\r\n                N\xe3o h\xe1 opini\xf5es ainda. <br>\r\n                Seja o primeiro a opinar sobre o <strong>{{selectedModel.brand.name}} {{selectedModel.name}}</strong>!</ion-label>\r\n            </ion-item>\r\n          </ion-col>\r\n\r\n          <ion-col size-md="4" size-sm="5.4" size-xs="12">\r\n            <ion-chip outline title="Envie a sua opini\xe3o" color="primary" (click)="goToOpinar()">\r\n              <ion-icon [name]="\'paper-plane-outline\'"></ion-icon>\r\n              <ion-label>Envie a sua opini\xe3o</ion-label>\r\n            </ion-chip>\r\n          </ion-col>\r\n        </ion-row>\r\n      </ion-grid>\r\n\r\n      <ion-title size="large" color="primary" class="main-title" *ngIf="modelOpinions.qtd > 0">\r\n        <ion-icon [name]="\'reader-outline\'" color="secondary"></ion-icon>\r\n        <ion-label><strong>Opini\xe3o dos donos</strong> ({{modelOpinions.qtd}})</ion-label>\r\n      </ion-title>\r\n\r\n      <ion-grid slot="content" class="selected-model-grid opinion" *ngFor="let opinion of modelOpinions.opinions" id="{{opinion._id}}" [ngClass]="opinion.average.id">\r\n        <ion-row class="customer-info">\r\n          <ion-col size-lg="0.8" size-md="1" size-sm="1.5" size-xs="2.5">\r\n            <ion-icon name="person-circle-outline" color="dark" style="font-size: 55px"></ion-icon>\r\n          </ion-col>\r\n\r\n          <ion-col size-lg="7.2" size-md="7" size-sm="5.5" size-xs="9.5">\r\n            <ion-label color="dark" class="item-title"><h1>{{opinion.customer?.name}}</h1></ion-label>\r\n            <ion-label class="ion-text-wrap">{{opinion.created}}</ion-label>\r\n          </ion-col>\r\n\r\n          <ion-col size-lg="4" size-md="4" size-sm="5" size-xs="12" class="col-average">\r\n            <ion-row class="average-row average-small" [ngClass]="opinion.average.id" style="padding: 0">\r\n              <ion-col size-md="12" size-sm="12" size-xs="12">\r\n                <ion-icon name="ribbon" color="dark" style="font-size: 25px; margin-left: 0.5rem"></ion-icon>\r\n                <ion-label color="dark" *ngIf="opinion.car_val_average">{{opinion.car_val_average.toFixed(1)}} | {{opinion.average.name}}</ion-label>\r\n                <ion-label color="dark" *ngIf="!opinion.car_val_average">{{opinion.average.name}}</ion-label>\r\n\r\n                <div class="val-bar" style="margin-top: 0.5rem">\r\n                  <div class="box1"></div>\r\n                  <div class="box2"></div>\r\n                  <div class="box3"></div>\r\n                  <div class="box4"></div>\r\n                  <div class="box5"></div>\r\n                </div>\r\n              </ion-col>\r\n            </ion-row>\r\n          </ion-col>\r\n        </ion-row>\r\n\r\n        <ion-title size="large" color="dark" class="car-info">\r\n          <ion-icon [name]="\'car\'" color="dark"></ion-icon>\r\n          <ion-label class="ion-text-wrap">{{modelOpinions.model.brand.name}} {{modelOpinions.model.name}} {{opinion.version?.engine}} {{opinion.version?.complement}} {{opinion.version?.gearbox}} {{opinion.version?.fuel}} {{opinion.year_model}}<br></ion-label>\r\n\r\n          <ion-icon [name]="\'pricetag\'" color="dark"></ion-icon>\r\n          <ion-label class="ion-text-wrap">Comprou em {{opinion.year_bought}} - Dono h\xe1 {{opinion.kept_period}} anos<br></ion-label>\r\n\r\n          <ion-icon [name]="\'speedometer\'" color="dark"></ion-icon>\r\n          <ion-label class="ion-text-wrap">Comprou com {{opinion.km_bought}} 000 Km rodados</ion-label>\r\n        </ion-title>\r\n\r\n        <ion-row class="opinion-title" [ngClass]="opinion.average.id">\r\n          <ion-col size-md="12" size-sm="12" size-xs="12">\r\n            <ion-label class="ion-text-wrap" color="light"><h1>"{{opinion.car_title}}"</h1></ion-label>\r\n          </ion-col>\r\n        </ion-row>\r\n\r\n        <div class="details">\r\n          <ion-row *ngFor="let item of opinion.valuationItens" class="average-row average-small" [ngClass]="item.valuation ? item.valuation.id : \'\'">\r\n            <ion-col size-md="6" size-sm="7" size-xs="12">\r\n              <ion-label color="dark" class="item-title"><h1>{{item.title}}</h1></ion-label>\r\n              <ion-label class="item-subtitle"><p>{{item.subtitle}}</p></ion-label>\r\n            </ion-col>\r\n            <ion-col size-md="4" size-sm="5" size-xs="12">\r\n              <div class="val-bar">\r\n                <div class="box1"></div>\r\n                <div class="box2"></div>\r\n                <div class="box3"></div>\r\n                <div class="box4"></div>\r\n                <div class="box5"></div>\r\n              </div>\r\n            </ion-col>\r\n          </ion-row>\r\n\r\n          <ion-row class="points">\r\n            <ion-col size-md="6" size-sm="6" size-xs="12">\r\n              <ion-title size="large" color="dark" class="positive-points" size-md="6" size-sm="6" size-xs="12">\r\n                <ion-icon [name]="\'thumbs-up\'" color="dark"></ion-icon>\r\n                <ion-label class="ion-text-wrap">\r\n                  Pontos positivos:<br>\r\n                  <span>{{opinion.car_positive}}</span>\r\n                </ion-label>\r\n              </ion-title>\r\n            </ion-col>\r\n\r\n            <ion-col size-md="6" size-sm="6" size-xs="12">\r\n              <ion-title size="large" color="dark" class="negative-points" size-md="6" size-sm="6" size-xs="12">\r\n                <ion-icon [name]="\'thumbs-down\'" color="dark"></ion-icon>\r\n                <ion-label class="ion-text-wrap">\r\n                  Pontos negativos:<br>\r\n                  <span>{{opinion.car_negative}}</span>\r\n                </ion-label>\r\n              </ion-title>\r\n            </ion-col>\r\n          </ion-row>\r\n        </div>\r\n\r\n        <ion-title size="large" color="dark" class="details-button" (click)="expandDetials(opinion._id)">\r\n          <ion-label>Expandir detalhes</ion-label>\r\n          <ion-icon [name]="\'chevron-down\'" color="dark"></ion-icon>\r\n        </ion-title>\r\n      </ion-grid>\r\n      <ion-infinite-scroll *ngIf="modelOpinions?.opinions.length" (ionInfinite)="onIonInfinite($event)">\r\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\r\n      </ion-infinite-scroll>\r\n    </div>\r\n  </div>\r\n</ion-content>\r\n'}}]);